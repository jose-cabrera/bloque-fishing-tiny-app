import { fetchMarket } from '../services/fetch';
import { useQuery } from '@tanstack/react-query'

export function useMarket() {
    return useQuery({
      queryKey: ['market'],
      queryFn: async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds

        try {
          return await fetchMarket({ signal: controller.signal });
        } finally {
          clearTimeout(timeoutId);
        }
      },
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
  }