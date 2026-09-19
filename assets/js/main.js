/**
 * Another Reason to Get Fit - Main Client Script
 * Lightweight UI interactions, mobile navigation, active link state, and contact handling.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("is-active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. Highlight Active Navigation Link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // Handle home link
    if ((currentPath.endsWith("/") || currentPath.endsWith("index.html")) && (href === "/" || href === "index.html" || href.endsWith("index.html") && !href.includes("/"))) {
      if (currentPath === href || (href === "index.html" && currentPath.endsWith("/"))) {
        link.classList.add("active");
      }
    } else if (href !== "/" && href !== "index.html" && currentPath.includes(href.replace(".html", ""))) {
      link.classList.add("active");
    }
  });

  // 3. Contact Form Submission Handler & Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById("contactName");
      const emailInput = document.getElementById("contactEmail");
      const messageInput = document.getElementById("contactMessage");
      const statusBox = document.getElementById("contactStatus");

      let isValid = true;

      // Basic Validation
      if (!nameInput.value.trim()) {
        showError(nameInput, "Please enter your name.");
        isValid = false;
      } else {
        clearError(nameInput);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      } else {
        clearError(emailInput);
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, "Please enter a message (at least 10 characters).");
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (isValid) {
        // Dispatch GA4 Event
        if (typeof trackEvent === "function") {
          trackEvent("contact_submit", {
            form_id: "contactForm",
            method: "client_mock"
          });
        }

        if (statusBox) {
          statusBox.style.display = "block";
          statusBox.className = "disclaimer-box";
          statusBox.style.backgroundColor = "#ecfdf5";
          statusBox.style.borderColor = "#a7f3d0";
          statusBox.style.color = "#065f46";
          statusBox.textContent = "Thank you for reaching out! Your message has been recorded for this academic project.";
        }
        contactForm.reset();
      }
    });
  }

  function showError(input, message) {
    const parent = input.closest(".form-group");
    if (!parent) return;
    let errorEl = parent.querySelector(".form-error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = "block";
    }
    input.style.borderColor = "var(--danger)";
  }

  function clearError(input) {
    const parent = input.closest(".form-group");
    if (!parent) return;
    let errorEl = parent.querySelector(".form-error");
    if (errorEl) {
      errorEl.style.display = "none";
    }
    input.style.borderColor = "var(--border-color)";
  }
});
