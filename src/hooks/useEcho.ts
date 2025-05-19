import { useMemo } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;

export function useEcho() {
  const { accessToken } = useSelector((s: RootState) => s.auth)

  return useMemo(() => {
    return new Echo({
      broadcaster: 'reverb',
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
      wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
      forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
      authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
  }, [accessToken]);
}
