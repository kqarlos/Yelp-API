const inputEl = document.getElementById("input");
const searchEl = document.getElementById("search");

// Autocomplete disable
function getAutoComplete(keyword) {
    if (keyword.length < 5) {
        return false;
    }
    let key = "rMy1RF6fsAcJ66aNUB7kpfTNQIGb1-gAzujZ8NcCmfmWoj6hjQfbB4Q8CfDEzfZLhUCqQLfAvPOnecKX9FKaDdQBSL33mhu0SZ6j7__472iB89ZAqG9Ku_G0y0YaYHYx";
    $.ajax({
        url: `https://api.yelp.com/v3/autocomplete?text=${keyword}&latitude=37.786882&longitude=-122.399972`,
        method: "GET",
        headers: {
            authorization: `Bearer ${key}`
        }
    }).then(function (result) {
        console.log("auto", result)
    })

}

// Calls yelp's api to get a list of restaurants based on our keyword search
function getBusinesses(keyword) {
    let key = "rMy1RF6fsAcJ66aNUB7kpfTNQIGb1-gAzujZ8NcCmfmWoj6hjQfbB4Q8CfDEzfZLhUCqQLfAvPOnecKX9FKaDdQBSL33mhu0SZ6j7__472iB89ZAqG9Ku_G0y0YaYHYx";
    $.ajax({
        url: `https://api.yelp.com/v3/businesses/search?term=${keyword}&latitude=37.786882&longitude=-122.399972&radius=10000&limit=15`,
        method: "GET",
        headers: {
            authorization: `Bearer ${key}`
        }
    }).then(function (result) {
        console.log("search", result.businesses)
        renderResults(result.businesses);
    })
}

// Given a list of businesses render them in a list
function renderResults(businesses) {
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
    // getAutoComplete(e.target.value);
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
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
})