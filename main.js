```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     MOBILE NAVIGATION
  ================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".navigation");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

      navigation.classList.toggle("open");

      menuToggle.classList.toggle("open");

    });

  }


  /* ================================
     RESEARCH CARD
  ================================= */

  function createResearchCard(item) {

    return `

      <article class="research-card">

        <div class="research-meta">

          <span>
            ${item.type}
          </span>

          <span>
            ${item.year}
          </span>

        </div>


        <h3>
          <a href="${item.url}">
            ${item.title}
          </a>
        </h3>


        <p>
          ${item.description}
        </p>


        <div class="research-tags">

          ${item.fields
            .map(field => `<span>${field}</span>`)
            .join("")}

        </div>


        <a
          href="${item.url}"
          class="text-link"
        >
          Read research →
        </a>

      </article>

    `;
  }


  /* ================================
     HOME RESEARCH
  ================================= */

  const homeResearch =
    document.querySelector("#homeResearch");

  if (homeResearch) {

    homeResearch.innerHTML =
      researchItems
        .slice(0, 3)
        .map(createResearchCard)
        .join("");

  }


  /* ================================
     RESEARCH PAGE
  ================================= */

  const researchList =
    document.querySelector("#researchList");

  const researchFilters =
    document.querySelector("#researchFilters");


  if (researchList) {

    function displayResearch(filter = "All") {

      let filtered =
        researchItems;


      if (filter !== "All") {

        filtered =
          researchItems.filter(item =>
            item.fields.includes(filter)
          );

      }


      researchList.innerHTML =
        filtered
          .map(item => `

            <article class="research-row">

              <div class="research-row-type">
                ${item.type}
              </div>

              <div>

                <h3>
                  <a href="${item.url}">
                    ${item.title}
                  </a>
                </h3>

                <p>
                  ${item.description}
                </p>

              </div>

              <div class="research-row-year">
                ${item.year}
              </div>

            </article>

          `)
          .join("");

    }


    displayResearch();


    if (researchFilters) {

      const fields = [
        "All",
        ...new Set(
          researchItems.flatMap(
            item => item.fields
          )
        )
      ];


      researchFilters.innerHTML =
        fields
          .map((field, index) => `

            <button
              class="filter-button ${index === 0 ? "active" : ""}"
              data-filter="${field}"
            >
              ${field}
            </button>

          `)
          .join("");


      researchFilters
        .querySelectorAll(".filter-button")
        .forEach(button => {

          button.addEventListener(
            "click",
            () => {

              researchFilters
                .querySelectorAll(".filter-button")
                .forEach(btn =>
                  btn.classList.remove("active")
                );


              button.classList.add("active");


              displayResearch(
                button.dataset.filter
              );

            }
          );

        });

    }

  }


  /* ================================
     CV RESEARCH
  ================================= */

  const cvResearch =
    document.querySelector("#cvResearch");


  if (cvResearch) {

    cvResearch.innerHTML =
      researchItems
        .map(item => `

          <a
            class="cv-research-item"
            href="${item.url}"
          >

            <div>

              <strong>
                ${item.title}
              </strong>

              <small>
                ${item.type} · ${item.year}
              </small>

            </div>

            <span>
              ↗
            </span>

          </a>

        `)
        .join("");

  }


});
```
