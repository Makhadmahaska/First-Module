// I have found news api and use this one it says tesla news but it uppdates by itself

const NEWS_API_KEY = "46ca16545d2e403eacb1c23eb241f468"; // could i have used env but i tried alot time to get working i dont wanna change to much
const NEWS_URL = `https://newsapi.org/v2/everything?q=tesla&from=2026-01-20&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;


function fetchNewsWithCallback(callback) {
  fetch(NEWS_URL)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => console.error("Error fetching news (callback):", err));
}

function fetchNewsWithPromise() {
  return fetch(NEWS_URL)
    .then(response => response.json())
    .catch(err => console.error("Error fetching news (promise):", err));
}
