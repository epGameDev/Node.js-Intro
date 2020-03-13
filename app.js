const http = require("http");
const fs = require("fs");

function requestListener(request, response) {
    // console.log("URL:", request.url, "Method: ", request.method, "Headers: ", request.headers);

    const url = request.url;
    const method = request.method;

    if (url === "/") {
        response.write("<html>");
        response.write("<head><title>Enter Message</title></head>");
        response.write("<body>");
        response.write(`<form action="/message" method="POST"><input type="text" name="message"></input> <button type="submit">SUBMIT</button> </form>`);
        response.write("</body>");
        response.write("</html>");
        return response.end();
    }

    if (url === "/message" && method === "POST") {
        const reqBody = [];

        request.on('data', chunk => {
            console.log(chunk);
            reqBody.push(chunk);
        });

        return request.on("end", () => {
            // grabs packets and concats them to text.
            const parsedBody = Buffer.concat(reqBody).toString();
            const message = parsedBody.split('=')[1];

            fs.writeFile("message.txt", message, error => {
                response.statusCode = 302;
                response.setHeader('Location', '/');
                return response.end();   
            });
        })
    }

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