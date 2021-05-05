//window localStorage pour de garder les information
const productId = new URL(window.location).searchParams.get('id');
const url = apiBaseUrl + 'teddies/' + productId; // Création de chaque produit en fonction de l'id.

/* ----------------- Affichage produit -------------*/

function renderHTML(cart) {
	//fonction de création du contenu HTML
	const section = document.getElementsByTagName('section');
	const product = document.querySelector('#produit');
	const div = document.createElement('div');
	const colors = cart.colors;

	div.innerHTML += `<img class="app" src="${cart.imageUrl}">
    <h1 class="name">${cart.name}</h1>
    <p class="description">${cart.description}</p>
    <p class ="prix">${cart.price / 100} ,00€</p>
    <select id="colors"></select>
    <label class="col-lg-3" >Quantité</label><input type = "number" id = "qte" style="width:120px" class="input-sm form-control"></input><br>`;
	product.appendChild(div);

	const form = document.getElementById('colors');
	colors.forEach(displayLense); // parcourt un à un les éléments du tableau couleur de l'API
	div.appendChild(document.getElementById('ajoutPanier'));
	div.appendChild(form);
}
//Choix des couleurs
function displayLense(item) {
	document.getElementById('colors').innerHTML += `<option>${item}</option>`; // formulaire de choix des couleurs
}

/* --------- Localstorage---------------- */
//localstorage permet d'acceder à un objet local storage

document.getElementById('ajoutPanier').addEventListener('click', () => {
	//reagir lors d'un clic sur le button (ajouter au panier)
	let app = {
		//obj ours pour la création panier (+localStorage)
		id: response._id,
		name: response.name,
		choix: colors.value, //pour récupérer seulement la couleur choisie
		price: response.price,
		qte: parseInt(document.getElementById('qte').value) || 1, //analyse l'element fourni en argument et renvoie un entier exprimé dans une base donnée.
		image: response.imageUrl
	};

	const itemAdd = localStorage.getItem('product'); //la fonction pour la lecture de l'article localStorage dans le tableau

	if (itemAdd) {
		//Si le panier contient déja un produit, il va ajouter le nouveu produit à la fin du tableau
		itemInCart = JSON.parse(itemAdd); //Transforme l'element JSON en JS
	} else {
		itemInCart = []; //sinon , crée un panier sous forme de tableau (format attendu par l'API)
	}

	itemInCart.push(app); //ajout de l'ours séléctionné à la fin du tableau(dans le panier)
	localStorage.setItem('product', JSON.stringify(itemInCart)); //envoie les données obtenues dans le localStorage
	location.href = 'panier.html'; // Redirection vers la page de panier
}); //methode Json.stringify convertit les objet javascript en Json

XMLRequest(url);
