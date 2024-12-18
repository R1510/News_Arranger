// variables
const business = document.getElementById("business");
const sports = document.getElementById("sports");
const ett = document.getElementById("ett");
const tech = document.getElementById("tech");
const health = document.getElementById("health");
const science = document.getElementById("science");
const searchBtn = document.getElementById("searchBtn");//search button
const searchq = document.getElementById("searchq")//search input
const newscty = document.getElementById("newscty")//news categories there are 7
const newsInfo = document.getElementById("newsInfo")//should display news in the page
const relevancy= document.getElementById("relevancy");
const popularity= document.getElementById("popularity");
// api for news 
const searchNews = "https://newsapi.org/v2/everything?apiKey=b7c4f75b5fe648d6b93d5d41fec58d44";
const api = "https://newsapi.org/v2/top-headlines?country=in&apiKey=b7c4f75b5fe648d6b93d5d41fec58d44&category=";


// display news
var newsArr = [];
function showNews() {
    let newsHtml = "";
    newsArr.forEach(news => {
        var date = news.publishedAt.split("T");
        let newsliteral =
        `<div class="col-sm-12 col-md-4 col-lg-3 p-2 card">
        <div class="p-2">
        <img height="matchparent" width="100%" src=${news.urlToImage}>
        <div>
        <h5 class="card-title">
        ${news.title}</h5>
        <p class="text-muted">${news.description}</p>
        <a class="btn btn-dark" target="_blank" href=${news.url}>Read more</a>
        </div>
        <div class="p-2">
        <small class="text-muted">${date[0]}</small>
      </div>
        </div>
        </div>`
        newsHtml += newsliteral;
    });
    newsInfo.innerHTML = newsHtml;
}
window.onload = function () {
    newscty.innerHTML="<h4>Headlines</h4>"
    categoryWiseNews("general");
}
// making buttons work 

business.addEventListener("click", function () {
    newscty.innerHTML="<h4>Business News</h4>"
    categoryWiseNews("business");
});
sports.addEventListener("click", function () {
    newscty.innerHTML="<h4>Sports News</h4>"
    categoryWiseNews("sports");
});
tech.addEventListener("click", function () {    newscty.innerHTML="<h4>Technology News</h4>"
    categoryWiseNews("technology");
});
ett.addEventListener("click", function () {
    newscty.innerHTML="<h4>Entertainment News</h4>"
    categoryWiseNews("entertainment");
});
health.addEventListener("click", function () {
    newscty.innerHTML="<h4>Health News</h4>"
    categoryWiseNews("health");
});
science.addEventListener("click", function () {
    newscty.innerHTML="<h4>Science News</h4>"
    categoryWiseNews("science");
});
searchBtn.addEventListener("click", function () {
    newscty.innerHTML = "<h4>Search : " + searchq.value + "</h4>";
    searchNewsFunc();
})

// defining the functions  of click event
const categoryWiseNews = async (cty) => {
    const response = await fetch(api + cty);
    newsArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsInfo.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    showNews();

}
const searchNewsFunc = async () => {
    const response = await fetch(searchNews+searchq.value);
    newsArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsInfo.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    showNews();

}

