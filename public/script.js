// A listener maybe for typing a character ?
//  var textInput = document.querySelector('#ajax');
var countryContainer = document.querySelector(".country-container");
var datalist = document.getElementById("json-datalist");
var SubmitBtn = document.getElementById("submit-btn");
const apiContainer = document.querySelector(".api-container");

var xhr = new XMLHttpRequest();

textInput.oninput = function() {
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      createDataSet(data);
    }
  };
  xhr.open("GET", "/type/" + textInput.value, true);
  xhr.send();
};

// Create drop down list of suggestions based on data
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

// A listener for submit event / click
var xhr2 = new XMLHttpRequest();

SubmitBtn.addEventListener("click", function() {
  event.preventDefault();

  while (datalist.firstChild) {
    datalist.removeChild(datalist.firstChild);
  }
  xhr2.onreadystatechange = function() {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      var data = JSON.parse(xhr2.responseText);
      removeCountry();
      addCountryDetails(data);
      textInput.value = "";
    }
  };
  xhr2.open("GET", "https://restcountries.eu/rest/v2/all");
  xhr2.send();
});

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
    getPhotos(countryDiv);
  } else {
    var missingCountry = document.createElement("h1");
    var textNode = document.createTextNode("No such country!");
    missingCountry.appendChild(textNode);
    countryContainer.appendChild(missingCountry);
  }
}

function removeCountry() {
  if (countryContainer.childNodes.length > 0) {
    for (var i = 0; i < countryContainer.childNodes.length; i++) {
      countryContainer.removeChild(countryContainer.childNodes[i]);
    }
  }
}

function fillPhotos(photoArray, div) {
  photoArray.forEach(url => {
    var newImg = document.createElement("img");
    newImg.className = "card";
    newImg.src = url;
    div.appendChild(newImg);
  });
}
