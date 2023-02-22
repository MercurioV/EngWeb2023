var http = require('http')
var meta = require('./auxiliar')

var meuServidor = http.createServer(function(req,res){
    var d = new Date().toISOString().substring(0,16)
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
    console.log(req.method + " "+ req.url + " "+d)
    res.write("<pre>"+req.method+ " "+req.url+" "+d+"</pre>")
    res.end()
})

meuServidor.listen(7777)
console.log("Servidor a escuta na porta 7777...")