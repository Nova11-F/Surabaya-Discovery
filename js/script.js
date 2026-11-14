document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. STICKY NAVBAR ON SCROLL ---------- */
  const header = document.getElementById("site-header");

  const handleHeaderScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  /* ---------- 2. HAMBURGER MENU ---------- */
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("main-nav");

  const closeMenu = () => {
    hamburger.classList.remove("open");
    mainNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu after a nav link is tapped
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ---------- 3. SMOOTH SCROLLING FOR IN-PAGE LINKS ---------- */
  // (CSS `scroll-behavior: smooth` already handles most of this;
  // this also accounts for the sticky header offset on click.)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length <= 1) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* ---------- 4. ACTIVE NAVIGATION ON SCROLL ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
    });
  };

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* ---------- 5. BACK TO TOP BUTTON ---------- */
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle("visible", window.scrollY > 480);
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 6. SCROLL REVEAL ANIMATION ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el, index) => {
    // small stagger for a smoother, more natural reveal
    el.style.transitionDelay = `${(index % 4) * 80}ms`;
    revealObserver.observe(el);
  });

});
