/**
 * SCORM 1.2 API Wrapper
 * Handles communication with D2L Brightspace LMS
 */

interface ScormAPI {
  LMSInitialize: (param: string) => string;
  LMSFinish: (param: string) => string;
  LMSGetValue: (element: string) => string;
  LMSSetValue: (element: string, value: string) => string;
  LMSCommit: (param: string) => string;
  LMSGetLastError: () => string;
  LMSGetErrorString: (errorCode: string) => string;
  LMSGetDiagnostic: (errorCode: string) => string;
}

declare global {
  interface Window {
    API?: ScormAPI;
  }
}

class ScormService {
  private api: ScormAPI | null = null;
  private initialized = false;

  /**
   * Find and initialize the SCORM API
   */
  initialize(): boolean {
    if (this.initialized) return true;

    this.api = this.findAPI(window);
    
    if (!this.api) {
      console.warn('SCORM API not found. Running in standalone mode.');
      return false;
    }

    const result = this.api.LMSInitialize('');
    this.initialized = result === 'true';

    if (this.initialized) {
      // Set initial values
      this.setValue('cmi.core.lesson_status', 'incomplete');
      this.commit();
    }

    return this.initialized;
  }

  /**
   * Recursively search for SCORM API in parent windows
   */
  private findAPI(win: Window): ScormAPI | null {
    let attempts = 0;
    const maxAttempts = 500;

    try {
      while (win.API == null && win.parent != null && win.parent !== win && attempts < maxAttempts) {
        attempts++;
        win = win.parent;
      }

      return win.API || null;
    } catch (error) {
      // Cross-origin access blocked - app is not embedded in LMS
      console.info('SCORM API not accessible (cross-origin restriction). Running in standalone mode.');
      return null;
    }
  }

  /**
   * Get a value from the LMS
   */
  getValue(element: string): string {
    if (!this.api) return '';
    return this.api.LMSGetValue(element);
  }

  /**
   * Set a value in the LMS
   */
  setValue(element: string, value: string): boolean {
    if (!this.api) return false;
    const result = this.api.LMSSetValue(element, value);
    return result === 'true';
  }

  /**
   * Commit changes to the LMS
   */
  commit(): boolean {
    if (!this.api) return false;
    const result = this.api.LMSCommit('');
    return result === 'true';
  }

  /**
   * Set completion status
   */
  setComplete(): boolean {
    const success = this.setValue('cmi.core.lesson_status', 'completed');
    this.commit();
    return success;
  }

  /**
   * Set score (0-100)
   */
  setScore(score: number): boolean {
    const normalizedScore = Math.max(0, Math.min(100, score));
    const success = this.setValue('cmi.core.score.raw', normalizedScore.toString());
    this.setValue('cmi.core.score.min', '0');
    this.setValue('cmi.core.score.max', '100');
    this.commit();
    return success;
  }

  /**
   * Save progress data for resume functionality
   */
  setSuspendData(data: string): boolean {
    const success = this.setValue('cmi.suspend_data', data);
    this.commit();
    return success;
  }

  /**
   * Get saved progress data
   */
  getSuspendData(): string {
    return this.getValue('cmi.suspend_data');
  }

  /**
   * Get current lesson status
   */
  getLessonStatus(): string {
    return this.getValue('cmi.core.lesson_status');
  }

  /**
   * Terminate the SCORM session
   */
  terminate(): boolean {
    if (!this.api || !this.initialized) return false;
    
    const result = this.api.LMSFinish('');
    this.initialized = false;
    return result === 'true';
  }

  /**
   * Check if SCORM is available
   */
  isAvailable(): boolean {
    return this.api !== null;
  }

  /**
   * Get last error
   */
  getLastError(): string {
    if (!this.api) return '';
    return this.api.LMSGetLastError();
  }
}

// Singleton instance
export const scorm = new ScormService();
