const inputEl = document.getElementById("input");
const searchEl = document.getElementById("search");

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

function getBusinesses(keyword) {
    console.log(keyword);
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

function renderResults(businesses) {
    businesses.forEach(element => {
        let button = $("<button>");
        button.addClass("list-group-item list-group-item-action result-button");
        button.attr("type", "button");
        button.text(element.name)
        $("#results").append(button);
    });
}


inputEl.addEventListener("keypress", (e) => {
    // getAutoComplete(e.target.value);
});

searchEl.addEventListener("click", (e) => {
    e.preventDefault();
    getBusinesses(inputEl.value);
})

$(() => {
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            console.log('done');
        }
    });
})