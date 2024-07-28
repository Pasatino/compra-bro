let navbar = document.querySelector("#navbar");
let myArticle = document.querySelector("#myArticle");
let categoriesAccordionBody = document.querySelector("#categoriesAccordionBody");
let priceInput = document.querySelector("#priceInput");
let priceInputValue = document.querySelector("#priceInputValue");
let searchInput = document.querySelector("#searchInput");
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
                <article class='flex-column p-3       article-body bg-primary textFont1'>
                <h3 class="article-name">${truncateWord(articles.name)}</h3>
                <p class="article-category">${articles.category}</p>
                <p class="article-price">${articles.price} $</p> </article>`
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
        
        
        function filterByCategory(array) {
            let selectedButton = Array.from(radioButtons).find((button)=> button.checked);
            category = selectedButton.id;
            console.log(category);


            if (category !="All") {
                let filtered = array.filter((article)=> article.category == category);
                return filtered;
            } else {
                return array;
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
        

        function filterByPrice(array){
            let filtered = array.filter((article) => +article.price <= priceInput.value);
            
            return filtered;
        }
        
        function filterByWord(array){
            let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(searchInput.value.toLowerCase()))
            /* console.log(filtered); */
            return filtered;
        }
        
        function globalFilter(){
            let filteredByCategory = filterByCategory(data);
            let filteredByCategoryAndPrice = filterByPrice(filteredByCategory);
            let filteredByCategoryAndPriceAndWord = filterByWord(filteredByCategoryAndPrice);
            return  showCards(filteredByCategoryAndPriceAndWord);
        }
        
        showCards(data);
        generateRadios();
        setPriceInput();
        
        let radioButtons = document.querySelectorAll(".form-check-input");
        radioButtons.forEach((button)=>{
            button.addEventListener("click", ()=>{
                globalFilter();
            });
        });

        filterByCategory();
        
        priceInput.addEventListener("input", ()=> {
            globalFilter()
            priceInputValue.innerHTML = priceInput.value;
            });

        searchInput.addEventListener("input", ()=>{
            globalFilter()
        });
    
    /* console.log(data); */
    
});

