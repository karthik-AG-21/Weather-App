import { updateFavoriteIcon } from "./addFavourite.js";
import { displayWeather } from "./displayingWeather.js";
import { displayForecast } from "./displayForecast.js";

export let apiKey = "7809067e8da9ce0ddb8329c8f7df9cb5";

let searchBtn = document.getElementById('search-btn');
let cityInput = document.getElementById("cityInput");
export let currentCity = "";

export function setCurrentCity(city) {
    currentCity = city;
}

let timer;

cityInput.addEventListener("input", (e) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
        const city = e.target.value.trim();

        if (city) {
            getWeather(city);
        }
    }, 1000);
});


searchBtn.addEventListener("click", function () {
    let city = cityInput.value.trim();

    getWeather(city)
})


export async function getWeather(city) {
    if (!city) {
        showError("Please enter a city name");
        return;
    }

    try {


        document.getElementById("loader").style.display = "block";

        let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;


        const res = await fetch(apiUrl)
        

        if (!res.ok) {
            throw new Error("City not found");
        }

        const data = await res.json()
        
        if (data.cod !== "200") {
            throw new Error(data.message);
        }

        currentCity = data.city.name;

        hideError();

        document.querySelector(".weather-card").style.display = "block";
        document.querySelector(".section-heading").style.display = "block";


        updateFavoriteIcon(currentCity);
        displayWeather(data);
        displayForecast(data);



    }
    catch (error) {
        console.log(error)

        showError(error.message);

        document.querySelector(".weather-card").style.display = "none";
        document.querySelector(".section-heading").style.display = "none";

    } finally {
        document.getElementById("loader").style.display = "none";
    }

}


function showError(message) {
    const error = document.getElementById("error-message");
    error.textContent = message;
}

function hideError() {
    document.getElementById("error-message").textContent = "";
}