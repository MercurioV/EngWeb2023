var http = require('http')
var url = require('url')

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
    var tudo = url.parse(req.url,true)
    res.write("Tudo: <pre>"+JSON.stringify(tudo)+"</pre>")
    var q = url.parse(req.url,true).query
    res.write("True: <pre>"+JSON.stringify(q)+"</pre>")
    var qtext = url.parse(req.url,false).query
    res.end("False: <pre>"+JSON.stringify(qtext)+"</pre>")
}).listen(7777)

//localhost:5555/add?n1=17&n2=88
//devuelve105
