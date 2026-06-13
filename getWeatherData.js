import { updateFavoriteIcon } from "./addFavourite.js";
import { displayWeather } from "./displayingWeather.js";
import {  displayForecast } from "./displayForecast.js";

export let apiKey = "7809067e8da9ce0ddb8329c8f7df9cb5";

let searchBtn = document.getElementById('search-btn');
let cityInput = document.getElementById("cityInput");
export let currentCity = "";

export function setCurrentCity(city) {
    currentCity = city;
}

searchBtn.addEventListener("click", function () {
    let city = cityInput.value.trim();

    getWeather(city)
})


async function getWeather(city) {

    try {
        let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
       
        document.getElementById("loader").style.display = "block";
        const res = await fetch(apiUrl)
        const data = await res.json()
        if (data.cod !== "200") {
            throw new Error(data.message);
        }

         currentCity = data.city.name;
        updateFavoriteIcon(currentCity);
        displayWeather(data);
        displayForecast(data);



    }
    catch (error) {
        console.log(error)
    } finally {
        document.getElementById("loader").style.display = "none";
    }

}