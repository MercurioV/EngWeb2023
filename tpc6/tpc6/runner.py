import requests
import json
import time
with open('./data.json', encoding="utf8") as json_file:
    mapa = json.load(json_file)
    pessoas = mapa['pessoas']
    URL = "http://localhost:3000/pessoas"
    for pessoa in pessoas:
        response = requests.post(URL, json = pessoa)
        print(response.text)