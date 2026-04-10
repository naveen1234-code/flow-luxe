import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`relative z-[1] mx-auto w-full max-w-[430px] px-4 sm:px-5 md:max-w-6xl md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}