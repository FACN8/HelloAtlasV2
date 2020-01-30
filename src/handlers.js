const fs = require("fs");
const path = require("path");
const url = require("url");
const qs = require("querystring");
const createOptions = require("./logic.js");
const countrydata = require("./application.js");

/*--- Handles home directory and opens index.html ---*/
const handleHome = (request, response) => {
  const indexFilePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(indexFilePath, (err, file) => {
    if (err) {
      response.writeHead(500);
      response.end("Our Server is Down!");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

/*--- Handles requests of files from public directory ---*/
const handlePublic = (request, response) => {
  const endpoint = request.url;
  const extension = endpoint.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/x-icon",
    jpeg: "image/x-icon",
    png: "image/x-icon"
  };
  const filePath = path.join(__dirname, "..", endpoint);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      handleError(request, response);
    } else {
      response.writeHead(200, { "Content-Type": extensionType[extension] });
      response.end(file);
    }
  });
};

/*--- Handles typing requests ---*/
const handleType = (request, response) => {
  const endpoint = request.url.split("/")[2];
  response.writeHead(200);
  response.end(JSON.stringify(createOptions(endpoint)));
};

const handleSearchCountry = (request, response) => {
  response.writeHead(200, { "content-Type": "application/json" });
  countrydata(function(error, res) {
    if (error) {
      console.log("error 3");
    } else {
      response.end(JSON.stringify(res));
    }
  });
};

const handleError = (request, response) => {
  response.writeHead(404);
  response.end("Oh no! File not Found!");
};

module.exports = {
  handleHome,
  handlePublic,
  handleType,
  handleSearchCountry,
  handleError
};
