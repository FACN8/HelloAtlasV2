const countriesList = require("../data/countries.json");
const citiesList = require("../data/cities.json");

const requiredNumberOfOptions = 5;
var currentNumberOfOptions = 0;
var optionsList = [];



function createOptions(string) {
    optionsList = [];
    if (string === "") return [];
    if (!/^[A-Za-z]+$/.test(string)) return [];

    string = string.toUpperCase();


    fillList(countriesList, string);
    fillList(citiesList, string);



    return optionsList;
}

function fillList(array, string) {
    array.some(country => {
        if (optionsList.length >= requiredNumberOfOptions) {
            return true;
        }

        if (country.toUpperCase().startsWith(string)) {
            optionsList.push(country);
        }
    });
}
module.exports = createOptions;