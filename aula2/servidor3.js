var http = require('http')
var meta = require('./auxiliar')

http.createServer(function(req,res){
    console.log(req.method)
    console.log(req.url)
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
    res.write("Criada com o node js por "+meta.myName()+ "en"+meta.myDateTime())
    res.end()
}).listen(7777)
console.log("Servidor a escuta na porta 7777...")