const http = require("http");
const router = require("./router");
const server = http.createServer(router);

require("dotenv").config();

server.listen(process.env.PORT || 8080, () => {
  console.log("Server is listening on port 8080,armed and ready!");
});
