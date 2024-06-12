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
    if(!response.ok) {
        throw new Error("City not found");
    }

     return await response.json();
}

function displayWeatherData(data) {
    console.log(data);
    const {name: city, main: {temp, humidity}, wind: {speed}} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityView = document.createElement("h2");
    const tempView = document.createElement("p");
    const humidityView = document.createElement("p");
    const windspeedView = document.createElement("p");

    cityView.textContent = city;
    tempView.textContent = `Temperature: ${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humidityView.textContent = `Humidity: ${humidity}%`;
    windspeedView.textContent = `windspeed: ${(speed * 2.236936).toFixed(1)} mph`;

    cityView.classList.add("cityView");
    tempView.classList.add("tempView");
    humidityView.classList.add("humidityView");
    windspeedView.classList.add("windspeedView");
    
    card.appendChild(cityView);
    card.appendChild(tempView);
    card.appendChild(humidityView);
    card.appendChild(windspeedView);

    function displayError(message) {
    const errorView = document.createElement("p");
    errorView.textContent = message;
    errorView.classList.add("errorView");
    
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorView);
    }
}