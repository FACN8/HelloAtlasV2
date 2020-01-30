const axios = require("axios");
const allCountries = "https://restcountries.eu/rest/v2/all";

const countrydata = cb => {
  axios
    .get(allCountries)
    .then(function(response) {
      cb(null, response.data);
    })
    .catch(function(error) {
      console.log("Error 1");
      cb(error);
    });
};
module.exports = countrydata;
