const weatherForm = document.querySelector('.weatherForm');
const citySearch = document.querySelector('.citySearch');
const card = document.querySelector('.card');
const apiKey = "81551897ac9121a0dea27b967ec2521a";

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = citySearch.value;
   
    if(city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city name");
    }
}); 

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiurl);
    console.log(response);
}

function displayWeatherData(weatherData) {
    
}

function displayError(message) {
    const errorView = document.createElement("p");
    errorView.textContent = message;
    errorView.classList.add("errorView");
    
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorView);
}