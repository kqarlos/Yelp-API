const inputEl = document.getElementById("input");
const searchEl = document.getElementById("search");

// Adds autocomplete functionality to the given input element with the given array
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

// Calls server for autocomplete data and calls to render to input
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
        // console.log("AUTO DATA", data.terms);
        let terms = data.terms.map(term => term.text);
        autocomplete(inputEl, terms);
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