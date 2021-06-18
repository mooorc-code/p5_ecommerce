const url_path = window.location.href;
const url = new URL( url_path );
const id = url.searchParams.get( "id" );

const getTeddy = async function () {
    let response = await fetch( 'http://localhost:3000/api/teddies/' + id )
    if (response.ok) {
        let data = await response.json();
        teddyProd( data );
        storageProd();
    } else {
        console.error( 'Retour du serveur : ', response.status )
    }
}
getTeddy();

function teddyProd(teddy) {
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

function storageProd() {
    let btn = document.getElementById( "btnStorage" );
    btn.addEventListener( 'click', function ajouter() {
        let card = localStorage.getItem( 'card' );

        if (localStorage.getItem( 'card' ) === null) {
            card = [];
        } else {
            card = JSON.parse( card );
        }

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
        window.location.href = 'panier.html'
    } );
}