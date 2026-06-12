const apiKey = "7809067e8da9ce0ddb8329c8f7df9cb5";

let searchBtn = document.getElementById('search-btn');
let cityInput = document.getElementById("cityInput");

 searchBtn.addEventListener("click", function(){
   let city = cityInput.value.trim();
   
    getWeather(city)
 })


async function getWeather(city){
    try{
    let apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(apiUrl)
    document.getElementById("loader").style.display = "block";
    const data =  await res.json()
    console.log(data)

    document.getElementById('cityName').innerText = data.city.name;
    document.getElementById('tempDeg').innerText = data.list[0].main.temp;
    document.getElementById('weather').innerText = data.list[0].weather[0].description;
    document.getElementById('humidity').innerText = data.list[0].main.humidity;
    document.getElementById('wind-speed').innerText = data.list[0].wind.speed;



    }        
    catch (error){
        console.log(error)
    }finally{
         document.getElementById("loader").style.display = "none";
    }

}



