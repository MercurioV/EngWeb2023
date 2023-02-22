var http = require('http')
var url = require('url')

var meuServidor = http.createServer(function(req,res){
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " "+ req.url + " "+d)
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
    var pedido = url.parse(req.url, true).pathname
    if(pedido == "/add")
    {
        var operandos = url.parse(req.url,true).query
        var r = parseInt(operandos.n1,10) + parseInt(operandos.n2,10)
        res.write("<p>O resultado da suma e "+r+"</p>")
    }
    else if(pedido == "/sub")
    {
        var operandos = url.parse(req.url,true).query
        var r = parseInt(operandos.n1,10) - parseInt(operandos.n2,10)
        res.write("<p>O resultado da subtração e "+r+"</p>")
    }
    else{
        res.write("<p>Operação não soportada...</p>")
    }
    res.end()
})

meuServidor.listen(5555)
console.log("Servidor a escuta na porta 5555...")