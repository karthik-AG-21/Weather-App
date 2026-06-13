import {  displayForecast } from "./displayForecast.js";
import { setCurrentCity } from "./getWeatherData.js";
import { updateFavoriteIcon } from "./addFavourite.js";
import { displayWeather } from "./displayingWeather.js";



async function getWeatherByCoords(lat, lon) {
    try {
        document.getElementById("loader").style.display = "block";
         let apiKey = "7809067e8da9ce0ddb8329c8f7df9cb5";
        const apiUrl =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data)


        setCurrentCity(data.city.name);
        updateFavoriteIcon(data.city.name);
        displayWeather(data);
        displayForecast(data);

    } catch (error) {
        console.log(error);
    } finally {
        document.getElementById("loader").style.display = "none";
    }
}



window.addEventListener("DOMContentLoaded", () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeatherByCoords(lat, lon);

            setInterval(() => {
                getWeatherByCoords(lat, lon);
            }, 300000); // every 5 minutes
        },
        error => {
            console.log(error);
            getWeather("Delhi")
        }
    );
    // displayFavourites();
});