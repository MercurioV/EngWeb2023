// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring')
tareas = null;

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET":
                if((req.url == "/") || (req.url == "/tareas")){
                    axios.get("http://localhost:3000/tareas")
                        .then(response => {
                            tareas = response.data
                            console.log(tareas)
                            // Render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.mainPage(null,tareas, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tareas... Erro: " + erro)
                            res.end()
                        })
                    }
                    else if(/\/tareas\/edit\/(t|T)[0-9]+$/i.test(req.url)){
                        var idTarea = req.url.split("/")[3]
                        // Get aluno record
                        axios.get('http://localhost:3000/tareas/' + idTarea)
                            .then(function(resp){
                                var tarea = resp.data
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(templates.mainPage(tarea,tareas, d))
                            })
                            .catch(erro => {
                                console.log("Erro: " + erro)
                                res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(templates.errorPage("Unable to collect record: " + idTarea, d))
                            })
                    }
                    // GET /tareas/delete/:id --------------------------------------------------------------------
                else if(/\/tareas\/delete\/(t|T)[0-9]+$/i.test(req.url)){
                    var idTarea = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/tareas/' + idTarea)
                        .then(resp => {
                            console.log("Delete " + idTarea + " :: " + resp.status);
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end('<p>Registo apagado:' + idTarea  + '</p>')
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to delete record: " + idTarea, d))
                        })
                }
                else if(/\/tareas\/done\/(t|T)[0-9]+$/i.test(req.url)){
                    var idTarea = req.url.split("/")[3]
                    axios.patch('http://localhost:3000/tareas/' + idTarea, {
                        "done": "true"})
                        .then(resp => {
                            console.log("Delete " + idTarea + " :: " + resp.status);
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end('<p>Tarea moved to done:' + idTarea  + '</p>')
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to delete record: " + idTarea, d))
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                    break
            case "POST":
                if(req.url == '/'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/tareas', result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    // res.write(studentFormPage(d))
                                    res.end('<p>Registo inserido:' + JSON.stringify(resp.data)  + '</p>')
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to insert record...</p>")
                                    res.end()
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if(/\/tareas\/edit\/(t|T)[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.put('http://localhost:3000/tareas/' + result.id, result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.mainPage(null,tareas, d))
                                    res.end()
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to insert record...", d))
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        } 
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



