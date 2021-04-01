let cardBasket = document.getElementById( "cardBasket" );

let card = localStorage.getItem( 'card' );
card = JSON.parse( card );


let ajouterItem = document.getElementById( "ajouterItem" );
let totalItem = document.getElementById( "card-total" );

let totalLine = 0;
card.forEach( item => {


    let getTeddy = async () => {
        let url = 'http://localhost:3000/api/teddies/' + item._id;
        const response = await fetch( url );
        const data = await response.json();
        console.log( data );


        let resultat = item.qty * (data.price) / 100;

        totalLine = totalLine + resultat;

        let line = `
                <tr>                    
                    <td><a href="http://p5-ecommerce-test/public/html/produit.html?id=${item._id}"><img id="img-tb" src="${data.imageUrl}" alt="${data.name}"></a></td>                
                    <td>${item.qty}</td>
                    <td>${item.color}</td>
                    <td>${resultat} €</td> 
                </tr>
            `;


        ajouterItem.innerHTML += line;


        let totalprice = `
            <p>Total : ${totalLine} €</p>
        `;

        totalItem.innerHTML = totalprice;
    }


    getTeddy();

} );
let bouton = document.getElementById( 'afficheFormulaire' );
let formulaire = document.getElementById( 'formulaire' );
let close = document.getElementById( 'closeformulaire' );

bouton.addEventListener( 'click', function () {
    formulaire.classList.toggle( 'form-none' )
} )

close.addEventListener( 'click', function () {
    formulaire.classList.toggle( 'form-none' )
} )









