const inputEl = document.getElementById("input");
const searchEl = document.getElementById("search");

// Autocomplete disable
function getAutoComplete(keyword) {
    if (keyword.length < 3) {
        return false;
    }

    fetch("/api/autocomplete/" + keyword, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log("AUTO DATA", data.terms);
        // renderResults(data.businesses);
    });

    
}

// User server to call Yelp's API
function getBusinesses(keyword) {
    // console.log("GET BUSSINESSES KEYWORD", keyword)
    fetch("/api/restaurants/" + keyword, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        return response.json();
    }).then(data => {
        // console.log("DATA", data);
        renderResults(data.businesses);
    });
}

// Given a list of businesses render them in a list
function renderResults(businesses) {
    $("#results").empty();
    businesses.forEach(element => {
        let button = $("<button>");
        button.addClass("list-group-item list-group-item-action result-button");
        button.attr("type", "button");
        button.attr("data-info", JSON.stringify(element));
        button.text(element.name)
        $("#results").append(button);
    });
}

// Given a business render the business information dynamically
function renderInfo(business) {
    $("#info").empty();
    let card = $("<div>").addClass("card my-3");
    let cardBody = $("<div>").addClass("card-body");
    let name = $("<div>").addClass("card-title py-1").text(`Name: ${business.name}`);
    let phone = $("<div>").addClass("card-subtitle py-1").text(`Phone Number: ${business.phone}`);
    let location = $("<div>").addClass("card-subtitle py-1").text(`${business.location.address1} ${business.location.city}`);
    let rating = $("<div>").addClass("card-subtitle py-1").text(`Rating: ${business.rating}`);
    let url = $("<div>").addClass("card-subtitle py-1").text(`URL: ${business.url}`);
    let img = $("<img>").addClass("img py-1").attr("src", business.image_url);

    cardBody.append(name, phone, location, rating, url, img);
    card.append(cardBody);

    $("#info").append(card);
}

// Autocomplete disable
inputEl.addEventListener("keypress", (e) => {
    getAutoComplete(e.target.value);
});

//Triggered when search button is clicked
searchEl.addEventListener("click", (e) => {
    e.preventDefault();
    getBusinesses(inputEl.value);
})

//Triggered when a search result button is clicked
$(document).on("click", ".result-button", (e) => {
    renderInfo(JSON.parse(e.target.getAttribute("data-info")));
})

//Set up the remote server
$(() => {

})