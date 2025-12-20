// Facebook Pixel tracking utility for 2 pixel IDs
// Pixel 1: 840709498943874
// Pixel 2: 1553875702421504

declare global {
  interface Window {
    fbq: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track a standard Facebook Pixel event (e.g., Lead, ViewContent, InitiateCheckout)
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

/**
 * Track a custom Facebook Pixel event (e.g., QuizQuestionCompleted)
 */
export const trackCustomEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
};
