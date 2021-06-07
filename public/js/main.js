const getTeddies = async function () {
    try {
        let response = await fetch( 'http://localhost:3000/api/teddies' )
        if (response.ok) {
            let data = await response.json();
            afficheTeddie( data );
            return true;
        } else {
            console.error( 'Retour du serveur : ', response.status )
        }
    } catch (e) {
        console.log( e );
    }
}
getTeddies();

function afficheTeddie(teddies) {
    for (let i = 0; i < teddies.length; i++) {
        let card = `<div class="content">
            <div class="content-overlay"></div>
            <img class="content-image" src="${teddies[i].imageUrl}" alt="${teddies[i].name}">
            <div class="content-details fadeIn-right">
                <div class="price">
                    <span>${teddies[i].price / 100} €</span>
                    <a class="btn" id="${teddies[i]._id}" href='html/produit.html?id=${teddies[i]._id}' >Détails</a>
                </div>
            </div>

            <div class="contentDesc">
                <h2>${teddies[i].name}</h2>
                <p>${teddies[i].description}</p>
            </div>
        </div>`;

        let gridCards = document.getElementById( "gridCards" );
        gridCards.innerHTML += card;
    }
}