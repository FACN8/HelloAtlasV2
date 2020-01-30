const axios = require("axios");

function search(searchTerm, cb) {
  let photoarr = [];
  // Make a request for a user with a given ID
  // console.log(`boy we search for ${searchTerm}`);
  axios
    .get(
      "https://api.unsplash.com/search/photos/?client_id=381bb9776980c63ccf361f3b8668dbf2ab2c7a00697e64a601cc9668ea87dead&query=" +
        searchTerm
    )
    .then(function(response) {
      // handle success
   
      photoarr[0] = response.data.results[0].urls.regular;
      photoarr[1] = response.data.results[1].urls.regular;
      photoarr[2] = response.data.results[2].urls.regular;
      photoarr[3] = response.data.results[3].urls.regular;
      photoarr[4] = response.data.results[4].urls.regular;
      photoarr[5] = response.data.results[5].urls.regular;
      // console.log(`Stringfied json ${JSON.stringify(photoarr)}`);
      cb(JSON.stringify(photoarr));
  
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
  // .finally(function() {

  // // always executed
  // });
}

module.exports = { search };
