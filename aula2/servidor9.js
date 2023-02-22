var http = require('http')
var fs = require('fs')

http.createServer(function(req,res){
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " "+ req.url + " "+d) 
    fs.readFile('aula2/pag1.html',function(err,data){
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