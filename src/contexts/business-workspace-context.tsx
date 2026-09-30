"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getBusinessError, getBusinesses } from "@/services/business.service";
import type { Business } from "@/types/business";

const STORAGE_KEY = "vizo_selected_business";

interface BusinessWorkspaceValue {
  businesses: Business[];
  selectedBusiness: Business | null;
  selectedBusinessId: string | null;
  isLoading: boolean;
  error: string;
  selectBusiness: (publicId: string) => void;
  refreshBusinesses: () => Promise<void>;
}

const BusinessWorkspaceContext = createContext<BusinessWorkspaceValue | null>(
  null,
);

export function BusinessWorkspaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshBusinesses = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError("");

      const results = await getBusinesses();

      setBusinesses(results);

      const storedBusinessId = window.localStorage.getItem(STORAGE_KEY);

      const storedBusinessExists = results.some(
        (business) => business.public_id === storedBusinessId,
      );

      const nextBusinessId = storedBusinessExists
        ? storedBusinessId
        : (results[0]?.public_id ?? null);

      setSelectedBusinessId(nextBusinessId);

      if (nextBusinessId) {
        window.localStorage.setItem(STORAGE_KEY, nextBusinessId);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (requestError) {
      setError(
        getBusinessError(requestError, "Unable to load your businesses."),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshBusinesses();
  }, [refreshBusinesses]);

  const selectBusiness = useCallback(
    (publicId: string) => {
      const exists = businesses.some(
        (business) => business.public_id === publicId,
      );

      if (!exists) {
        return;
      }

      setSelectedBusinessId(publicId);
      window.localStorage.setItem(STORAGE_KEY, publicId);
    },
    [businesses],
  );

  const selectedBusiness = useMemo(
    () =>
      businesses.find(
        (business) => business.public_id === selectedBusinessId,
      ) ?? null,
    [businesses, selectedBusinessId],
  );

  const value = useMemo<BusinessWorkspaceValue>(
    () => ({
      businesses,
      selectedBusiness,
      selectedBusinessId,
      isLoading,
      error,
      selectBusiness,
      refreshBusinesses,
    }),
    [
      businesses,
      selectedBusiness,
      selectedBusinessId,
      isLoading,
      error,
      selectBusiness,
      refreshBusinesses,
    ],
  );

  return (
    <BusinessWorkspaceContext.Provider value={value}>
      {children}
    </BusinessWorkspaceContext.Provider>
  );
}

export function useBusinessWorkspace(): BusinessWorkspaceValue {
  const context = useContext(BusinessWorkspaceContext);

  if (!context) {
    throw new Error(
      "useBusinessWorkspace must be used inside BusinessWorkspaceProvider.",
    );
  }

  return context;
}
