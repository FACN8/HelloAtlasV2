var textInput = document.querySelector("#ajax");
var searchForm = document.querySelector(".search-form");
var countryContainer = document.querySelector(".country-container");
var datalist = document.getElementById("json-datalist");
var SubmitBtn = document.getElementById("submit-btn");

/*--- Prevent form default action ---*/
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
});

/*--- Typing listener Section ---*/
textInput.oninput = function() {
  axios
    .get("/type/" + textInput.value)
    .then(function(response) {
      createDataSet(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};
/*--- Typing listener Section - End ---*/

/*--- Create dataSet and autocomplete form ---*/
function createDataSet(data) {
  var datalist = document.getElementById("json-datalist");
  while (datalist.firstChild) {
    datalist.removeChild(datalist.firstChild);
  }
  data.forEach(function(element) {
    var opt = document.createElement("option");
    opt.value = element;
    datalist.appendChild(opt);
  });
}
/*--- Create dataSet and autocomplete form - End ---*/

/*--- submit and serach button section ---*/
SubmitBtn.addEventListener("click", function() {
  while (datalist.firstChild) {
    datalist.removeChild(datalist.firstChild);
  }

  axios
    .get("/countriesFromBackEnd", {
      params: {
        country: textInput.value
      }
    })
    .then(function(response) {
      var data = response.data;
      removeCountry();
      addCountryDetails(data);
      textInput.value = "";
    })
    .catch(function(error) {
      console.log(error);
      console.log("This is the error");

      textInput.value = "";
    });
});
/*--- submit and serach button section - End ---*/

/*--- Country Details Section ---*/
/*--- Manage API response and add details ---*/
function addCountryDetails(data) {
  var country = "";
  var capitalCity = "";
  var population = 0;
  var flag = "";
  var region = "";
  for (var i in data) {
    if (
      data[i].name.toString().toLowerCase() == textInput.value.toLowerCase()
    ) {
      country = data[i].name;
      capitalCity = data[i].capital;
      population = data[i].population
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      flag = data[i].flag;
      region = data[i].region;
    }
  }

  if (country !== "") {
    var countryDiv = document.createElement("div");
    var countryName = document.createElement("h1");
    var countryCapital = document.createElement("h3");
    var countryRegion = document.createElement("h3");
    var countryPop = document.createElement("h3");
    var countryFlag = document.createElement("img");

    countryDiv.className = "country-div";

    countryName.textContent = country;
    countryCapital.textContent = "Capital City: " + capitalCity;
    countryPop.textContent = "Population: " + population;
    countryFlag.src = flag;
    countryRegion.textContent = "Region: " + region;

    countryDiv.appendChild(countryName);
    countryDiv.appendChild(countryCapital);
    countryDiv.appendChild(countryPop);
    countryDiv.appendChild(countryRegion);
    countryDiv.appendChild(countryFlag);

    countryContainer.appendChild(countryDiv);
  } else {
    var missingCountry = document.createElement("h1");
    var textNode = document.createTextNode("No such country!");
    missingCountry.appendChild(textNode);
    countryContainer.appendChild(missingCountry);
  }
}
/*--- Country Details Section - End ---*/

/*--- Clean last search ---*/
function removeCountry() {
  while (countryContainer.firstChild) {
    countryContainer.removeChild(countryContainer.firstChild);
  }
}
