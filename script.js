/**
 * Ali Raza - Portfolio JavaScript
 * Handles navigation, animations, and form interactions
 */

// Contact Form Handling
// ============================================
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = contactForm.querySelector('#name').value;
  const email = contactForm.querySelector('#email').value;
  const message = contactForm.querySelector('#message').value;
  
  // Validate form
  if (!name || !email || !message) {
    showFormMessage('Please fill in all fields.', 'error');
    return;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual API call)
  try {
    // In a real implementation, you would send the data to a backend
    // For example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify({ name, email, message }) });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
  } catch (error) {
    showFormMessage('There was an error sending your message. Please try again.', 'error');
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});
=======
// ============================================
// Contact Form Handling
// ============================================
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = contactForm.querySelector('#name').value;
  const email = contactForm.querySelector('#email').value;
  const message = contactForm.querySelector('#message').value;
  
  // Validate form
  if (!name || !email || !message) {
    showFormMessage('Please fill in all fields.', 'error');
    return;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // For static GitHub Pages, redirect to mailto with pre-filled content
  // This is a fallback since we don't have a backend API
  try {
    const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:hello@alirazzaq.me?subject=${subject}&body=${body}`;
    
    // Open mail client
    window.location.href = mailtoUrl;
    
    // Show success message
    showFormMessage('Opening your email client...', 'success');
    
    // Reset form
    contactForm.reset();
    
  } catch (error) {
    showFormMessage('There was an error. Please email hello@alirazzaq.me directly.', 'error');
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});DOM Elements
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbarToggle');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

// ============================================
// Navbar Scroll Effect
// ============================================
window.addEventListener('scroll', () => {
  // Navbar background on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button visibility
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active section highlighting
  updateActiveSection();
});

// ============================================
// Active Section Detection
// ============================================
function updateActiveSection() {
  const sections = ['about', 'projects', 'skills', 'experience', 'contact'];
  let currentSection = 'about';

  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section;
        break;
      }
    }
  }

  // Update active link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// ============================================
// Smooth Scrolling for Navigation
// ============================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar brand click
const navbarBrand = document.querySelector('.navbar-brand');
if (navbarBrand) {
  navbarBrand.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// Back to Top Button
// ============================================
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============================================
// Mobile Navigation Toggle
// ============================================
let isMobileMenuOpen = false;

navbarToggle.addEventListener('click', () => {
  isMobileMenuOpen = !isMobileMenuOpen;
  
  // Toggle mobile menu visibility
  const navbarLinks = document.querySelector('.navbar-links');
  if (navbarLinks) {
    navbarLinks.style.display = isMobileMenuOpen ? 'flex' : 'none';
  }
  
  // Animate hamburger icon
  const spans = navbarToggle.querySelectorAll('span');
  if (isMobileMenuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (isMobileMenuOpen) {
      isMobileMenuOpen = false;
      const navbarLinks = document.querySelector('.navbar-links');
      if (navbarLinks) {
        navbarLinks.style.display = 'none';
      }
      const spans = navbarToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// ============================================
// Contact Form Handling
// ============================================
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = contactForm.querySelector('#name').value;
  const email = contactForm.querySelector('#email').value;
  const message = contactForm.querySelector('#message').value;
  
  // Validate form
  if (!name || !email || !message) {
    showFormMessage('Please fill in all fields.', 'error');
    return;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual API call)
  try {
    // In a real implementation, you would send the data to a backend
    // For example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify({ name, email, message }) });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
  } catch (error) {
    showFormMessage('There was an error sending your message. Please try again.', 'error');
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `submit-message ${type}`;
  formMessage.classList.remove('hidden');
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.classList.add('hidden');
  }, 5000);
}

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .skill-category, .experience-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
  // Close mobile menu with Escape key
  if (e.key === 'Escape' && isMobileMenuOpen) {
    isMobileMenuOpen = false;
    const navbarLinks = document.querySelector('.navbar-links');
    if (navbarLinks) {
      navbarLinks.style.display = 'none';
    }
    const spans = navbarToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active section
  updateActiveSection();
  
  // Add loaded class to body for initial animations
  document.body.classList.add('loaded');
  
  // Check if we should show back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  }
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Apply throttle to scroll handler
window.addEventListener('scroll', throttle(() => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  
  updateActiveSection();
}, 100));

// ============================================
// Console Easter Egg
// ============================================
console.log('%c👋 Hello there!', 'font-size: 24px; color: #00d4ff;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 16px; color: #0099cc;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'font-size: 14px; color: #888;');
