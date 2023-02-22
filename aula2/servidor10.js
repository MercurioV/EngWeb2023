var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req,res){
    var pedido = url.parse(req.url,true).pathname

    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " "+ req.url + " "+d) 
    fs.readFile('aula2/pag'+pedido.substring(1)+'.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'})
        if(err){
            res.write("Error: "+err)
        }
        else{
            res.write(data)
        }
        res.end()
    })
}).listen(7777)
console.log("Servidor a escuta na porta 6666...")

//Para casa data set de la otra vez cuando localhost:puerta que enseñe el index.html con una lista ordenada alfabeticamente de los distritos
//Distrito
//  CIudad(Link) <a href="/cx">A ciudade</a>
//localhost:puerta/cx lleva a la ciudad q sea