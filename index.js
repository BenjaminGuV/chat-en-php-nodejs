var server = require("./inicio");
var router = require("./router");
var requestHandlers = require("./manipuladores");

var handle = {};
handle["/"] = requestHandlers.iniciar;
handle["/iniciar"] = requestHandlers.iniciar;
handle["/subir"] = requestHandlers.subir;

server.iniciar( router.route, handle );