import { useState, useCallback } from 'react';

interface MatchedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  matchScore: number;
  postedAt: Date;
  isRemote: boolean;
}

export const useAIMatch = () => {
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMatchedJobs = useCallback(async (userId: string, limit: number = 5) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        userId,
        limit: limit.toString(),
      });

      const response = await fetch(`/api/jobs/match?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch matched jobs');
      }
      
      const data = await response.json();
      setMatchedJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    matchedJobs,
    loading,
    error,
    getMatchedJobs,
  };
}; 