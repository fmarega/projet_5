/* ------------ Appel API ---------------*/

const apiBaseUrl = 'http://localhost:3000/api/'; // url de base

function XMLRequest(url, callback = renderHTML, method = "GET", data = "") {
    const request = new XMLHttpRequest();   // Création nouvel objet de type  XMLHttpRequest

    request.onreadystatechange = function () { //recuperation du resultat de la requette
        if (this.readyState == XMLHttpRequest.DONE) {   // Permet de détecter l'évolution de la requête 
            if (this.status == 200 || this.status == 201) { 
                response = JSON.parse(this.responseText);   // Transformer le JSON en objet Javascript
                callback(response);
            }
        }
    };

    request.open(method, url);  //demande à ouvrir une connexion vers un service web.(url de base)
    if (method == 'POST') {
        request.setRequestHeader("Content-Type", "application/json"); //type de mine specifique pour représenter l'objet du tableau des données
        request.send(order = data);
    } else {
        request.send(); // envoi de la requête au service web.
    }
};
