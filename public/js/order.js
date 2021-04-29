const url_path = window.location.href;
const url = new URL( url_path );
const id = url.searchParams.get( "orderId");
const price = url.searchParams.get("price");

let confirmation = `<section id="block-order">
    <h1>Merci pour votre commande</h1>
    <p>Numero de commande : ${id}</p>
    <p>Prix total : ${price} €</p>
    <a href="../index.html"><button type="button">Retour à l'accueil</button></a>
  </section>`;

let order = document.getElementById("order");
order.innerHTML = confirmation;

