// LoadingWrapper.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AnimatedLoader from "./AnimatedLoader";

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export const LoadingWrapper = ({ children }: LoadingWrapperProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Add a small delay to ensure the loader is shown during quick transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <AnimatedLoader message="loading" variant="fun" />}
      <div
        className={
          isLoading
            ? "opacity-50 pointer-events-none transition-opacity duration-300"
            : "transition-opacity duration-300"
        }
      >
        {children}
      </div>
    </>
  );
};
