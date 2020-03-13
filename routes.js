const fs = require("fs");

const requestHandler = (request, response) => {

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
};

module.exports = requestHandler;

/* Declaring multiple exports:

    module.exports = {
        handler: requestHandler,
        other: function call(name) {
            console.log(`Hello ${name}!`);
        }
    };
    
*/


/* Also declaring multiple exports

    module.exports.handler = requestHandler;
    module.exports.someText = "Hard coded text";

*/