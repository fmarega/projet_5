/* ------------------------- Affichage produits ------------------------- */

function renderHTML(cart) { //fonction de création du contenu HTML
    const div = document.createElement('div'); //création de la div qui accueillera le contenu

    for (i = 0; i < cart.length; i++) { //exécute la fonction pour chaque ours.
        div.innerHTML += `<div class="card">
        <img src= ${cart[i].imageUrl} alt = "app" class="card-img" \>
        <h5 class="card-title"> ${cart[i].name}</h5>
        <p class="card-text">${cart[i].description}<br \> ${cart[i].price / 100}  €</p>
        <p class="btn" type="button">
        <a class="buttonAjouter" href="Frontend/produit.html?id=${cart[i]._id}"> Sélectionner</a>
        </p>
        </div>`;
    }

    products.appendChild(div); //le contenu (ci-dessus) est placé dans la div "products"(html)
};

XMLRequest(apiBaseUrl + 'teddies/');
