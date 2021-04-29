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

//bouton formulaire
let bouton = document.getElementById( 'afficheFormulaire' );
let formulaire = document.getElementById( 'formulaire' );
let close = document.getElementById( 'closeformulaire' );

bouton.addEventListener( 'click', function () {
    formulaire.classList.toggle( 'form-none' )
} )

close.addEventListener( 'click', function () {
    formulaire.classList.toggle( 'form-none' )
} );

let valider = document.getElementById( 'envoyer' )
valider.addEventListener( 'click', function () {
    let error = 0;

    let msgerrorFirstname = document.getElementById( 'form-msgerror-firstname' );
    let firstname = document.getElementById( 'prenom' ).value;
    if (!firstname) {
        msgerrorFirstname.style.display = 'block';
        console.log( 'erreur firstname' );
        error++;
    } else {
        console.log( 'firstname ok' );
        msgerrorFirstname.style.display = 'none';
    }

    let msgerrorLastname = document.getElementById( 'form-msgerror-lastname' );
    let lastname = document.getElementById( 'nom' ).value;
    if (!lastname) {
        msgerrorLastname.style.display = 'block';
        console.log( 'erreur lastname' );
        error++;
    } else {
        console.log( 'lastname ok' );
        msgerrorLastname.style.display = 'none';
    }

    let msgerrorAddress = document.getElementById( 'form-msgerror-address' );
    let address = document.getElementById( 'adresse' ).value;
    if (!address) {
        msgerrorAddress.style.display = 'block';
        console.log( 'erreur address' );
        error++;
    } else {
        console.log( 'address ok' );
        msgerrorAddress.style.display = 'none';
    }

    let msgerrorCity = document.getElementById( 'form-msgerror-city' );
    let city = document.getElementById( 'ville' ).value;
    if (!city) {
        msgerrorCity.style.display = 'block';
        console.log( 'erreur city' );
        error++;
    } else {
        console.log( 'city ok' );
        msgerrorCity.style.display = 'none';
    }

    let msgerrorEmail = document.getElementById( 'form-msgerror-email' );
    let email = document.getElementById( 'email' ).value;
    if (!email) {
        msgerrorEmail.style.display = 'block';
        console.log( 'erreur email' );
        error++;
    } else {
        console.log( 'email ok' );
        msgerrorEmail.style.display = 'none';
    }

    if (error === 0) {


        let products = [];

        for (let i = 0; i < card.length; i++) {
            products.push( card[i]._id );
        }

        console.log( products );

        //recupérer le formulaire
        let contact = {
            "firstName": firstname,
            "lastName": lastname,
            "address": address,
            "city": city,
            "email": email,
        };
        console.log( 'contact' );


        // creer un objet pour la requete post
        let obj = {
            'contact': contact,
            'products': products,
        };
        console.log( obj );


        // créer l'envoi


        const postrequest = async function () {
            try {

                let response = await fetch( 'http://localhost:3000/api/teddies/order', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( obj ),
                } );

                console.log( response );

                if (response.ok) {
                    let data = await response.json();
                    console.log( "info récupérées :" );
                    console.log( data );


                    localStorage.removeItem( 'card' );
                    // recuperer total price
                    let totalPrice = 0;
                    // clear total price

                    window.location.href = 'http://p5-ecommerce-test/public/html/order.html?orderId=' + data.orderId + '&price=' + totalLine;

                } else {
                    console.error( "reponse du serveur :", response.status );
                }
            } catch (e) {
                console.log( e )
            }
        };
        postrequest()
    }
} );
