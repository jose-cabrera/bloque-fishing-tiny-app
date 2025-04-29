import { fetchLeaderboard } from '../services/fetch'
import { useQuery } from '@tanstack/react-query'

export function useLeaderboard() {
    return useQuery({
      queryKey: ['leaderboard'],
      queryFn: fetchLeaderboard,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
  }