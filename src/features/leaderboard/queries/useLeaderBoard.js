import { fetchLeaderboard } from '../services/fetch'
import { useQuery } from '@tanstack/react-query'

export function useLeaderboard() {
    return useQuery({
      queryKey: ['leaderboard'],
      queryFn: async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds

        try {
          return await fetchLeaderboard({ signal: controller.signal });
        } finally {
          clearTimeout(timeoutId);
        }
      },
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
  }