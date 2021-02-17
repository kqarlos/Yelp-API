const express = require("express");
const fetch = require("node-fetch");
const path = require("path");


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

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

app.get('/api/autocomplete/:keyword', (req, res) => {
    let keyword = req.params.keyword;
    // console.log("Keyword", req.params.keyword);
    let key = "rMy1RF6fsAcJ66aNUB7kpfTNQIGb1-gAzujZ8NcCmfmWoj6hjQfbB4Q8CfDEzfZLhUCqQLfAvPOnecKX9FKaDdQBSL33mhu0SZ6j7__472iB89ZAqG9Ku_G0y0YaYHYx";
    let url = `https://api.yelp.com/v3/autocomplete?text=${keyword}&latitude=37.786882&longitude=-122.399972`;

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


app.listen(PORT, () => console.log(`listening on ${PORT}`));