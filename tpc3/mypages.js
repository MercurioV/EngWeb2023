// mypages.js
// 2023-03-01: by jcr

exports.genMainPage = function(lista, data){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>About people...</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-deep-purple">
                <h1>Lista de Pessoas na Base de Dados (${lista.length})</h1>
            </header>
    
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Cidade</th>
                </tr>`

    for(let i=0; i < lista.length; i++){
        pagHTML += `
                <tr>
                    
                        <td>${lista[i].id}</td>
                        <td>
                            <a href="http://localhost:7777/pessoas/${lista[i].id}">
                                ${lista[i].nome}
                            </a>
                        </td>
                        <td>${lista[i].idade}</td>
                        <td>${lista[i].sexo}</td>
                        <td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }

    pagHTML += `
            </table>
        </div>
    
        <footer class="w3-container w3-deep-purple">
            <h5>Generated by pessoas-server: ${data}</h5>
        </footer> 
    </div>
    </body>
</html>
    `
    return pagHTML
}

exports.genPessoaPage = function(pessoa, data){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>About people...</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-deep-purple">
                <h1>${pessoa.nome}</h1>
            </header>

        <div class="w3-container">
            `
    pagHTML += `
            <table class="w3-table-all">
                <tr>
                    <td>Idade</td>
                    <td>${pessoa.idade}</td>
                </tr>
                <tr>
                    <td>Sexo</td>
                    <td>${pessoa.sexo}</td>
                </tr>
                <tr>
                    <td>Morada</td>
                    <td>${pessoa.morada.cidade}, ${pessoa.morada.distrito}</td>
                </tr>
                <tr>
                    <td>BI</td>
                    <td>${pessoa.BI}</td>
                </tr>
                <tr>
                    <td>Profissao</td>
                    <td>${pessoa.profissao}</td>
                </tr>
                <tr>
                    <td>Partido politico</td>
                    <td>${pessoa.partido_politico.party_abbr}, ${pessoa.partido_politico.party_name}</td>
                </tr>
                <tr>
                    <td>Religiao</td>
                    <td>${pessoa.religiao}</td>
                </tr>
                <tr>
                    <td>Figura publica pt</td>
                    <td>${pessoa.figura_publica_pt}</td>
                </tr>
                <tr>
                    <td>Desportos</td>`
        pessoa.desportos.forEach(element => {
            pagHTML += `<td>${element}</td>`
        });
    pagHTML += `</tr>
                <tr>
                    <td>Animais</td>`
        pessoa.animais.forEach(element => {
        pagHTML += `<td>${element}</td>`
        });
    pagHTML += `</tr>
                <tr>
                    <td>Destinos favoritos</td>`
        pessoa.destinos_favoritos.forEach(element => {
        pagHTML += `<td>${element}</td>`
        });
    pagHTML += `</tr>`
    Object.keys(pessoa.atributos).forEach(element => {
        pagHTML+=`<tr>
                    <td>${element}</td>
                    <td>${pessoa.atributos[element]}</td>
                  </tr>`});   
    pagHTML += `<tr>
                    <td>Marca carro</td>
                    <td>${pessoa.marca_carro}</td>
                </tr>`
        pagHTML += `
        </div>
    
        <footer class="w3-container w3-deep-purple">
            <h5>Generated by pessoas-server: ${data}</h5>
        </footer> 
    </div>
    </body>
</html>
    `
    return pagHTML
}
exports.genIndex = function(data){
        var pagHTML = `
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>People web service index.</title>
                <link rel="stylesheet" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-deep-purple">
                        <h1>Index</h1>
                    </header>
                        <div class="w3-container">
                            <table class="w3-table-all">
                                <tr>
                                    <td><a href= http://localhost:7777/pessoas>Lista de pessoas</a></td>
                                </tr>
                                <tr>
                                    <td><a href= http://localhost:7777/ordDesc>Lista de pessoas ordenada</a></td>
                                </tr>
                                <tr>
                                    <td><a href= http://localhost:7777/distsexo>Distribuição por sexo</a></td>
                                </tr>
                                <tr>
                                    <td><a href= http://localhost:7777/distdep>Distribuição por desporto</a></td>
                                </tr>
                                <tr>
                                    <td><a href= http://localhost:7777/toptenprof>Top10 de profissõesgem</a></li></td>
                                </tr>
                        </div>
                    <footer class="w3-container w3-deep-purple">
                        <h5>Generated by pessoas-server: ${data}</h5>
                    </footer> 
                </div>
            </body>
        </html>
        `
     return pagHTML
}

exports.genDistSex = function(hombres,mulheres,outros, data){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Distribution by sex</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-deep-purple">
                <h1>Distribution by sex of the people in the bd</h1>
            </header>
    
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Gender</th>
                    <th>Amount</th>
                </tr>
                <tr>
                        <td>
                            Homens
                        </td>
                        <td>
                            <a href="http://localhost:7777/homens">
                                ${hombres}
                            </a>
                        </td>
                </tr>
                <tr>
                        <td>
                            Mulheres
                        </td>
                        <td>
                            <a href="http://localhost:7777/mulheres">
                                ${mulheres}
                            </a>
                        </td>
                </tr>
                <tr>
                        <td>
                            Outros
                        </td>
                        <td>
                            <a href="http://localhost:7777/outros">
                                ${outros}
                            </a>
                        </td>
                </tr>
            </table>
        </div>
    
        <footer class="w3-container w3-deep-purple">
            <h5>Generated by pessoas-server: ${data}</h5>
        </footer> 
    </div>
    </body>
</html>
    `
    return pagHTML
}

exports.genDeportes = function(dict,data){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Distribution by sports</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-deep-purple">
                <h1>Distribution by the sports played by the people in the bd</h1>
            </header>
    
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Sport</th>
                    <th>Amount</th>
                </tr>`
                
    Object.keys(dict).forEach(element => {
        pagHTML += `
                <tr>
                    
                        <td>${element}</td>
                        <td>
                            <a href="http://localhost:7777/pessoas/dep${element}">
                                ${dict[element]}
                            </a>
                        </td>
                </tr>`
    });
    pagHTML += `</table>
        </div>
    
        <footer class="w3-container w3-deep-purple">
            <h5>Generated by pessoas-server: ${data}</h5>
        </footer> 
    </div>
    </body>
</html>
    `
    return pagHTML
}

exports.genTop10Prof = function(array, data){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Top 10 professions</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-deep-purple">
                <h1>The top 10 mos popular professions among the persons in the DB</h1>
            </header>
    
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Profession</th>
                    <th>Amount</th>
                </tr>`
                
    array.forEach(element => {
        pagHTML += `
                <tr>
                    
                        <td>${element[0]}</td>
                        <td>
                            <a href="http://localhost:7777/pessoas/prof${element[0]}">
                                ${element[1]}
                            </a>
                        </td>
                </tr>`
    });
    pagHTML += `</table>
        </div>
    
        <footer class="w3-container w3-deep-purple">
            <h5>Generated by pessoas-server: ${data}</h5>
        </footer> 
    </div>
    </body>
</html>
    `
    return pagHTML
}