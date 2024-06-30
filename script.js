let navbar = document.querySelector("#navbar")

window.addEventListener("scroll", () => {
    let scrolled = window.scrollY;
    if (scrolled > 0){
        navbar.classList.add("navbarScroll")
    } else {
        navbar.classList.remove("navbarScroll")
    }
});