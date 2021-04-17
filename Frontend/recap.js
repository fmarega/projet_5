function recapCommande(data) {
    const section = document.getElementById('recapPanier'); // Emplacement du contenu que l'on va créer
    const total = JSON.parse(localStorage.getItem('total'))
    const nbrOfArticles = (JSON.parse(localStorage.getItem('product'))).length;
    const orderId = localStorage.getItem('orderId');
    const article = document.createElement('article');

    article.setAttribute('id', 'recap');
    if (nbrOfArticles == 1) {
        article.innerHTML += `<p class="recap">Merci pour votre confiance!<br>
        <br> votre commande a bien été enregistrée et transmise au vendeur pour validation: nombre de commande: ${JSON.parse(localStorage.product).length} numéro de commande: ${orderId} vous sera livrée dans les plus brefs délais.
        <br> Votre commande a pour total: ${total}
        <br> Vous recevrez très prochainement un e-mail de confirmation de la part du vendeur.</p>`;
    } else {
        article.innerHTML += `<p class="recap">Merci pour vos commande chez ORINOCO,<br> votre commande a bien été enregistrée et transmise au vendeur!
        <br> Nombre de commande: ${JSON.parse(localStorage.product).length} le numéro du commande ${orderId} vos commandes seront livrées dans les plus brefs délais.
        <br> Votre commande a pour total: ${total}
        <br> Vous recevrez très prochainement un e-mail dès que celle-ci sera remise à notre transporteur.</p>`
    }
    section.appendChild(article);
};

recapCommande();
localStorage.clear();