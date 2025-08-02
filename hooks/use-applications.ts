import { useState, useCallback } from 'react';

interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  appliedAt: Date;
  coverLetter?: string;
  resume?: string;
  portfolio?: string;
  job?: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
  };
}

interface ApplicationFilters {
  userId?: string;
  jobId?: string;
  status?: string;
}

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async (filters: ApplicationFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/applications?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const submitApplication = async (applicationData: {
    jobId: string;
    userId: string;
    coverLetter?: string;
    resume?: string;
    portfolio?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      const newApplication = await response.json();
      setApplications(prev => [newApplication, ...prev]);
      return newApplication;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async (id: string, updates: Partial<Application>) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update application');
      }

      setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, ...updates } : app
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to withdraw application');
      }

      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    applications,
    loading,
    error,
    fetchApplications,
    submitApplication,
    updateApplication,
    withdrawApplication,
  };
}; 