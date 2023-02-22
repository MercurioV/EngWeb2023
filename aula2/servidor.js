var http = require('http')

http.createServer(function (req,res) {
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end('Hola turma de 2023!')
}).listen(7777);

console.log("Servidor a escuta na porta 7777...")