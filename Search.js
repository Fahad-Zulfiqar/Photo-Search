const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");
const resultTag = document.querySelector("section.results");

const accessKey = "KSpyvZ5oEtgiNg-U3MtLuLJk9zb_HllgzGsH1MTlJe8";
const apiURL = "https://api.unsplash.com/search/photos?per_page=6&query=";

const unsplashSearch = (term) => {
  return fetch(apiURL + term, {
    method: "GET",
    headers: {
      Authorization: "Client-ID " + accessKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.results.map((result) => {
        return {
          imageSrc: result.urls.regular,
          width: result.width,
          height: result.height,
          name: result.user.name,
          title: result.description || "Untitled",
          background: (result.color || "#cccccc") + "32",
        };
      });
    });
};

const addResults = (results) => {
  resultTag.innerHTML = "";

  results.forEach((result) => {
    resultTag.innerHTML =
      resultTag.innerHTML +
      `
       <div class="single-result">
       <div class="image" style="background-color: ${result.background}">
       <img src="${result.imageSrc}" />
       </div>
       <h2>${result.title}</h2>
       <p>By ${result.name} - ${result.width} X ${result.height} </p>
      </div>
    `;
  });
};

formTag.addEventListener("submit", (event) => {
  const searchTerm = inputTag.value;

  unsplashSearch(searchTerm).then((results) => {
    addResults(results);
  });

  event.preventDefault();
});
