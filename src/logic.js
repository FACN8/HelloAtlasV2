// Basic requires for filesystem,path, and the jsons with our data
const fs = require("fs");
const path = require("path");
// Loading the data by requiring the JSON files
const countriesList = require("../data/countries.json");
const citiesList = require("../data/cities.json");

// a const to declare how many options we want to show, can be changed
const requiredNumberOfOptions = 5;
// Given a string it will give an array on options that begin with the string
function createOptions(string) {
  // check for empty string
  if (string === "") return [];
 // if the string contains stuff other than letters no need to search for things 
 // that will not exist in the data lists
  if (!(/^[A-Za-z]+$/.test(string))) return [];
  // optionsList will be an array of options as strings
  var optionsList = [];
  // working on all strings as uppercase
  string = string.toUpperCase();
  // current numbers of options found
  var currentNumberOfOptions = 0;
// the Array.some method, works a bit like forEach but it will
// stop anytime the callback returns true

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

//   exporting module

module.exports = createOptions;
