const http = require("http");

function requestListener(request, response) {
    console.log("URL:", request.url, "Method: ",request.method, "Headers: ", request.headers);

    // Sending a responce.
    response.setHeader("Content-Type", "text.html");
    response.write("<html>");
    response.write("<head><title>Game Center 101</title></head>");
    response.write("<body>");
    response.write("<h1>Welcome To The Page!!</h1>");
    response.write("</body>");
    response.write("</html>");
    
    //Finishes response and any new write method after will result in a error.
    response.end();

    // Stops the server.
    // process.exit();
}

const SERVER = http.createServer(requestListener);

SERVER.listen(3000);