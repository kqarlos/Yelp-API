# Yelp API

</br>
<p align="center">
    <img src="https://img.shields.io/github/languages/count/kqarlos/Yelp-API?style=for-the-badge" alt="Languages" />
    <img src="https://img.shields.io/github/languages/top/kqarlos/Yelp-API?style=for-the-badge" alt="Top Language" />
    <img src="https://img.shields.io/github/languages/code-size/kqarlos/Yelp-API?style=for-the-badge" alt="Code Size" />
    <img src="https://img.shields.io/github/repo-size/kqarlos/Yelp-API?style=for-the-badge" alt="Repo Size" />   
    <img src="https://img.shields.io/tokei/lines/github/kqarlos/Yelp-API?style=for-the-badge" alt="Total Lines" />
    <img src="https://img.shields.io/github/package-json/dependency-version/kqarlos/Yelp-API/express?style=for-the-badge" alt="Express Version" />
    <img src="https://img.shields.io/github/last-commit/kqarlos/Yelp-API?style=for-the-badge" alt="Last Commit" />  
    <img src="https://img.shields.io/github/issues/kqarlos/Yelp-API?style=for-the-badge" alt="Issues" />  
    <img src="https://img.shields.io/github/followers/kqarlos?style=social" alt="Followers" />  
    </p>

## Description

Testing Yelp's API with a node/express proxy server

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation

Steps to run application:
1. Clone git repository
2. Install dependencies
3. Start the application with an empty db.json file
4. run app

```
git clone git@github.com:kqarlos/note-taker.git
npm install
node server.js

```

<p align="center">
    <a href="https://yelp-api-proxyserver.herokuapp.com/"><img src="https://img.shields.io/badge/-👉 See Live Site-success?style=for-the-badge"  alt="Live Site" /></a>
</p>


## Usage

## Screenshots

* Working app

![Site](assets/images/live.gif)


## Snippets

- Fetching data

```javascript

// CLIENT SIDE API CALL TO NODE EXPRESS SERVER
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

// EXPRESS ROUTE FETCHING FROM YELP'S API AND SERVING DATA
app.get('/api/restaurants/:keyword', (req, res) => {
    let keyword = req.params.keyword;
    // console.log("Keyword", req.params.keyword);
    let key = "rMy1RF6fsAcJ66aNUB7kpfTNQIGb1-gAzujZ8NcCmfmWoj6hjQfbB4Q8CfDEzfZLhUCqQLfAvPOnecKX9FKaDdQBSL33mhu0SZ6j7__472iB89ZAqG9Ku_G0y0YaYHYx";
    let url = `https://api.yelp.com/v3/businesses/search?term=${keyword}&latitude=37.786882&longitude=-122.399972&limit=15`;

    fetch(url, {
        method: "GET",
        headers: {
            authorization: `Bearer ${key}`
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });

});

```
* The client side javascript makes a fetch request to the node/express proxy server. This server in return serves data fetched from Yelp's API.

## Credits

### Author

- Carlos Toledo: [portfolio](https://kqarlos.github.io)
- Github: [kqarlos](https://www.github.com/kqarlos)
- LinkedIn: [carlos-toledo415](https://www.linkedin.com/in/carlos-toledo415/)


### Built With

</br>
<p align="center">
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/-HTML-orange?style=for-the-badge"  alt="HMTL" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS-blue?style=for-the-badge" alt="CSS" /></a>
    <a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/-Javascript-yellow?style=for-the-badge" alt="Javascript" /></a>
    <a href="https://getbootstrap.com/"><img src="https://img.shields.io/badge/-Bootstrap-blueviolet?style=for-the-badge" alt="Bootstrap" /></a>
    <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/-Node-orange?style=for-the-badge" alt="Node" /></a>
    <a href="https://www.npmjs.com/package/express"><img src="https://img.shields.io/badge/-Express-blue?style=for-the-badge" alt="Express" /></a>
</p>

## License

<p align="center">
    <img align="center" src="https://img.shields.io/github/license/kqarlos/note-taker?style=for-the-badge" alt="MIT license" />
</p>
