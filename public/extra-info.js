const textInput = document.querySelector("#ajax");

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
