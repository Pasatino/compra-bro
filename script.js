let navbar = document.querySelector("#navbar")

window.addEventListener("scroll", () => {
    let scrolled = window.scrollY; /* catturo lo scorrimento verticale della pagina */
    if (scrolled > 0){
        navbar.classList.add("navbar-scroll")
    } else {
        navbar.classList.remove("navbar-scroll")
    }
});