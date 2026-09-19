/**
 * Another Reason to Get Fit - Google Analytics 4 (GA4) Architecture
 * MKT901 Web Marketing Academic Task 1: Measurement Framework
 */

const GA_MEASUREMENT_ID = 'G-D0SLEX5TN0';

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

if (GA_MEASUREMENT_ID) {
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
}

function trackEvent(eventName, eventParams = {}) {
  gtag('event', eventName, eventParams);
  console.log(`[GA4 Event Fired]: ${eventName}`, eventParams);
}

document.addEventListener('DOMContentLoaded', () => {
  const ctaLinks = document.querySelectorAll('.article-cta a, [data-cta]');
  ctaLinks.forEach((link) => {
    link.addEventListener('click', () => {
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

  const isArticlePage = document.querySelector('.article-body');
  if (isArticlePage) {
    let scrolledPast75 = false;
    let spent60Seconds = false;
    let eventFired = false;

    setTimeout(() => {
      spent60Seconds = true;
      checkAndFireEngagement();
    }, 60000);

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

  if (window.location.pathname.includes('calorie-calculator')) {
    trackEvent('calculator_view', { calculator_type: 'calorie_tdee' });
  } else if (window.location.pathname.includes('body-fat-calculator')) {
    trackEvent('calculator_view', { calculator_type: 'body_fat_lbm' });
  }
});
