const apiBaseUrl = 'http://localhost:3000/api/'; // url de base


function XMLRequest(url, callback = renderHTML, method = "GET", data = "") {
    const request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200 || this.status == 201) {
                response = JSON.parse(this.responseText);
                callback(response);
            }
        }
    };

    request.open(method, url);
    if (method == 'POST') {
        request.setRequestHeader("Content-Type", "application/json"); //type de mine specifique pour représenter l'objet du tableau des données
        request.send(order = data);
    } else {
        request.send();
    }
};
