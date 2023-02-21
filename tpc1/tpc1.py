import json
import webbrowser
import os

with open('tpc1/mapaItaly.json', encoding="utf8") as json_file:
    mapa = json.load(json_file)
    ciudades = mapa['citys']

    pagHtml = """<html>
        <head>
            <title>Italy cities</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>Top 20 largest itaian cities</h1>
            <table>
                <tr>
                    <td width = "30%" VALIGN=TOP>
                        <h3>Indice</h3>
                        <a name = "Indice">
                        <ol>
    """
    for c in ciudades:
        pagHtml+=f"<li><a href= #{c['name']}>{c['name']}</a></li>"
    pagHtml+= """
                        </ol>
                    </td>
                    
                    <td width = "70%">
                    <ol>"""

    for c in ciudades:
        pagHtml +=f"""
                        <h3>{c['name']}</h3>
                        <a name={c['name']}></a>
                        <p><b>Population: </b>{c['population']} </p>
                        <p><b>Most famous monument: </b>{c['monument']}</p>
                        <p><img src="{c['Monument photo']}" width="300" height="200"/></p>
                        <p><b>Typical dish: </b>{c['Typical dish']} </p>
                        <p><b>Description of the dish: </b>{c['Description of the dish']}</p>
                        <p><img src="{c['Dish photo']}" width="300" height="200"/></p>
                        <p><b>Football club: </b>{c['Football club']}</p>
                        <p><b>Stadium name: </b>{c['Stadium name']}</p>
                        <p><img src="{c['Stadium photo']}" width="300" height="200"/></p>
                        """

        pagHtml+=f"""<adress>[<a href="#indice">Voltar ao indice]</a></adress>
                        <center>
                            <hr width="100%"/>
                        </center>"""
    pagHtml+= """
    </ol>
                    </td>"""
    
    pagHtml+="""
                </tr>
            </table>
        </body>
    </html>
    """

f = open('template.html', 'w')
f.write(pagHtml)
# close the file
f.close()
# 1st method how to open html files in chrome using
filename = 'file:///'+os.getcwd()+'/' + 'template.html'
webbrowser.open_new_tab(filename)