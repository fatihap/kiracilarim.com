// Google Analytics Utility Functions

// Google Analytics Measurement ID - Bu değeri kendi GA4 ID'niz ile değiştirin
// Format: G-XXXXXXXXXX
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Google Analytics'i başlat
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.dataLayer = window.dataLayer || [];
    
    const gtag = function(...args) {
      window.dataLayer.push(args);
    };
    
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }
};

// Sayfa görüntüleme event'i
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

// Custom event tracking
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, {
      ...eventParams,
      send_to: GA_MEASUREMENT_ID,
    });
  }
};

// Button click tracking
export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location || window.location.pathname,
  });
};

// Link click tracking
export const trackLinkClick = (linkUrl, linkText = '') => {
  trackEvent('link_click', {
    link_url: linkUrl,
    link_text: linkText,
  });
};

// Form submission tracking
export const trackFormSubmit = (formName, formLocation = '') => {
  trackEvent('form_submit', {
    form_name: formName,
    form_location: formLocation || window.location.pathname,
  });
};

// User action tracking
export const trackUserAction = (action, category = 'user', value = null) => {
  trackEvent(action, {
    event_category: category,
    value: value,
  });
};

// Conversion tracking
export const trackConversion = (conversionName, value = null) => {
  trackEvent('conversion', {
    conversion_name: conversionName,
    value: value,
  });
};

