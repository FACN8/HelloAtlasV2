const textInput = document.querySelector("#ajax");
const searchForm = document.querySelector(".search-form");
const countryContainer = document.querySelector(".country-container");
const datalist = document.getElementById("json-datalist");
const SubmitBtn = document.getElementById("submit-btn");
function getPhotos(countryDiv) {
  var url = "/photos?query=" + textInput.value;
  axios
    .get(url)

    .then(response => {
      const responseData = response.data;
      fillPhotos(responseData, countryDiv);
    })
    .catch(error => {
      console.log(error);
    });
}
