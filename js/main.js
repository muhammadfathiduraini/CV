/* =========================================================
   FATHI ACADEMIC CV & RESEARCH
   MAIN JAVASCRIPT
   Architecture:
   HTML  = Content
   CSS   = Design
   JS    = Interaction only
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  document
    .querySelectorAll("[data-current-year]")
    .forEach(element => {
      element.textContent = new Date().getFullYear();
    });


  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuToggle && navigation) {

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navigation.classList.toggle("is-open");

      menuToggle.classList.toggle(
        "is-open",
        isOpen
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    navigation
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          navigation.classList.remove("is-open");

          menuToggle.classList.remove("is-open");

          document.body.classList.remove(
            "menu-open"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        });

      });


    document.addEventListener("keydown", event => {

      if (
        event.key === "Escape" &&
        navigation.classList.contains("is-open")
      ) {

        navigation.classList.remove("is-open");

        menuToggle.classList.remove("is-open");

        document.body.classList.remove(
          "menu-open"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });

  }


  /* =========================================================
     RESEARCH ARCHIVE FILTER
     ========================================================= */

  const researchList =
    document.getElementById("researchList");

  const filterButtons =
    document.querySelectorAll(
      ".filter-button"
    );


  if (
    researchList &&
    filterButtons.length
  ) {

    const researchItems =
      Array.from(
        researchList.querySelectorAll(
          ".research-row"
        )
      );


    function updateResearchFilter(
      filter
    ) {

      let visibleCount = 0;


      researchItems.forEach(item => {

        const fields =
          (item.dataset.fields || "")
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);


        const shouldShow =
          filter === "all" ||
          fields.includes(
            filter.toLowerCase()
          );


        if (shouldShow) {

          item.hidden = false;

          requestAnimationFrame(() => {
            item.classList.remove(
              "filter-hidden"
            );
          });

          visibleCount++;

        } else {

          item.classList.add(
            "filter-hidden"
          );

          setTimeout(() => {

            if (
              item.classList.contains(
                "filter-hidden"
              )
            ) {
              item.hidden = true;
            }

          }, 300);

        }

      });


      /* -------------------------------------------------------
         Empty state
      ------------------------------------------------------- */

      let emptyState =
        researchList.querySelector(
          ".research-empty"
        );


      if (visibleCount === 0) {

        if (!emptyState) {

          emptyState =
            document.createElement("div");

          emptyState.className =
            "research-empty";

          emptyState.innerHTML = `
            <p>No research entries are currently available under this field.</p>
          `;

          researchList.appendChild(
            emptyState
          );

        }

      } else {

        if (emptyState) {
          emptyState.remove();
        }

      }

    }


    /* -------------------------------------------------------
       URL FILTER
       Example:
       research.html?field=law
    ------------------------------------------------------- */

    const params =
      new URLSearchParams(
        window.location.search
      );

    const requestedField =
      params.get("field");


    let initialFilter = "all";


    if (requestedField) {

      const requestedButton =
        Array.from(
          filterButtons
        ).find(
          button =>
            button.dataset.filter ===
            requestedField
        );


      if (requestedButton) {

        initialFilter =
          requestedButton.dataset.filter;

      }

    }


    filterButtons.forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.filter ===
          initialFilter
      );

    });


    updateResearchFilter(
      initialFilter
    );


    /* -------------------------------------------------------
       Button interaction
    ------------------------------------------------------- */

    filterButtons.forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const filter =
            button.dataset.filter;


          filterButtons.forEach(
            filterButton => {

              filterButton.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          updateResearchFilter(
            filter
          );


          const newUrl =
            filter === "all"
              ? window.location.pathname
              : `${window.location.pathname}?field=${encodeURIComponent(filter)}`;


          window.history.replaceState(
            {},
            "",
            newUrl
          );

        }
      );

    });

  }


  /* =========================================================
     EXTERNAL LINKS
  ========================================================= */

  document
    .querySelectorAll(
      'a[href^="http://"], a[href^="https://"]'
    )
    .forEach(link => {

      if (
        link.hostname !==
        window.location.hostname
      ) {

        link.target = "_blank";

        link.rel =
          "noopener noreferrer";

      }

    });

});
