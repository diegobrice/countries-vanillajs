(async function load() {
  const BASE_API = "https://restcountries.eu/rest/v2/";

  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const countryList = await getData(`${BASE_API}all`);

  function filtrar(parametro) {
    return countryList.filter((country) => country.region === parametro);
  }

  const $btnFiltroAmerica = document.getElementById("btnFiltroAmerica");
  $btnFiltroAmerica.addEventListener("click", () => {
    const filterList = filtrar("Americas");
    const $countryContainer = document.getElementById("countryContainer");
    renderCountryList(filterList, $countryContainer);
  });
  const $btnFiltroAsia = document.getElementById("btnFiltroAsia");
  $btnFiltroAsia.addEventListener("click", () => {
    const filterList = filtrar("Asia");
    const $countryContainer = document.getElementById("countryContainer");
    renderCountryList(filterList, $countryContainer);
  });

  // const countryRegionEurope = countryList.filter(
  //   (country) => country.region === "Europe"
  // );
  // console.log(countryRegionEurope);
  // countryList.forEach((country) => {
  //   console.log(country.region);
  // });

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
