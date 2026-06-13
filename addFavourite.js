
import { currentCity } from "./getWeatherData.js";


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
        

    }

    localStorage.setItem("favourites",JSON.stringify(favourites));

    updateFavoriteIcon(currentCity);

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



const favourite = document.getElementsByClassName('favourites-btn')[0];
favourite.addEventListener("click", function () {


})


