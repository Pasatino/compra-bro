let navbar = document.querySelector("#navbar")
let article = document.querySelector("#article")
let accordionBody = document.querySelector("#acordionBody")
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
        
        //ho creato questa funzione per ridurre i nomi lunghi degli articoli
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
                <h3 class="articleName">${truncateWord(articles.name)}</h3>
                <p class="articleCategory">${articles.category}</p>
                <p class="articlePrice">${articles.price} $</p> </article>`
                article.appendChild(card); //appendChild ci permette di inserire le card create all'interno del section con id article           
        });

        function generateRadios() {
            let categories = data.map((annuncio)=> annuncio.category);
            let uniqueCategories = [];
            categories.forEach((category)=>{
                if(!uniqueCategories.includes(category)){
                    uniqueCategories.push(category);
                }
            });
            console.log(uniqueCategories);
            uniqueCategories.forEach((category)=>{
                let div = document.createElement('div');
                div.classList.add('form-check');
                div.innerHTML =`
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">
                        Default radio
                    </label>
                    `;
                accordionBody.appendChild(div);
            })
        }
        generateRadios();
        
    }
    
    
    console.log(data);
    showCards(data)
})

