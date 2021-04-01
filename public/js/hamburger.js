const hamburger = document.getElementById( 'hamburger' );
const hamburgerMenu = document.getElementById( 'hamburger-menu' );
const overlay = document.getElementById( 'overlay-menu-hamburger' );

hamburger.addEventListener( 'click', function () {
    overlay.classList.toggle( "dnone" );
} );
window.onresize = function () {
    if (window.innerWidth >= 600) {
        overlay.classList.add( "dnone" );
        hamburgerMenu.classList.remove( "active" );
    }

}