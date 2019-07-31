
var fs = require('fs');
var formidable = require('formidable');

var fileName;

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsluge zadania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fileName = files.upload.name;
        fs.renameSync(files.upload.path, fileName);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("recived image: <br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsluge zadania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
    
}

exports.show = function(request, response) {
    fs.readFile(fileName, "binary", function(error, file) {
        response.writeHead(200, {"Content-type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robic.");
    response.write("404 :(");
    response.end();
}