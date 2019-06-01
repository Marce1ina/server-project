const fs = require("fs");
const formidable = require("formidable");

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");

    fs.readFile("templates/start.html", function(err, html) {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write(html);
        response.end();
    });
};

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");

    const form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, `./uploads/${files.upload.name}`);
        fs.readFile(`./uploads/${files.upload.name}`, function(err, data) {
            response.writeHead(200, { "Content-Type": "image/png; charset=utf-8" });
            response.write(data);
            response.end();
        });
    });
};

// exports.show = function(request, response) {
//     fs.readFile("uploads/webdriverio.png", "binary", function(error, file) {
//         response.writeHead(200, { "Content-Type": "image/png" });
//         response.write(file, "binary");
//         response.end();
//     });
// };

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");

    response.write("404 :(");
    response.end();
};
