(async function load() {
  const BASE_API = "https://restcountries.eu/rest/v2/";

  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const countryList = await getData(`${BASE_API}all`);

  function actualizarActive(e) {
    $btnFilter.forEach((btn) => {
      if (btn.dataset.region === e) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function filtraRegion(parametro) {
    $dropContent.classList.toggle("display");
    actualizarActive(parametro);
    if (parametro === "All") return countryList;
    return countryList.filter((country) => country.region === parametro);
  }

  function showDrop() {
    $dropContent.classList.toggle("display");
  }

  const $dropBtn = document.querySelector(".dropbtn");
  const $dropContent = document.querySelector(".dropdown-content");
  $dropBtn.addEventListener("click", showDrop);

  const $btnFilter = document.querySelectorAll(".btnFilter");
  $btnFilter.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filterList = filtraRegion(btn.dataset.region);
      renderCountryList(filterList, $countryContainer);
    });
  });

  function findCountries(input) {
    return countryList.filter((country) => {
      const regex = new RegExp(input, "gi");
      return (
        country.name.match(regex) ||
        country.subregion.match(regex) ||
        country.region.match(regex) ||
        country.capital.match(regex)
      );
    });
  }

  function showCountries() {
    event.preventDefault();
    actualizarActive();
    const matchCountries = findCountries(this.value);
    renderCountryList(matchCountries, $countryContainer);
  }

  const $searchText = document.querySelector("#search-text");
  $searchText.addEventListener("change", showCountries);
  $searchText.addEventListener("keyup", showCountries);
  const $form = document.querySelector("#form");
  $form.addEventListener("submit", () => event.preventDefault());

  function countryTemplate(country) {
    return `
      <div class="item">
        <img
          class="item__img"
          src="${country.flag}"
          alt=""
        />
        <div class="item__content">
          <h2 class="item__title">${country.name}</h2>
          <ul>
            <li><span>Population: </span>
            ${addCommas(country.population)}</li>
            <li><span>Region: </span>${country.region}</li>
            <li><span>Capital: </span>${country.capital}</li>
          </ul>
        </div>
      </div>`;
  }

  function createTemplate(HTMLstring) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLstring;
    return html.body.children[0];
  }

  function renderCountryList(list, $container) {
    // $container.children[0].remove();
    $container.innerHTML = "";
    list.forEach((country) => {
      const HTMLstring = countryTemplate(country);
      const countryElement = createTemplate(HTMLstring);
      $container.append(countryElement);
    });
  }

  const $countryContainer = document.getElementById("countryContainer");
  renderCountryList(countryList, $countryContainer);

  function addCommas(nStr) {
    nStr += "";
    var x = nStr.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  }
})();
