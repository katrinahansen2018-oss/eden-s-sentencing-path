import { useEffect, useCallback } from 'react';
import { scorm } from '@/lib/scorm';

/**
 * React hook for SCORM integration
 */
export const useScorm = () => {
  useEffect(() => {
    // Initialize SCORM on mount
    scorm.initialize();

    // Terminate SCORM on unmount
    return () => {
      scorm.terminate();
    };
  }, []);

  const setComplete = useCallback(() => {
    return scorm.setComplete();
  }, []);

  const setScore = useCallback((score: number) => {
    return scorm.setScore(score);
  }, []);

  const saveProgress = useCallback((data: string) => {
    return scorm.setSuspendData(data);
  }, []);

  const loadProgress = useCallback((): string => {
    return scorm.getSuspendData();
  }, []);

  const isAvailable = useCallback(() => {
    return scorm.isAvailable();
  }, []);

  return {
    setComplete,
    setScore,
    saveProgress,
    loadProgress,
    isAvailable,
  };
};
