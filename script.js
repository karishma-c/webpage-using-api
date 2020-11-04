const app = document.getElementById("root");


var request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.eu/rest/v2/all', true);
request.onload = function () {
  var data = JSON.parse(this.response);
  
    if (request.status >= 200 && request.status < 400) {
       
        data.forEach(country => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
      
            const flagImage = document.createElement('div');
            flagImage.setAttribute('class', 'flag-image');

            const image = document.createElement('img');
            image.src = country.flag;

            const countryName = document.createElement('h3');
            countryName.setAttribute('class', 'country-name');
            countryName.textContent = country.name;

            const population = document.createElement('h4');
            population.setAttribute('class', 'popu');
            population.textContent = country.population;

            const region = document.createElement('h4');
            region.setAttribute('class', 'country-region');
            region.textContent = country.region;

            const capital = document.createElement('h4');
            capital.setAttribute('class', 'country-capital');
            capital.textContent = country.capital;
      
            
            app.appendChild(card);
            flagImage.appendChild(image);
            card.appendChild(flagImage);
            card.appendChild(countryName);
            card.appendChild(population);
            card.appendChild(region);
            card.appendChild(capital);
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
}

request.send();