/* =========================================================
   VÉRA — PHOTOGRAPHY STUDIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  if (menuToggle && navMenu) {

    const closeMenu = () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open menu"
      );

      document.body.classList.remove("menu-open");
    };


    const openMenu = () => {
      menuToggle.classList.add("active");
      navMenu.classList.add("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Close menu"
      );

      document.body.classList.add("menu-open");
    };


    menuToggle.addEventListener("click", () => {

      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });


    /* Close menu after selecting a page section */

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


    /* Close menu with Escape */

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });


    /* Close menu if window becomes desktop-sized */

    window.addEventListener("resize", () => {

      if (window.innerWidth > 680) {
        closeMenu();
      }

    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const updateHeader = () => {

    if (!header) {
      return;
    }

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };


  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (!prefersReducedMotion) {

    const revealElements =
      document.querySelectorAll(
        ".intro-grid, " +
        ".portfolio-item, " +
        ".experience-item, " +
        ".service-row, " +
        ".feature-image, " +
        ".feature-content, " +
        ".about-image, " +
        ".about-content, " +
        ".testimonial-inner"
      );


    revealElements.forEach((element) => {

      element.style.opacity = "0";

      element.style.transform =
        "translateY(25px)";

      element.style.transition =
        "opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";

    });


    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.style.opacity = "1";

            entry.target.style.transform =
              "translateY(0)";

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  }


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }


      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }


      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion
          ? "auto"
          : "smooth"
      });

    });

  });

});
