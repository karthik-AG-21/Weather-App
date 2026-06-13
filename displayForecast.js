

export async function displayForecast(data) {
    console.log("Forecast function called");

    const forecastContainer =
        document.getElementById("forecast-container");

    forecastContainer.innerHTML = "";

    const dailyForecast = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyForecast.forEach(item => {
        
        
        console.log(item.weather[0]);
        console.log(item.weather[0].icon);
        
        const iconCode = item.weather[0].icon;
        const day = new Date(item.dt_txt)
            .toLocaleDateString("en-US", {
                weekday: "short"
            });

            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


        forecastContainer.innerHTML += `
            <div class="forecast-card">
                <p>${day}</p>
                <img src="${iconUrl}" alt="weather icon">
                <p>${Math.round(item.main.temp)}°C</p>
            </div>
        `;
    });
}