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
