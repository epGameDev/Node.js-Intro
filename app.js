const http = require("http");

// Custom modules
const routes = require("./routes.js");


const SERVER = http.createServer( routes );

SERVER.listen(3000);