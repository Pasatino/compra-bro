let navbar = document.querySelector("#navbar")

let article = document.querySelector("#article")

window.addEventListener("scroll", () => {
    let scrolled = window.scrollY;
    if (scrolled > 0){
        navbar.classList.add("navbar-scroll")
    } else {
        navbar.classList.remove("navbar-scroll")
    }
});

//fetch() restituisce un dato nominato promise
//then() ci permette di convertire la promise in oggetto
//1 fetch() collega il js al json e mi restituisce una promise
//2 .then() converto la promise in un dato strutturale js (array di oggetti)
//3 .then() utilizzare il dato ottenuto

fetch('./annunci.json')
    .then((response)=>response.json())
    .then((data)=>  {
        function truncateWord(string) {
            if (string.length > 15) {
              return string.split(" ")[0] + "...";
            } else {
              return string;
            }
        }
    function showCards(data){
        data.forEach((articles)=>{
            let card = document.createElement('article');
            card.classList.add('col-3')
            card.innerHTML =`
            <article class='flex-column p-3      article-body bg-primary textFont1'>
            <h3 class="articleName">${articles.name}</h3>
            <p class="articleCategory">${articles.category}</p>
            <p class="articlePrice">${articles.price}</p> </article>`
            article.appendChild(card); //appendChild ci permette di inserire le card create all'interno del section con id article           
        });
        
    }
    console.log(data);
    showCards(data)
})

showCards(data)