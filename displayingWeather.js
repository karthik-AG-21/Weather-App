

export function displayWeather(data) {
    document.getElementById('cityName').innerText = data.city.name;
    document.getElementById('tempDeg').innerText = Math.round(data.list[0].main.temp);
    document.getElementById('weather').innerText = data.list[0].weather[0].description;
    document.getElementById('humidity').innerText = data.list[0].main.humidity;
    document.getElementById('wind-speed').innerText = data.list[0].wind.speed;
}

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
    const container = document.querySelector(".container");

    container.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        container.classList.contains("dark") ? "dark" : "light"
    );
});

if (localStorage.getItem("theme") === "dark") {
    document.querySelector(".container").classList.add("dark");
}