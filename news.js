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


async function fetchNewsAsync() {
  try {
    const response = await fetch(NEWS_URL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching news (async/await):", err);
  }
}


function displayNews(articles) {
  const newsFeed = document.getElementById("news-feed");
  newsFeed.innerHTML = ""; // Clear old content

  if (!articles || articles.length === 0) {
    newsFeed.textContent = "No news available.";
    return;
  }


  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";


  articles.slice(0, 5).forEach(article => {
    const li = document.createElement("li");
    li.style.marginBottom = "15px";
    li.innerHTML = `
      <strong>${article.title}</strong><br>
      ${article.description || ""}<br>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    ul.appendChild(li);
  });

  newsFeed.appendChild(ul);
}


fetchNewsAsync().then(data => {
  if (data && data.articles) displayNews(data.articles);
});
