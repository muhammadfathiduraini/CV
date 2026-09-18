/* =========================================================
   FATHI ACADEMIC CV & RESEARCH
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     RESEARCH DATA
     ========================================================= */

  const items = Array.isArray(window.researchItems)
    ? window.researchItems
    : [];


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".main-nav");

  if (menuToggle && navigation) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navigation.classList.toggle("open");

      menuToggle.classList.toggle(
        "active",
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

          navigation.classList.remove("open");

          menuToggle.classList.remove("active");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        });

      });

  }


  /* =========================================================
     RESEARCH CARD
     Used on Home page
     ========================================================= */

  function createResearchCard(item) {

    const article =
      document.createElement("article");

    article.className =
      "research-card";

    const fields =
      Array.isArray(item.fields)
        ? item.fields
        : [];

    article.innerHTML = `

      <div class="research-card-top">

        <span class="research-year">
          ${item.year || ""}
        </span>

        <span class="research-type">
          ${item.type || ""}
        </span>

      </div>

      <h3>
        ${item.title || "Untitled Research"}
      </h3>

      <p>
        ${item.description || ""}
      </p>

      <div class="research-card-bottom">

        <div class="research-fields">

          ${fields
            .map(field => `<span>${field}</span>`)
            .join("")}

        </div>

        <a
          href="${item.url || "#"}"
          class="text-link"
        >
          Read Research →
        </a>

      </div>

    `;

    return article;

  }


  /* =========================================================
     ARCHIVE ITEM
     Used on Research / Articles / Briefs / Thesis / CV
     ========================================================= */

  function createArchiveItem(item) {

    const article =
      document.createElement("a");

    article.href =
      item.url || "#";

    article.className =
      "archive-item";

    const fields =
      Array.isArray(item.fields)
        ? item.fields
        : [];

    article.innerHTML = `

      <div class="archive-year">
        ${item.year || ""}
      </div>

      <div class="archive-main">

        <h3 class="archive-title">
          ${item.title || "Untitled Research"}
        </h3>

        <p class="archive-description">
          ${item.description || ""}
        </p>

        <div class="archive-fields">

          ${fields
            .map(field => `<span>${field}</span>`)
            .join("")}

        </div>

      </div>

      <div class="archive-type">
        ${item.type || ""}
      </div>

    `;

    return article;

  }


  /* =========================================================
     EMPTY STATE
     ========================================================= */

  function showEmptyState(element, message) {

    if (!element) {
      return;
    }

    element.innerHTML = `

      <div class="empty-state">

        <p>
          ${message}
        </p>

      </div>

    `;

  }


  /* =========================================================
     HOME — SELECTED RESEARCH
     ========================================================= */

  const homeResearch =
    document.getElementById("homeResearch");

  if (homeResearch) {

    homeResearch.innerHTML = "";

    if (items.length === 0) {

      showEmptyState(
        homeResearch,
        "No research entries have been added yet."
      );

    } else {

      items
        .slice(0, 3)
        .forEach(item => {

          homeResearch.appendChild(
            createResearchCard(item)
          );

        });

    }

  }


  /* =========================================================
     RESEARCH ARCHIVE
     ========================================================= */

  const researchList =
    document.getElementById("researchList");

  if (researchList) {

    const filterButtons =
      document.querySelectorAll(
        ".filter-button"
      );


    function renderResearch(filter = "All") {

      researchList.innerHTML = "";


      const filteredItems =
        filter === "All"
          ? items
          : items.filter(item => {

              const fields =
                Array.isArray(item.fields)
                  ? item.fields
                  : [];

              return fields.includes(filter);

            });


      if (filteredItems.length === 0) {

        showEmptyState(
          researchList,
          "No research entries are currently available under this field."
        );

        return;

      }


      filteredItems.forEach(item => {

        researchList.appendChild(
          createArchiveItem(item)
        );

      });

    }


    /* -------------------------------------------------------
       URL FILTER
       Example:
       research.html?field=International%20Law
       ------------------------------------------------------- */

    const params =
      new URLSearchParams(
        window.location.search
      );

    const requestedField =
      params.get("field");


    let initialFilter =
      "All";


    if (requestedField) {

      const matchingButton =
        [
          ...filterButtons
        ].find(
          button =>
            button.dataset.filter ===
            requestedField
        );


      if (matchingButton) {

        initialFilter =
          matchingButton.dataset.filter;


        filterButtons.forEach(button => {

          button.classList.remove(
            "active"
          );

        });


        matchingButton.classList.add(
          "active"
        );

      }

    }


    renderResearch(
      initialFilter
    );


    /* -------------------------------------------------------
       FILTER BUTTONS
       ------------------------------------------------------- */

    filterButtons.forEach(button => {

      button.addEventListener(
        "click",
        () => {

          filterButtons.forEach(btn => {

            btn.classList.remove(
              "active"
            );

          });


          button.classList.add(
            "active"
          );


          const filter =
            button.dataset.filter;


          renderResearch(
            filter
          );


          const newUrl =
            filter === "All"
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
     ARTICLES
     ========================================================= */

  const articleList =
    document.getElementById(
      "articleList"
    );

  if (articleList) {

    const articles =
      items.filter(
        item =>
          item.category === "Article"
      );


    if (articles.length === 0) {

      showEmptyState(
        articleList,
        "No research articles have been added yet."
      );

    } else {

      articles.forEach(item => {

        articleList.appendChild(
          createArchiveItem(item)
        );

      });

    }

  }


  /* =========================================================
     RESEARCH BRIEFS
     ========================================================= */

  const briefList =
    document.getElementById(
      "briefList"
    );

  if (briefList) {

    const briefs =
      items.filter(
        item =>
          item.category === "Brief"
      );


    if (briefs.length === 0) {

      showEmptyState(
        briefList,
        "No research briefs have been added yet."
      );

    } else {

      briefs.forEach(item => {

        briefList.appendChild(
          createArchiveItem(item)
        );

      });

    }

  }


  /* =========================================================
     THESIS
     ========================================================= */

  const thesisList =
    document.getElementById(
      "thesisList"
    );

  if (thesisList) {

    const theses =
      items.filter(
        item =>
          item.category === "Thesis"
      );


    if (theses.length === 0) {

      showEmptyState(
        thesisList,
        "No thesis research has been added yet."
      );

    } else {

      theses.forEach(item => {

        thesisList.appendChild(
          createArchiveItem(item)
        );

      });

    }

  }


  /* =========================================================
     CV — RESEARCH
     ========================================================= */

  const cvResearch =
    document.getElementById(
      "cvResearch"
    );

  if (cvResearch) {

    if (items.length === 0) {

      showEmptyState(
        cvResearch,
        "No research entries have been added yet."
      );

    } else {

      items.forEach(item => {

        cvResearch.appendChild(
          createArchiveItem(item)
        );

      });

    }

  }


  /* =========================================================
     CURRENT YEAR
     ========================================================= */

  document
    .querySelectorAll(
      "[data-current-year]"
    )
    .forEach(element => {

      element.textContent =
        new Date().getFullYear();

    });


});
