/**
 * Another Reason to Get Fit - Google Analytics 4 (GA4) Architecture
 * MKT901 Web Marketing Academic Task 1: Measurement Framework
 * 
 * INSTRUCTIONS FOR USER:
 * Replace 'G-XXXXXXXXXX' below with your actual Google Analytics 4 Measurement ID
 * obtained from your GA4 Data Stream (Admin -> Data Streams -> Web).
 */

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // <-- REPLACE WITH YOUR REAL GA4 MEASUREMENT ID

// 1. Initialize dataLayer & gtag
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

// Only inject the official Google Tag script if a real Measurement ID is configured
if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });
  console.log(`[GA4] Initialized stream for ${GA_MEASUREMENT_ID}`);
} else {
  console.info('[GA4 Note] Running in development mode with placeholder GA_MEASUREMENT_ID. Events are logged to console.');
}

/**
 * Universal Event Dispatcher
 * @param {string} eventName - Semantic event name (e.g., 'calorie_calculated')
 * @param {Object} eventParams - Parameter payload (no PII)
 */
function trackEvent(eventName, eventParams = {}) {
  // Always push to dataLayer for debugging & GTM compatibility
  gtag('event', eventName, eventParams);
  console.log(`[GA4 Event Fired]: ${eventName}`, eventParams);
}

// 2. Automated Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // A. In-Article CTA Tracking (Content Funnel)
  const ctaLinks = document.querySelectorAll('.article-cta a, [data-cta]');
  ctaLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const ctaText = link.innerText.trim() || 'CTA Button';
      const destination = link.getAttribute('href') || '';
      const articleTitle = document.querySelector('h1')?.innerText.trim() || document.title;

      trackEvent('article_cta_click', {
        article_title: articleTitle,
        cta_text: ctaText,
        cta_destination: destination
      });
    });
  });

  // B. Content Quality & Dwell Time: High Engagement Read
  // Fires when a user stays on an article for >= 60 seconds AND scrolls past 75% depth
  const isArticlePage = document.querySelector('.article-body');
  if (isArticlePage) {
    let scrolledPast75 = false;
    let spent60Seconds = false;
    let eventFired = false;

    // Timer check
    setTimeout(() => {
      spent60Seconds = true;
      checkAndFireEngagement();
    }, 60000);

    // Scroll depth check
    window.addEventListener('scroll', () => {
      if (eventFired || scrolledPast75) return;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPos = window.scrollY || window.pageYOffset;
      const scrollPercent = (scrollPos / scrollHeight) * 100;

      if (scrollPercent >= 75) {
        scrolledPast75 = true;
        checkAndFireEngagement();
      }
    }, { passive: true });

    function checkAndFireEngagement() {
      if (!eventFired && scrolledPast75 && spent60Seconds) {
        eventFired = true;
        trackEvent('high_engagement_read', {
          article_title: document.querySelector('h1')?.innerText.trim() || document.title,
          url: window.location.pathname
        });
      }
    }
  }

  // C. Track Calculator Page Views
  if (window.location.pathname.includes('calorie-calculator')) {
    trackEvent('calculator_view', { calculator_type: 'calorie_tdee' });
  } else if (window.location.pathname.includes('body-fat-calculator')) {
    trackEvent('calculator_view', { calculator_type: 'body_fat_lbm' });
  }
});
