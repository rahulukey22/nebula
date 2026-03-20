/**
 * Date Picker Helper Utilities
 * Handles cross-origin iframe restrictions for showPicker() method
 */

/**
 * Safely opens the date picker on an input element
 * Handles SecurityError in cross-origin iframes and unsupported browsers
 * 
 * @param inputId - The ID of the date input element
 * @returns true if picker was opened, false otherwise
 */
export function openDatePicker(inputId: string): boolean {
  try {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (!input) {
      console.warn(`Date input with id "${inputId}" not found`);
      return false;
    }

    // Check if showPicker is supported
    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
        return true;
      } catch (error) {
        // SecurityError: Cross-origin iframe restriction
        // Fall back to focus
        console.debug('showPicker() not available in cross-origin iframe, using focus fallback');
        input.focus();
        return false;
      }
    } else {
      // Browser doesn't support showPicker, just focus
      input.focus();
      return false;
    }
  } catch (error) {
    console.error('Error opening date picker:', error);
    return false;
  }
}

/**
 * Safely opens the date picker on the current target element
 * Use this in onClick handlers
 * 
 * @param element - The input element (from event.currentTarget)
 * @returns true if picker was opened, false otherwise
 */
export function openDatePickerOnElement(element: HTMLInputElement): boolean {
  try {
    // Check if showPicker is supported
    if (typeof element.showPicker === 'function') {
      try {
        element.showPicker();
        return true;
      } catch (error) {
        // SecurityError: Cross-origin iframe restriction
        // Silently fail - user can still manually interact with input
        console.debug('showPicker() not available in cross-origin iframe');
        return false;
      }
    } else {
      // Browser doesn't support showPicker
      return false;
    }
  } catch (error) {
    console.error('Error opening date picker:', error);
    return false;
  }
}

/**
 * Check if the browser supports showPicker()
 * Note: This doesn't check for cross-origin restrictions
 * 
 * @returns true if showPicker is supported
 */
export function isShowPickerSupported(): boolean {
  const testInput = document.createElement('input');
  testInput.type = 'date';
  return typeof testInput.showPicker === 'function';
}

/**
 * Check if we're running in a cross-origin iframe
 * This can cause showPicker() to throw SecurityError
 * 
 * @returns true if likely in cross-origin iframe
 */
export function isInCrossOriginIframe(): boolean {
  try {
    // If we can access window.top.location, we're not in a cross-origin iframe
    return window.self !== window.top && !window.top?.location.href;
  } catch (e) {
    // SecurityError means we're in a cross-origin iframe
    return true;
  }
}
