// Facebook Pixel Tracking Utility
// Pixel ID: 840709498943874

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const FB_PIXEL_ID = '840709498943874';

// Track page view (already called in base code, use for SPA navigation)
export const trackPageView = () => {
  window.fbq?.('track', 'PageView');
};

// Track when user submits email (Lead event)
export const trackLead = (email?: string) => {
  window.fbq?.('track', 'Lead', { 
    currency: 'USD',
    content_name: 'quiz_email_capture'
  });
};

// Track when user starts the quiz
export const trackInitiateCheckout = () => {
  window.fbq?.('track', 'InitiateCheckout', {
    content_name: 'etheria_quiz_start'
  });
};

// Track when quiz is completed
export const trackCompleteRegistration = (archetype: string, subNeed: string) => {
  window.fbq?.('track', 'CompleteRegistration', {
    content_name: archetype,
    status: 'completed',
    content_category: subNeed
  });
};

// Track when user views result page with product
export const trackViewContent = (productName: string, value?: number) => {
  window.fbq?.('track', 'ViewContent', {
    content_name: productName,
    content_type: 'product',
    value: value,
    currency: 'USD',
  });
};

// Track when user clicks to add bundle to cart
export const trackAddToCart = (productName: string, value: number) => {
  window.fbq?.('track', 'AddToCart', {
    content_name: productName,
    content_type: 'product',
    value: value,
    currency: 'USD',
  });
};
