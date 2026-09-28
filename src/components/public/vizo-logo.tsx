import Image from "next/image";

type VizoLogoProps = {
  size?: number;
  className?: string;
};

export function VizoLogo({ size = 44, className = "" }: VizoLogoProps) {
  return (
    <Image
      src="/vizo-logo-2026.png"
      alt="Vizo"
      width={size}
      height={size}
      priority
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
