import json
import webbrowser
import os

with open('mapa.json', encoding="utf8") as json_file:
    mapa = json.load(json_file)
    ciudades = mapa['cidades']
    links = mapa['ligações']
    ciudadesLinks = dict()
    ciudades.sort(key=lambda x: x['nome'], reverse=False)
    for c in ciudades:
        salidas = []
        for l in links:
            if(c['id']==l['origem']):
                numciudad = int(l['destino'][1:])-1
                salidas.append([ciudades[numciudad]['id'],ciudades[numciudad]['nome'],l['distância']])
        ciudadesLinks[c['nome']] = salidas

    pagHtml = """<html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>Mapa Virtual</h1>
                <h3>Indice</h3>
                <a name = "Indice">
                <ol>
    """
    for c in ciudades:
        pagHtml+=f"<li><a href= {c['id']}>{c['nome']}</a></li>"

    pagHtml+= """
    </ol>
                    </body>
    </html>"""

    f = open('tpc2/index.html', 'w')
    f.write(pagHtml)
    # close the file
    f.close()

    
    for c in ciudades:
        pagHtml =f"""
                        <html>
                        <head>
                            <title>{c['id']}</title>
                            <meta charset="utf-8"/>
                        </head>
                            <body>
                            <h3>{c['nome']}</h3>
                            <a name={c['id']}></a>
                            <p><b>Distrito: </b>{c['distrito']}</p>
                            <p><b>Poblacion: </b>{c['população']}</p>
                            <p><b>Descripcion: </b>{c['descrição']}</p>
                            <p><b>Destinaciones: </b></p>
                        """
        for c2 in ciudadesLinks[c['nome']]:
            pagHtml +=f"""
                        <ol>
                            <adress><a href="{c2[0]}"><p><b>{c2[1]}</b></a>, Distancia:{c2[2]}</p>
                        </ol>
        """

        pagHtml+=f"""<adress>[<a href="Index">Voltar ao indice]
                        <center>
                            <hr width="80%"/>
                        </center>"""
        pagHtml+="""
            </body>
        </html>
        """

        f = open(f"tpc2/{c['id']}.html", 'w')
        f.write(pagHtml)
        # close the file
        f.close()