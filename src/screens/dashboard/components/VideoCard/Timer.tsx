import { DateTime } from "luxon";
import { useEffect, useState } from "react";

interface TimerProps {
  timestamp: string;
}

export const Timer = ({ timestamp }: TimerProps) => {
  const [dateTime] = useState(DateTime.fromISO(timestamp));
  const [timeAgo, setTimeAgo] = useState(dateTime.toRelative());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(dateTime.toRelative());
    }, 1000);

    return () => clearInterval(interval);
  }, [dateTime]);

  return <p className="text-gray-300 leading-7">{timeAgo}</p>;
};
