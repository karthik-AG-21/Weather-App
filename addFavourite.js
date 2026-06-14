
import { currentCity,getWeather } from "./getWeatherData.js";


const emptyStar = document.querySelector('.star');
const filledStar = document.getElementById('the-action');

let isFavorite = false;

emptyStar.addEventListener("click", toggleFavorite);
filledStar.addEventListener("click", toggleFavorite);
function toggleFavorite() {
    let favourites =
        JSON.parse(localStorage.getItem("favourites")) || [];

    if (favourites.includes(currentCity)) {

        favourites = favourites.filter(
            city => city !== currentCity
        );

    } else {
        

        favourites.push(currentCity);
        renderFavorites();
        

    }

    localStorage.setItem("favourites",JSON.stringify(favourites));

    updateFavoriteIcon(currentCity);
      renderFavorites();

    console.log(favourites);
}


export function updateFavoriteIcon(currentCity) {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    if (favourites.includes(currentCity)) {
        emptyStar.style.display = "none";
        filledStar.style.display = "inline";
    } else {
        emptyStar.style.display = "inline";
        filledStar.style.display = "none";
    }
}



const favDropdown = document.getElementById("favDropdown");

const favourite = document.getElementsByClassName('favourites-btn')[0];

favourite.addEventListener("click", function () {
    if (favDropdown.style.display === "block") {
        favDropdown.style.display = "none";
    } else {
        favDropdown.style.display = "block";
    }
})

function renderFavorites() {
    const favorites =
        JSON.parse(localStorage.getItem("favourites")) || [];

    favDropdown.innerHTML = "";

    favorites.forEach(city => {
        favDropdown.innerHTML += `
            <div class="fav-item">
                <span class="fav-city" data-city="${city}">${city}</span>
                 <button class="remove-fav" data-city="${city}">❌</button>
            </div>
        `;
    });
}

favDropdown.addEventListener("click", (e) => {

    if (e.target.classList.contains("remove-fav")) {

        const city = e.target.dataset.city;

        let favourites =
            JSON.parse(localStorage.getItem("favourites")) || [];

        favourites = favourites.filter(
            item => item !== city
        );

        localStorage.setItem(
            "favourites",
            JSON.stringify(favourites)
        );
        updateFavoriteIcon(currentCity);

        renderFavorites();
    }
});
renderFavorites()

favDropdown.addEventListener("click", (e) => {

    if (e.target.classList.contains("fav-city")) {

        const city = e.target.dataset.city;

        getWeather(city);
    }

});
