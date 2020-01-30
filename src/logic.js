const countriesList = require("../data/countries.json");
const citiesList = require("../data/cities.json");

const requiredNumberOfOptions = 5;
function createOptions(string) {
  if (string === "") return [];
  if (!/^[A-Za-z]+$/.test(string)) return [];
  var optionsList = [];
  string = string.toUpperCase();

  var currentNumberOfOptions = 0;

  
  countriesList.some(country => {
    if (currentNumberOfOptions >= requiredNumberOfOptions) {
      return true;
    }

    if (country.toUpperCase().startsWith(string)) {
      optionsList.push(country);
      currentNumberOfOptions++;
    }
  });
  citiesList.some(city => {
    if (currentNumberOfOptions >= requiredNumberOfOptions) {
      return true;
    }
    if (city.toUpperCase().startsWith(string)) {
      optionsList.push(city);
      currentNumberOfOptions++;
    }
  });

  return optionsList;
}

module.exports = createOptions;
