/* =========================================================
   FATHI ACADEMIC CV & RESEARCH
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {

  navToggle.addEventListener("click", () => {

    siteNav.classList.toggle("open");
    navToggle.classList.toggle("active");

  });

}


/* Close mobile menu after clicking a link */

document.querySelectorAll(".site-nav a").forEach(link => {

  link.addEventListener("click", () => {

    if (siteNav) {
      siteNav.classList.remove("open");
    }

    if (navToggle) {
      navToggle.classList.remove("active");
    }

  });

});


/* =========================================================
   RESEARCH CARD
   Used on Home page
   ========================================================= */

function createResearchCard(item) {

  const article = document.createElement("article");

  article.className = "research-card";

  article.innerHTML = `

    <div class="research-card-top">

      <span class="research-year">
        ${item.year}
      </span>

      <span class="research-type">
        ${item.type}
      </span>

    </div>


    <h3>
      ${item.title}
    </h3>


    <p>
      ${item.description}
    </p>


    <div class="research-card-bottom">

      <div class="research-fields">

        ${item.fields
          .map(field => `<span>${field}</span>`)
          .join("")}

      </div>

      <a href="${item.url}" class="text-link">
        Read Research →
      </a>

    </div>

  `;

  return article;
}


/* =========================================================
   HOME — SELECTED RESEARCH
   ========================================================= */

const homeResearch =
  document.getElementById("homeResearch");

if (homeResearch) {

  researchItems
    .slice(0, 3)
    .forEach(item => {

      homeResearch.appendChild(
        createResearchCard(item)
      );

    });

}


/* =========================================================
   ARCHIVE ITEM
   Used on Research / Articles / Briefs / Thesis / CV
   ========================================================= */

function createArchiveItem(item) {

  const article = document.createElement("a");

  article.href = item.url;

  article.className = "archive-item";

  article.innerHTML = `

    <div class="archive-year">
      ${item.year}
    </div>


    <div class="archive-main">

      <h3 class="archive-title">
        ${item.title}
      </h3>


      <p class="archive-description">
        ${item.description}
      </p>


      <div class="archive-fields">

        ${item.fields
          .map(field => `<span>${field}</span>`)
          .join("")}

      </div>

    </div>


    <div class="archive-type">
      ${item.type}
    </div>

  `;

  return article;
}


/* =========================================================
   RESEARCH ARCHIVE
   ========================================================= */

const researchList =
  document.getElementById("researchList");

if (researchList) {

  const filterButtons =
    document.querySelectorAll(".filter-button");


  function renderResearch(filter = "All") {

    researchList.innerHTML = "";


    const filteredItems =
      filter === "All"
        ? researchItems
        : researchItems.filter(item =>
            item.fields.includes(filter)
          );


    if (filteredItems.length === 0) {

      researchList.innerHTML = `

        <div class="empty-state">

          <p>
            No research entries are currently available
            under this field.
          </p>

        </div>

      `;

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
    new URLSearchParams(window.location.search);

  const requestedField =
    params.get("field");


  let initialFilter = "All";


  if (requestedField) {

    const matchingButton =
      [...filterButtons].find(button =>
        button.dataset.filter === requestedField
      );


    if (matchingButton) {

      initialFilter =
        matchingButton.dataset.filter;


      filterButtons.forEach(button =>
        button.classList.remove("active")
      );


      matchingButton.classList.add("active");

    }

  }


  renderResearch(initialFilter);


  /* -------------------------------------------------------
     FILTER BUTTONS
     ------------------------------------------------------- */

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      filterButtons.forEach(btn =>
        btn.classList.remove("active")
      );


      button.classList.add("active");


      const filter =
        button.dataset.filter;


      renderResearch(filter);


      /* Update URL without reloading page */

      const newUrl =
        filter === "All"
          ? window.location.pathname
          : `${window.location.pathname}?field=${encodeURIComponent(filter)}`;


      window.history.replaceState(
        {},
        "",
        newUrl
      );

    });

  });

}


/* =========================================================
   ARTICLES
   ========================================================= */

const articleList =
  document.getElementById("articleList");

if (articleList) {

  const articles =
    researchItems.filter(item =>
      item.category === "Article"
    );


  if (articles.length === 0) {

    articleList.innerHTML = `

      <div class="empty-state">

        <p>
          No research articles have been added yet.
        </p>

      </div>

    `;

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
  document.getElementById("briefList");

if (briefList) {

  const briefs =
    researchItems.filter(item =>
      item.category === "Brief"
    );


  if (briefs.length === 0) {

    briefList.innerHTML = `

      <div class="empty-state">

        <p>
          No research briefs have been added yet.
        </p>

      </div>

    `;

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
  document.getElementById("thesisList");

if (thesisList) {

  const theses =
    researchItems.filter(item =>
      item.category === "Thesis"
    );


  if (theses.length === 0) {

    thesisList.innerHTML = `

      <div class="empty-state">

        <p>
          No thesis research has been added yet.
        </p>

      </div>

    `;

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
  document.getElementById("cvResearch");

if (cvResearch) {

  if (researchItems.length === 0) {

    cvResearch.innerHTML = `

      <div class="empty-state">

        <p>
          No research entries have been added yet.
        </p>

      </div>

    `;

  } else {

    researchItems.forEach(item => {

      cvResearch.appendChild(
        createArchiveItem(item)
      );

    });

  }

}


/* =========================================================
   CURRENT YEAR
   Automatically updates footer year
   ========================================================= */

document.querySelectorAll("[data-current-year]")
  .forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });
