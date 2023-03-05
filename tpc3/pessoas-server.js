var http = require('http')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    const string = '^/pessoas/dep';
    const string2 = '^/pessoas/prof';
    const regexp = new RegExp(string);
    const regexp2 = new RegExp(string2);
    if(req.url == '/pessoas'){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
            .then(function(resp){
                var pessoas = resp.data
                console.log("Recuperei " + pessoas.length + " registos")
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url.match(/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp){
                var pessoa = resp.data
                
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPessoaPage(pessoa, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url == '/ordDesc'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? 1 : -1
                )
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoasOrdenadas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url == '/w3.css' | req.url == '/pessoas/w3.css'){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                res.write("Erro na leitura do ficheiro: " + err)
            }
            else{
                res.write(data)
            }
            res.end()
        })
    }
    else if(req.url == '/')
    {

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(mypages.genIndex(d))
    }
    else if(req.url == '/distsexo'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                mulheres = 0
                outros = 0
                hombres = 0
                for (let index = 0; index < pessoas.length; index++) {
                    if (pessoas[index].sexo == "masculino") 
                        hombres+=1;
                    if (pessoas[index].sexo == "feminino") 
                        mulheres+=1;
                    if (pessoas[index].sexo == "outro") 
                        outros+=1;
                }

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genDistSex(hombres,mulheres,outros, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url == '/homens')
    {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                homens = []
                for (let index = 0; index < pessoas.length; index++) {
                    if (pessoas[index].sexo == "masculino") 
                        homens.push(pessoas[index])
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(homens, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url == '/mulheres')
    {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                mulheres = []
                for (let index = 0; index < pessoas.length; index++) {
                    if (pessoas[index].sexo == "feminino") 
                        mulheres.push(pessoas[index])
                }
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(mulheres, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url == '/outros')
    {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                outros = []
                for (let index = 0; index < pessoas.length; index++) {
                    if (pessoas[index].sexo == "outro") 
                        outros.push(pessoas[index])
                }
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(outros, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url == '/distdep')
    {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                var dict = {};
                for (let index = 0; index < pessoas.length; index++) {
                    var deportes = pessoas[index]["desportos"]
                    for (let j = 0; j < deportes.length; j++) {
                        const element = pessoas[index]["desportos"][j];
                        if (Object.keys(dict).includes(element)) 
                            dict[element]+=1
                        else{
                            dict[element]=1
                        }
                    }
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genDeportes(dict, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(regexp.test(req.url))
    {
        var deporte = req.url.substring(12)
        dep_array = deporte.split("%20")
        deporte = dep_array.join(" ")
        console.log(deporte)
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                var pessoasdep = [];
                for (let index = 0; index < pessoas.length; index++) {
                    for (let j = 0; j < pessoas[index]["desportos"].length; j++) {
                        const element = pessoas[index]["desportos"][j];
                        if (element==deporte) 
                            pessoasdep.push(pessoas[index])
                    }
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoasdep, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url == '/toptenprof')
    {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                var dictProf = {};
                for (let index = 0; index < pessoas.length; index++) {
                    var profession = pessoas[index]["profissao"]
                    if (Object.keys(dictProf).includes(profession)) 
                            dictProf[profession]+=1
                        else{
                            dictProf[profession]=1
                        }
                }
                // Step - 1
                // Create the array of key-value pairs
                var items = Object.keys(dictProf).map(
                    (key) => { return [key, dictProf[key]] });
                
                // Step - 2
                // Sort the array based on the second element (i.e. the value)
                items.sort(
                    (first, second) => { return first[1] - second[1] }
                ).reverse();
                items = items.slice(0, 10);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genTop10Prof(items, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(regexp2.test(req.url))
    {
        var prof = req.url.substring(13)
        prof_array = prof.split("%20")
        prof = prof_array.join(" ")
        console.log(prof)
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                var pessoasProf = [];
                for (let index = 0; index < pessoas.length; index++) {
                    if(prof == pessoas[index]["profissao"])
                    {
                        pessoasProf.push(pessoas[index])
                    }
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoasProf, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("<p>ERRO: Operasão não suportada...</p>")
    }
    
    
}).listen(7777)

console.log('Servidor Ã  escuta na porta 7777...')