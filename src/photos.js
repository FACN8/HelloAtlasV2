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
            for (let i = 0; i < 6; i++)
                photoarr[i] = response.data.results[i].urls.regular;

            // console.log(`Stringfied json ${JSON.stringify(photoarr)}`);
            cb(JSON.stringify(photoarr));

        })
        .catch(function(error) {
            // handle error
            cb(JSON.stringify(["https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"]))

        });
    // .finally(function() {

    // // always executed
    // });
}

module.exports = { search };