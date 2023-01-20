import {
  createClient,
  RealtimeChannel,
  SupabaseClient,
} from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";

type CallbackEventArgs = {
  event: string;
  type: "broadcast";
  [key: string]: any;
};

interface SubscribeToRoomProps {
  room: string;
  event: string;
  callbackFn: (args: CallbackEventArgs) => void;
}

interface UseRealtimeEventsReturnType {
  subscribeToRoom: (args: SubscribeToRoomProps) => void;
}

export const useRealtimeEvents = (): UseRealtimeEventsReturnType => {
  const supabase = useRef<SupabaseClient>();
  const [subscriptions, setSubscriptions] = useState<RealtimeChannel[]>([]);
  const { isAuthReady, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;
    if (supabase.current) return;

    supabase.current = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        realtime: {
          params: {
            eventsPerSecond: 20,
          },
        },
      }
    );
  }, [isAuthReady, isAuthenticated]);

  useEffect(() => {
    return () => subscriptions.forEach((s) => s.unsubscribe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subscribeToRoom = ({
    room,
    event,
    callbackFn,
  }: SubscribeToRoomProps) => {
    const eventRoom = `${user?.name}-${room}`;
    if (subscriptions.find((s) => s.topic === `realtime:${eventRoom}`)) return;

    const subscription = supabase.current
      ?.channel(eventRoom)
      .on("broadcast", { event }, (args) => callbackFn(args))
      .subscribe();

    if (!subscription) return;

    setSubscriptions([...subscriptions, subscription]);
  };

  return {
    subscribeToRoom,
  };
};
