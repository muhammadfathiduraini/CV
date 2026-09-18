/* =========================================================
   FATHI ACADEMIC CV
   MAIN INTERACTIONS v2
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     CURRENT YEAR
  --------------------------------------------------------- */

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  /* ---------------------------------------------------------
     MOBILE NAVIGATION
  --------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.classList.toggle("is-open", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

    });


    mainNav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("is-open");

        menuToggle.classList.remove("is-open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

        document.body.classList.remove(
          "menu-open"
        );

      });

    });

  }


  /* ---------------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------------- */

  const revealElements =
    document.querySelectorAll(
      ".section-heading, .interest-item, .research-row, .academic-item, .contact-preview"
    );

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("reveal");

            requestAnimationFrame(() => {
              entry.target.classList.add("is-visible");
            });

            observerInstance.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

  }


  /* ---------------------------------------------------------
     KEYBOARD ESCAPE
  --------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
      return;
    }

    if (!mainNav || !menuToggle) {
      return;
    }

    mainNav.classList.remove("is-open");

    menuToggle.classList.remove("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );

    document.body.classList.remove(
      "menu-open"
    );

  });


  /* ---------------------------------------------------------
     EXTERNAL LINKS
  --------------------------------------------------------- */

  document
    .querySelectorAll('a[href^="http"]')
    .forEach((link) => {

      link.setAttribute(
        "target",
        "_blank"
      );

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    });

});
