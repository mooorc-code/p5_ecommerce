function afficheTeddy(teddy) {
    let card = `<section class="block-card">
                    <img class="img-teddy" src="${teddy.imageUrl}" alt="teddy">
                    <div class="desc-product">
                        <h2>${teddy.name}</h2>
                        <p>${teddy.price / 100} €</p>
                        <select name="color" id="options">                       
                                                       
                        </select>      
                        <p>${teddy.description}</p>                                              
                        <button id="btnStorage" class="btn-add btn-store ">Ajouter au panier</button>         
                    </div>
    </section>`;

    let cardProd = document.getElementById( "cardProd" );

    cardProd.innerHTML = card;

    let options = '';

    for (let i = 0; i < teddy.colors.length; i++) {
        options += `<option value="${i}">${teddy.colors[i]}</option>`;
    }
    let optionsSelector = document.getElementById( "options" );

    optionsSelector.innerHTML = options;

}

// je récupère l'id qui est dans mon url
const url_path = window.location.href;
const url = new URL( url_path );
const id = url.searchParams.get( "id" );

const getTeddy = async function () {

    let response = await fetch( 'http://localhost:3000/api/teddies/' + id )
    if (response.ok) {
        let data = await response.json();
        afficheTeddy( data );
        afficheColors();
    } else {
        console.error( 'Retour du serveur : ', response.status )
    }
}

getTeddy();

console.log( id );

function afficheColors() {
    let btn = document.getElementById( "btnStorage" );
    console.log( btn );
    btn.addEventListener( 'click', function () {
        console.log( 'item' );
        ajouter();

        if (window.confirm( "L'article a été ajouté au panier" )) {
            window.open( "panier.html", "Nouvelle fenêtre");
        }

    } );
}

function ajouter() {
    let card = localStorage.getItem( 'card' );

    if (localStorage.getItem( 'card' ) === null) {
        card = [];
    } else {
        card = JSON.parse( card );
    }
    console.log( card );

    if (card.some( teddies => teddies._id === id )) {
        card = card.map( teddy => {
            if (teddy._id === id) {
                teddy.qty += 1;
            }
            return teddy;
        } )
    } else {
        let article = {
            "_id": id,
            "qty": 1,
        };
        card.push( article );
    }

    localStorage.setItem( 'card', JSON.stringify( card ) );
}