const cardBasket = document.getElementById( "cardBasket" );
let card = localStorage.getItem( 'card' );
card = JSON.parse( card );
const ajouterItem = document.getElementById( "ajouterItem" );
const totalItem = document.getElementById( "card-total" );

let totalLine = 0;
if (card !== null) {
    card.forEach( item => {
        let getTeddy = async () => {
            let url = 'http://localhost:3000/api/teddies/' + item._id;
            const response = await fetch( url );
            const data = await response.json();

            let resultat = item.qty * (data.price) / 100;

            totalLine = totalLine + resultat;

            let line = `
                <tr>                    
                    <td><a href="produit.html?id=${item._id}"><img id="img-tb" src="${data.imageUrl}" alt="${data.name}"></a></td>      
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
}

const bouton = document.getElementById( 'afficheFormulaire' );
const formulaire = document.getElementById( 'formulaire' );
const close = document.getElementById( 'closeformulaire' );

bouton.addEventListener( 'click', function () {
    formulaire.classList.toggle( 'form-none' )
} )

close.addEventListener( 'click', function () {
    formulaire.classList.toggle( 'form-none' )
} );

const btnSubmit = document.getElementById( 'envoyer' );

btnSubmit.addEventListener( 'click', () => {

    let errorValidate = 0;
    if (!validateFirstname()) {
        errorValidate++;
    }
    if (!validateLastname()) {
        errorValidate++;
    }
    if (!validateAddress()) {
        errorValidate++;
    }
    if (!validateCity()) {
        errorValidate++;
    }
    if (!validateEmail()) {
        errorValidate++;
    }
    if (errorValidate === 0) {
        let products = [];

        for (let i = 0; i < card.length; i++) {
            products.push( card[i]._id );
        }

        let contact = {
            "firstName": document.getElementById( 'prenom' ).value,
            "lastName": document.getElementById( 'nom' ).value,
            "address": document.getElementById( 'adresse' ).value,
            "city": document.getElementById( 'ville' ).value,
            "email": document.getElementById( 'email' ).value,
        };

        let obj = {
            'contact': contact,
            'products': products,
        };

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

                if (response.ok) {
                    let data = await response.json();

                    localStorage.removeItem( 'card' );
                    let totalPrice = 0;

                    window.location.href = 'order.html?orderId=' + data.orderId + '&price=' + totalLine;
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

function isGranted(value, number,) {
    if (value.length > number) {
        return true;
    }
    return false;
}

function validateFirstname() {
    let errors = 0;
    let firstnameFormValue = document.getElementById( 'prenom' ).value;
    let firstnameFormError = document.getElementById( 'form-msgerror-firstname' );

    const firstnameRegExp = /^[A-Za-z]+$/;
    if (!isGranted( firstnameFormValue, 3 )) {
        firstnameFormError.innerHTML = '* le prénom doit comporter plus de 3 caractères';
        firstnameFormError.style.display = 'block';
        errors++;
    } else if (!firstnameRegExp.test( firstnameFormValue )) {
        firstnameFormError.innerHTML = '* le prénom doit comporter que des lettres';
        firstnameFormError.style.display = 'block';
        errors++;
    } else {
        firstnameFormError.innerHTML = '';
        firstnameFormError.style.display = 'none';
    }
    if (errors === 0) {
        return true;
    }
    return false;
}

function validateLastname() {
    let errors = 0;

    let lastnameFormValue = document.getElementById( 'nom' ).value;
    let lastnameFormError = document.getElementById( 'form-msgerror-lastname' );
    const lastnameRegExp = /^[a-z]+$/;

    if (!isGranted( lastnameFormValue, 3 )) {
        lastnameFormError.innerHTML = '* le nom doit comporter plus de 3 caractères';
        lastnameFormError.style.display = 'block';
        errors++;
    } else if (!lastnameRegExp.test( lastnameFormValue )) {
        lastnameFormError.innerHTML = '* le nom doit comporter que des lettres';
        lastnameFormError.style.display = 'block';
        errors++;
    } else {
        lastnameFormError.innerHTML = '';
        lastnameFormError.style.display = 'none';
    }
    if (errors === 0) {
        return true;
    }
    return false;
}

function validateAddress() {
    let errors = 0;

    let addressFormValue = document.getElementById( 'adresse' ).value;
    let addressFormError = document.getElementById( 'form-msgerror-address' );
    const addressRegExp = /^[0-9a-z\ ]+$/;

    if (!isGranted( addressFormValue, 3 )) {
        addressFormError.innerHTML = "* l'adresse doit comporter plus de 3 caractères";
        addressFormError.style.display = 'block';
        errors++;
    } else if (!addressRegExp.test( addressFormValue )) {
        addressFormError.innerHTML = "* l'adresse n'est pas valide";
        addressFormError.style.display = 'block';
        errors++;
    } else {
        addressFormError.innerHTML = '';
        addressFormError.style.display = 'none';
    }
    if (errors === 0) {
        return true;
    }
    return false;
}

function validateCity() {
    let errors = 0;

    let cityFormValue = document.getElementById( 'ville' ).value;
    let cityFormError = document.getElementById( 'form-msgerror-city' );
    const cityRegExp = /^[a-z]+$/;


    if (!isGranted( cityFormValue, 3 )) {
        cityFormError.innerHTML = '* le nom de la ville doit comporter plus de 3 caractères';
        cityFormError.style.display = 'block';
        errors++;
    } else if (!cityRegExp.test( cityFormValue )) {
        cityFormError.innerHTML = '* le nom de la ville doit comporter que des lettres';
        cityFormError.style.display = 'block';
        errors++;
    } else {
        cityFormError.innerHTML = '';
        cityFormError.style.display = 'none';
    }
    if (errors === 0) {
        return true;
    }
    return false;
}

function validateEmail() {
    let errors = 0;

    let emailFormValue = document.getElementById( 'email' ).value;
    let emailFormError = document.getElementById( 'form-msgerror-email' );
    const emailRegExp = /^[0-9a-z]+@[a-z]+\.[a-z]{2,}$/;

    if (!isGranted( emailFormValue, 6 )) {
        emailFormError.innerHTML = "* l'adresse email doit comporter plus de 6 caractères";
        emailFormError.style.display = 'block';
        errors++;
    } else if (!emailRegExp.test( emailFormValue )) {
        emailFormError.innerHTML = "* l'adresse email n'est pas valide";
        emailFormError.style.display = 'block';
        errors++;
    } else {
        emailFormError.innerHTML = '';
        emailFormError.style.display = 'none';
    }
    if (errors === 0) {
        return true;
    }
    return false;
}

