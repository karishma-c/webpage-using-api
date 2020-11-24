const container = document.getElementById("card-container");
const mainContainer = document.querySelector(".container");
var a = document.getElementsByClassName("card");



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
        console.log(a.length);
        for(let i=0;i<a.length;i++)
        {
            
            a[i].addEventListener("click",(e)=>{
                var z = a[i].children[1].outerText;
                var r =  LIST.filter(item =>{
                    let country = item.name;
                       if(z == country)
                       {
                          return country;
                        }
                    });
                 
                   const modal = `<div class="modal" id="myModal">
                       <div class="modal-content">
                       <span class="close">&times;</span>
                       <div class="flag-card">
                           <img class="flag-img" src = "${r[0].flag}" alt="image">
                       </div>
                       <div class="countryInfo">
                           <h3 class="country-name"> ${r[0].name} </h3>
                           <div class="country-info">
                               <div class="country-info1">
                                   <h5 class="native-name"><b>Native:</b> ${r[0].nativeName} </h5>
                                   <h5 class="popu"><b>Population:</b> ${r[0].population} </h5>
                                   <h5 class="country-region"><b>Region:</b> ${r[0].region} </h5>
                                   <h5 class="sub-region"><b>Sub Region:</b> ${r[0].subregion} </h5>
                               </div>
                               <div class="country-info2">
                                   <h5 class="country-capital"><b>Capital:</b> ${r[0].capital} </h5>
                                   <h5 class="domain"><b>Domain:</b> ${r[0].topLevelDomain} </h5>
                                   <h5 class="currency"><b>Currencies:</b> ${r[0].currencies[0].name} , <b>${r[0].currencies[0].symbol}</b>  </h5>
                                   <h5 class="languages"><b>Languages:</b> ${r[0].languages[0].name} </h5>
                               </div>
                           </div>
                           <div class="borders">
                               <b>Border Countries:</b> ${r[0].borders[0]}
                           </div>
                       </div>
                       </div>
                    </div>`;
                    const position = "beforeend";
                   container.insertAdjacentHTML(position,modal); 
                   var Modal = document.getElementById("myModal");
                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];
                    Modal.style.display = "block";
                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function()
                    {
                            Modal.style.display = "none";
                            Modal.parentNode.removeChild(Modal);
                    }
                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) 
                    {
                        if (event.target == Modal) 
                        {
                            Modal.style.display = "none";
                            Modal.parentNode.removeChild(Modal);

                        }
                    }
                });
            
        }
       

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
    for(let i=0;i<a.length;i++)
    {
        a[i].addEventListener("click",(e)=>{
            var z = a[i].children[1].outerText;
            var r =  LIST.filter(item =>{
                let country = item.name;
                   if(z == country)
                   {
                      return country;
                    }
                });
             
               const modal = `<div class="modal" id="myModal">
                  <div class="modal-content">
                  <span class="close">&times;</span>
                  <div class="flag-card">
                     <img class="flag-img" src = "${r[0].flag}" alt="image">
                  </div>
                  <div class="countryInfo">
                      <h3 class="country-name"> ${r[0].name} </h3>
                      <div class="country-info">
                           <div class="country-info1">
                               <h5 class="native-name"><b>Native:</b> ${r[0].nativeName} </h5>
                               <h5 class="popu"><b>Population:</b> ${r[0].population} </h5>
                               <h5 class="country-region"><b>Region:</b> ${r[0].region} </h5>
                               <h5 class="sub-region"><b>Sub Region:</b> ${r[0].subregion} </h5>
                           </div>
                           <div class="country-info2">
                               <h5 class="country-capital"><b>Capital:</b> ${r[0].capital} </h5>
                               <h5 class="domain"><b>Domain:</b> ${r[0].topLevelDomain} </h5>
                               <h5 class="currency"><b>Currencies:</b> ${r[0].currencies[0].name} , <b>${r[0].currencies[0].symbol}</b> </h5>
                               <h5 class="languages"><b>Languages:</b> ${r[0].languages[0].name} </h5>
                           </div>
                      </div>
                      <div class="borders">
                         <b>Border Countries:</b> ${r[0].borders[0]}
                      </div>
                   </div>
                   </div>
                </div>`;
               const position = "beforeend";
               container.insertAdjacentHTML(position,modal); 
               var Modal = document.getElementById("myModal");
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                Modal.style.display = "block";
                // When the user clicks on <span> (x), close the modal
                span.onclick = function()
                {
                    Modal.style.display = "none";
                    Modal.parentNode.removeChild(Modal);
                }
                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) 
                {
                    if (event.target == Modal) 
                    {
                        Modal.style.display = "none";
                        Modal.parentNode.removeChild(Modal);
                    }
                }
            });
        }
    };
 

  