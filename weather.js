// 
const monthNames = [
    "January", "February", "March", "April", "May", "June",   // i use an array to store all months
    "July", "August", "September", "October", "November", "December"
];


const dateDiv = document.getElementById('date');
if (dateDiv) {
    const dateObj = new Date();
    const month = monthNames[dateObj.getUTCMonth()];
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    dateDiv.innerHTML = `${month} ${day}, ${year}`;
}


const weatherInfo = document.getElementById('weather-info');
const searchInput = document.getElementById('search-bar-input');
const searchBtn = document.getElementById('search-btn');



// let me try to fetch weather api 

async function getWeather(cityName) {
    const apiKey = "6498cca2617d214c78df11180084ce69"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red">${error.message}</p>`;
        console.error(error);
    }
}