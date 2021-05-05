// url pour demander un numéro de commande
const url = apiBaseUrl + 'teddies/order';

/* -------- Contenu du panier -------------- */

function renderHTML() {
	const table = document.getElementById('recPanier'); // table html pour le contenu du panier
	const app = JSON.parse(localStorage.getItem('product')); // Récupération des elements du localStorage pour le panier
	const thead = document.createElement('thead');
	const tfoot = document.createElement('tfoot');
	const tbody = document.createElement('tbody');
	var prixTotal = 0;

	table.appendChild(thead);
	table.appendChild(tbody);
	table.appendChild(tfoot);

	thead.innerHTML = '<tr><th>Mes articles</th><th>Ours</th><th>couleur</th><th>Qté</th><th>Prix</th></tr>'; // l'En tête du tableau
	for (let i in app) {
		// afficher chaque article sous forme d'un tableau
		const row = document.createElement('tr');
		row.innerHTML += `<td>
        <img class="appImg" src="${app[i].image}">
        </td>
        <td>${app[i].name}</td>
        <td>${app[i].choix}</td>
        <td>${app[i].qte}</td>
        <td>${app[i].price / 100}€</td>`;
		prixTotal += app[i].qte * (app[i].price / 100);
		tbody.appendChild(row);
	}
	// le prix total de tous les produits
	tfoot.innerHTML = '<tr><td colspan="4">Total</td><td>' + prixTotal + '€</td></tr>';
	localStorage.setItem('total', JSON.stringify(prixTotal));
}

//mode de transmition de données (num commande)
function getOrderId(data) {
	localStorage.setItem('orderId', data.orderId);
}

function isInvalid(contact) {
	var badChar = /[0-9\*\.\(\)\[\]\{\}\?,;:!\$\^\"~&]/;
	var goodEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

	return badChar.test(contact.firstName) ||
		badChar.test(contact.lastName) ||
		badChar.test(contact.city) ||
		!goodEmail.test(contact.email);
}

function sendData(contact) {
	//fonction qui envoit les données du formulaire à l'API
	console.log('test', contact);
	let itemAdd = JSON.parse(localStorage.getItem('product'));
	let products = [];

	for (i = 0; i < itemAdd.length; i++) {
		// formule qui envoie les articles du localStorage dans le array
		products.push(itemAdd[i].id);
	}

	const order = { contact, products }; // données attendues par l'API (les contacts et le tableau des produits)

	fetch(url, {	//pour exécuter la requêtes HTTP de manière asynchrone
		method: 'post',
		headers: { // pour prévenir le server qu'il va recevoir du json
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: json // le corps de la requette
	})
		.then(function (response) {	//la fonction qui va être résolue
			return response.json();
		})
		.then(function (data) {	//exécuter ce code dès que la promesse est résolue
			console.log('Created Gist:', data);
			if (data.orderId != undefined) {
				localStorage.setItem('orderId', data.orderId);
				location.href = `recap.html?order-id=${data.orderId}`;
			}

		})
		.catch(function (error) {	//exécuter ce code dès qu'une erreur est survenue.
			console.log(error);
		});
}

document.getElementById('submitButton').addEventListener('click', (event) => {
	console.log('validation ===>')
	//fonction qui envoit les données du formulaire à l'API
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const address = document.getElementById('address').value;
	const city = document.getElementById('city').value;
	const email = document.getElementById('email').value;
	const contact = {
		firstName: firstName,
		lastName: lastName,
		address: address,
		city: city,
		email: email,
	};
	console.log('validation ===>', isInvalid(contact))

	if (isInvalid(contact)) {
		document.getElementById('firstName').value = "error";
		event.preventDefault();
	} else {
		console.log('test de else')
		sendData(contact);
	}
});

renderHTML();
