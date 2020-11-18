const container = document.getElementById("card-container");
const mainContainer = document.querySelector(".container");

let LIST = [];
let searchString;
let type;

var request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.eu/rest/v2/all', true);
request.onload = function () {
 //const showCountries = () => {    
  var data = JSON.parse(this.response);
  //var six = data.slice(0,8);
  console.log(data);
    if (request.status >= 200 && request.status < 400) {
       
        data.forEach(country => {
            const card = `<div class="card">
            <div class="flag-image">
                <img src="${country.flag}" alt="country">
            </div>
            <h3 class="country-name">${country.name}</h3>
            <h5 class="popu"> <b>Population: </b>  ${country.population}</h5>
            <h5 class="country-region"> <b>Region: </b> ${country.region}</h5>
            <h5 class="country-capital"> <b>Capital: </b> ${country.capital}</h5>
            </div>`;
            
            const position = "beforeend";
            container.insertAdjacentHTML(position,card);
            LIST.push(country);
        });
      

    } else {
        const errorMessage = document.createElement('h1');
        errorMessage.textContent = `OOPS, it's not working!`;
        container.appendChild(errorMessage);
    }

}


request.send();

const switchMode = document.querySelector(".mode");
switchMode.addEventListener("click", () => {
    document.documentElement.classList.toggle("darkMode");
});

const searchBar = document.getElementById("search");
searchBar.addEventListener("keyup", (e) => {
    searchString = e.target.value;
    type = "name";
    showCountries(searchString,type); 
});

const filterByRegion = document.getElementById("mySelect");
filterByRegion.addEventListener('change',(e)=>
{
    const selectedOption = filterByRegion.value;
    type = "region";
    showCountries(selectedOption,type);
});

const showCountries = (searchString,type) => {
    const  sortedCountries =  LIST.filter( (item) => {
        let country = item[type].toLowerCase();
       return country.includes(searchString);
    });
    container.innerHTML = "";
    for(let i =0;i<sortedCountries.length;i++)
    {
        const card = `<div class="card">
        <div class="flag-image">
            <img src="${sortedCountries[i].flag}" alt="country">
        </div>
        <h3 class="country-name">${sortedCountries[i].name}</h3>
        <h5 class="popu"> <b>Population: </b>  ${sortedCountries[i].population}</h5>
        <h5 class="country-region"> <b>Region: </b> ${sortedCountries[i].region}</h5>
        <h5 class="country-capital"> <b>Capital: </b> ${sortedCountries[i].capital}</h5>
        </div>`;
        
        const position = "beforeend";
        container.insertAdjacentHTML(position,card);  
    }
    
};



/* const showRegion = (selectedOption) => 
{
    const  sortedRegion =  LIST.filter( item => {
        let region = item.region.toLowerCase();
       return region.includes(selectedOption);
    });
    container.innerHTML = "";
    for(let i =0;i<sortedRegion.length;i++)
    {
        const card = `<div class="card">
        <div class="flag-image">
            <img src="${sortedRegion[i].flag}" alt="country">
        </div>
        <h3 class="country-name">${sortedRegion[i].name}</h3>
        <h5 class="popu"> <b>Population: </b>  ${sortedRegion[i].population}</h5>
        <h5 class="country-region"> <b>Region: </b> ${sortedRegion[i].region}</h5>
        <h5 class="country-capital"> <b>Capital: </b> ${sortedRegion[i].capital}</h5>
        </div>`;
        
        const position = "beforeend";
        container.insertAdjacentHTML(position,card);  
    }
}; */