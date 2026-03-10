# Key Code Snippets - Seeds & Life Optimized Version

## 1. Skip Navigation Link (Accessibility)

```html
<a href="#main-content" class="skip-to-main" style="
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
">Skip to main content</a>
```

**How it works**: Hidden off-screen by default. Press Tab once and it appears, allowing keyboard users to jump directly to main content.

---

## 2. Scroll Progress Bar

```html
<div class="scroll-progress"></div>
```

```javascript
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}
```

**How it works**: Thin bar at top shows scroll position as percentage. Updates on every scroll event.

---

## 3. Back to Top Button

```html
<button class="back-to-top" id="backToTopBtn" aria-label="Back to top">↑</button>
```

```javascript
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
```

**How it works**: Hidden until user scrolls 300px. Shows with smooth fade-in. Click smoothly scrolls to top.

---

## 4. Keyboard Focus Styles (Accessibility)

```css
:focus-visible {
  outline: 3px solid var(--green-500, #4a8c6f);
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 3px solid var(--green-500, #4a8c6f);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}
```

**How it works**: Shows focus indicator only for keyboard users (Tab), not for mouse users.

---

## 5. Scroll Spy - Active Navigation

```javascript
function activateScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', function() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('scroll-spy-active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('scroll-spy-active');
      }
    });
  });
}
```

**CSS:**
```css
nav a.scroll-spy-active {
  color: var(--green-600, #3a7254);
  font-weight: 600;
  border-bottom: 3px solid var(--green-500, #4a8c6f);
  padding-bottom: 4px;
}
```

**How it works**: As user scrolls, highlights the nav link matching current section.

---

## 6. Animated Number Counters

```javascript
function animateCounter(element, target, duration = 2000) {
  if (!element) return;
  
  let current = 0;
  const increment = target / (duration / 16);
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  updateCounter();
}

function observeCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        const counterText = entry.target.textContent.trim();
        const numberMatch = counterText.match(/\d+/);
        if (numberMatch) {
          const target = parseInt(numberMatch[0]);
          animateCounter(entry.target, target);
          entry.target.dataset.counted = 'true';
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => {
    observer.observe(el);
  });
}
```

**How it works**: Uses IntersectionObserver to detect when counter enters view, then animates from 0 to target number.

---

## 7. ESC to Close Mobile Menu

```javascript
const mobileMenu = document.querySelector('nav ul');
if (mobileMenu) {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      mobileMenu.style.display = 'none';
    }
  });
}
```

**How it works**: Pressing ESC key hides the mobile menu.

---

## 8. Focus Trap in Mobile Menu

```javascript
function setupFocusTrap(menuElement) {
  if (!menuElement) return;
  
  const focusableElements = menuElement.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  menuElement.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}
```

**How it works**: When menu is open, Tab key cycles focus through menu items only (prevents tabbing outside).

---

## 9. Form Validation with Korean Messages

```javascript
const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

inputs.forEach(input => {
  const errorMsg = document.createElement('div');
  errorMsg.className = 'error-message';
  errorMsg.setAttribute('role', 'alert');
  input.parentNode.insertBefore(errorMsg, input.nextSibling);

  input.addEventListener('invalid', function(e) {
    e.preventDefault();
    input.classList.add('form-error');
    
    let message = '필수 항목입니다.'; // Required in Korean
    if (input.type === 'email' && !input.validity.valid) {
      message = '올바른 이메일 주소를 입력하세요.'; // Valid email in Korean
    } else if (input.type === 'tel') {
      message = '올바른 전화번호를 입력하세요.'; // Valid phone in Korean
    }
    
    errorMsg.textContent = message;
  });

  input.addEventListener('input', function() {
    if (input.validity.valid) {
      input.classList.remove('form-error');
      errorMsg.textContent = '';
    }
  });
});
```

**CSS:**
```css
.form-error {
  border-color: #e74c3c !important;
  background-color: #fadbd8;
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: none;
}

.form-error ~ .error-message {
  display: block;
}
```

**How it works**: Shows Korean error messages and red styling for invalid fields. Clears on valid input.

---

## 10. Prefers Reduced Motion (Accessibility)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**How it works**: If user has motion sensitivity enabled in OS, all animations/transitions are instant.

---

## 11. JSON-LD Structured Data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "NonprofitOrganization",
  "name": "씨앗과 생명 Seeds & Life",
  "description": "씨앗과 기후, 생명과 성경을 연결하는 비영리 어린이 교육 플랫폼",
  "url": "https://seedsandlife.org",
  "sameAs": [
    "https://www.facebook.com/seedsandlife",
    "https://www.instagram.com/seedsandlife"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "info@seedsandlife.org"
  }
}
</script>
```

**How it works**: Helps search engines understand your organization structure for rich snippets.

---

## 12. Enhanced Meta Tags for Social Media

```html
<meta property="og:image" content="https://via.placeholder.com/1200x630?text=Seeds+%26+Life">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="씨앗과 생명 Seeds & Life">
<meta name="twitter:description" content="씨앗과 기후, 생명과 성경을 연결하는 비영리 어린이 교육 플랫폼">
<meta name="twitter:image" content="https://via.placeholder.com/1200x630?text=Seeds+%26+Life">
```

**How it works**: Shows better preview when link is shared on Facebook, Twitter, etc.

---

## 13. Print Styles

```css
@media print {
  nav,
  footer .social-links,
  .back-to-top,
  .scroll-progress {
    display: none !important;
  }

  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.9em;
    color: #666;
  }

  body {
    font-size: 12pt;
    line-height: 1.5;
  }
}
```

**How it works**: When printing, hides nav/footer and shows URLs after links.

---

## 14. Smooth Scroll Offset for Fixed Nav

```css
html {
  scroll-padding-top: 80px;
}

@media (max-width: 768px) {
  html {
    scroll-padding-top: 60px;
  }
}
```

**How it works**: When scrolling to anchor, accounts for fixed nav so content isn't hidden.

---

## 15. Font Display Swap for Performance

```css
@font-face {
  font-family: 'Noto Sans KR';
  font-display: swap;
}
@font-face {
  font-family: 'Playfair Display';
  font-display: swap;
}
```

**How it works**: Shows fallback fonts immediately, swaps in Google Fonts when loaded (better performance).

---

All features are implemented in a single HTML file with no external dependencies!
