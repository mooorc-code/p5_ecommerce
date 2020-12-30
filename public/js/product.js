function afficheTeddy(teddy) {


    let card = `<div class="content">
            
                <div class="content-overlay"></div>                
                <img class="content-image" src="${teddy.imageUrl}" alt="${teddy.name}">
                <div class="content-details fadeIn-right">
                    <div class="price">
                        <span>${teddy.price / 100} €</span>
                        <a class="btn" id="${teddy._id}" href='html/produit.html?id=${teddy._id}' >Détails</a>
                    </div>
                </div>
            
            <div class="contentDesc">
                <h2>${teddy.name}</h2>
                <p>${teddy.description}</p>                        
            </div>
        </div>`;

    let cardProd = document.getElementById( "cardProd" );

    cardProd.innerHTML = card;


}


// je récupère l'id qui est dans mon url
const url_path = window.location.href;
const url = new URL( url_path );
const id = url.searchParams.get( "id" );

const getTeddy = async function () {
    try {
        let response = await fetch( 'http://localhost:3000/api/teddies/' + id )
        if (response.ok) {
            let data = await response.json();
            afficheTeddy(data);
        } else {
            console.error( 'Retour du serveur : ', response.status )
        }
    } catch (e) {
        console.log( e );
    }
}

getTeddy();

console.log( id );


// http://localhost:3000/api/teddies/5be9c8541c9d440000665243

// function product() {
//     document.location = `products.html?id=${id}`;


// j'appelle l'api sur la route get/id pour avoir les infos

//     fetch( 'http://p5-ecommerce-test/public/html/produit.html?' + params.get( 'id' ) )
//         .then( response => {
//             console.log( response );
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 return promise.reject( response.status );
//             }
//         } )
// }
//
// const url = new URLSearchParams( window.location.search );

// l'api me renvoi les données

// L'initalise mon template

// je l'envoi à mon fichier html pour afficher mes infos
// function cardProd(procuct) {
//     let cardProd = `<div class="block-img">
//         <img class="content-image" src="${teddies.imageUrl}" alt="${teddies[i].name}">
//     </div>
//     <div class="block-desc">
//         <h2>${teddies[i].name}</h2>
//         <span>${teddies[i].price / 100} €</span>
//         <p>${teddies[i].description}</p>
//         <select name="color" id="${product[i].color}">
//             <option value="">--Please choose an option--</option>
//             <option value=""></option>
//         </select>
//         <select class="content__prod" name="quantité" id="">
//             <option value="1">--Please choose an option--</option>
//             <option value="2"></option>
//         </select>
//         <span>quantité</span>
//         <button>bouton add</button>
//     </div>`;
//
//     let productCard = document.getElementById( "productCard" );
//     productCard.innerHTML += cardProd;
// }

