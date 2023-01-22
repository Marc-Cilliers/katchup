import React, { useState, useEffect, PropsWithChildren } from "react";

interface DelayProps {
  delay: number;
}

export const Delay = ({ children, delay }: PropsWithChildren<DelayProps>) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(showTimer);
  });

  if (!done) return null;
  return <>{children}</>;
};
