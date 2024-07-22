let navbar = document.querySelector("#navbar");
let myArticle = document.querySelector("#myArticle");
let categoriesAccordionBody = document.querySelector("#categoriesAccordionBody");
let priceInput = document.querySelector("#priceInput");
let priceInputValue = document.querySelector("#priceInputValue");
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
            myArticle.innerHTML= "";
            data.forEach((articles)=>{
                let card = document.createElement('article');
                card.classList.add('col-3')
                card.innerHTML =`
                <article class='flex-column p-3      article-body bg-primary textFont1'>
                <h3 class="articleName">${truncateWord(articles.name)}</h3>
                <p class="articleCategory">${articles.category}</p>
                <p class="articlePrice">${articles.price} $</p> </article>`
                myArticle.appendChild(card); //appendChild ci permette di inserire le card create all'interno del section con id article           
        });
        }
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
                let div = document.createElement("div");
                div.classList.add("form-check");
                div.innerHTML =`
                    <input 
                    class="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    id="${category}">

                    <label class="form-check-label" for="${category}">
                        ${category}
                    </label>
                    `;
                    categoriesAccordionBody.appendChild(div);
            });
        }
        
        
        function filterByCategory(category) {
            if (category !="All") {
                let filtered = data.filter((article)=> article.category == category);
                showCards(filtered);
            } else {
                showCards(data);
            }
            
        }

        function setPriceInput(){
            let prices = data.map((annuncio) => +annuncio.price);
            prices.sort((a,b)=> a - b);
            let maxPrice = Math.ceil(prices.pop());
            let minPrice = Math.floor(prices.shift());
            priceInput.max = maxPrice;
            priceInput.min = minPrice;
            priceInput.value = maxPrice;
            priceInputValue.innerHTML = maxPrice;

            /* console.log(maxPrice); */
            /* console.log(minPrice); */
        }
        

        function filterByPrice(){
            let filtered = data.filter((article) => +article.price <= priceInput.value);
            
            showCards(filtered);
        }
        
        
        showCards(data);
        generateRadios();
        setPriceInput();

        let radioButtons = document.querySelectorAll(".form-check-input");
        radioButtons.forEach((button)=>{
            button.addEventListener("click", ()=>{
                filterByCategory(button.id);
            });
        });
        
        priceInput.addEventListener("input", ()=> {
            filterByPrice();
            priceInputValue.innerHTML = priceInput.value;
          });
    
    
    /* console.log(data); */
    
});

