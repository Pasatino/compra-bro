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
                <p class="article-price">${articles.price} $</p> </article>` /* creo la card utilizzando i dati del file json */
                myArticle.appendChild(card); //appendChild ci permette di inserire le card create all'interno del section con id article           
        });
        }
        function generateRadios() {

            // Estrai la categoria di ogni annuncio nell'array 'data' e crea un array di categorie.
            let categories = data.map((annuncio)=> annuncio.category);

            // Creo un array vuoto per contenere le categorie uniche.
            let uniqueCategories = [];

            categories.forEach((category)=>{

                // Se la categoria non è già presente nell'array 'uniqueCategories'...
                if(!uniqueCategories.includes(category)){

                    // ...aggiungila all'array 'uniqueCategories'.
                    uniqueCategories.push(category);
                }
            });
            /* console.log(uniqueCategories); */

            //Con questa funzione creo un input di tipo radio per ogni categoria unica
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

            // Trovo il pulsante radio selezionato dall'array di radio buttons.
            let selectedButton = Array.from(radioButtons).find((button)=> button.checked);

            // Catturo l'ID del pulsante radio selezionato, che rappresenta la categoria.
            category = selectedButton.id;

            /* console.log(category); */

            // Se la categoria selezionata non è "All"...
            if (category !="All") {

                // Filtro l'array degli articoli per includere solo quelli con la categoria selezionata.
                let filtered = array.filter((article)=> article.category == category);

                // Restituisce l'array filtrato.
                return filtered;
            } else {

                // Se la categoria selezionata è "All", con questo retrun restituisco l'array originale.
                return array;
            }
            
        }

        function setPriceInput(){

            // Estrai i prezzi da ogni annuncio nell'array 'data' e convertili in numeri.
            let prices = data.map((annuncio) => +annuncio.price);

            // Ordino l'array dei prezzi in ordine crescente.
            prices.sort((a,b)=> a - b);

            // Ottengo il prezzo massimo arrotondandolo per eccesso.
            let maxPrice = Math.ceil(prices.pop());

            // Ottengo il prezzo mminimo arrotondandolo per difetto.
            let minPrice = Math.floor(prices.shift());
            priceInput.max = maxPrice;
            priceInput.min = minPrice;
            priceInput.value = maxPrice;

            // Imposto il contenuto HTML dell'elemento che mostra il valore del prezzo al valore massimo.
            priceInputValue.innerHTML = maxPrice;

            /* console.log(maxPrice); */
            /* console.log(minPrice); */
        }
        

        function filterByPrice(array){

            // Filtro l'array degli articoli per includere solo quelli con un prezzo minore o uguale al valore corrente dell'input del prezzo.
            let filtered = array.filter((article) => +article.price <= priceInput.value);
            
            return filtered;
        }
        
        function filterByWord(array){

            // Filtro l'array degli annunci per includere solo quelli il cui nome contiene la parola cercata.
            let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(searchInput.value.toLowerCase()))
            /* console.log(filtered); */
            return filtered;
        }
        
        function globalFilter(){

            // Filtro i dati per categoria utilizzando la funzione filterByCategory.
            let filteredByCategory = filterByCategory(data);

            // Filtro ulteriormente i dati filtrati per categoria anche per prezzo utilizzando la funzione filterByPrice.
            let filteredByCategoryAndPrice = filterByPrice(filteredByCategory);

            // Filtro ulteriormente i dati filtrati per categoria e prezzo anche per parola chiave utilizzando la funzione filterByWord.
            let filteredByCategoryAndPriceAndWord = filterByWord(filteredByCategoryAndPrice);

            // Mostro le carte degli annunci filtrati
            return  showCards(filteredByCategoryAndPriceAndWord);
        }
        
        /* Richiamo le funzioni */

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

