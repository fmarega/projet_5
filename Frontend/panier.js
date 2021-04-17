// url pour demander un numéro de commande
const url = apiBaseUrl + 'teddies/order';

/* -------- Contenu du panier -------------- */

function renderHTML() {
    const table = document.getElementById('recPanier');   // table html pour le contenu du panier
    const app = JSON.parse(localStorage.getItem('product'));   // Récupération des elements du localStorage pour le panier
    const thead = document.createElement('thead');
    const tfoot = document.createElement('tfoot');
    const tbody = document.createElement('tbody');
    var prixTotal = 0;

    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);

    thead.innerHTML = "<tr><th>Mes articles</th><th>Ours</th><th>couleur</th><th>Qté</th><th>Prix</th></tr>"; // l'En tête du tableau
    for (let i in app) {    // afficher chaque article sous forme d'un tableau 
        const row = document.createElement('tr');
        row.innerHTML += `<td>
        <img class="appImg" src="${app[i].image}">
        </td>
        <td>${app[i].name}</td>
        <td>${app[i].choix}</td>
        <td>${app[i].qte}</td>
        <td>${app[i].price / 100}€</td>`
        prixTotal += app[i].qte * (app[i].price / 100);
        tbody.appendChild(row);
    }
    // le prix total de tous les produits
    tfoot.innerHTML = '<tr><td colspan="4">Total</td><td>' + prixTotal + '€</td></tr>';

    localStorage.setItem('total', JSON.stringify(prixTotal));
}

//mode de transmition de données (num commande)
async function getOrderId(data) {
    localStorage.setItem('orderId', data.orderId);
}

document.getElementById('submitButton').addEventListener('click', () => { //fonction qui envoit les données du formulaire à l'API
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const submitButton = document.getElementById('submitButton');
    let itemAdd = JSON.parse(localStorage.getItem('product'));
    let products = [];

    for (i = 0; i < itemAdd.length; i++) { // formule qui envoie les articles du localStorage dans le array
        products.push(itemAdd[i].id)
    }

    const contact = {     // données attendues par l'API pour un 'POST'
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "city": city,
        "email": email
    };
    const order = { contact, products };   // données attendues par l'API
    var json = JSON.stringify(order);

    fetch(url,{
    method: 'post',
    body: json
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log('Created Gist:', data);
  }).catch(function (error){
      console.log(error)
  });

    //XMLRequest(url, getOrderId, 'POST', json);
});

renderHTML();
