const express = require("express");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/restaurants', (req, res) => {
    // request(
    //     { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
    //     (error, response, body) => {
    //         if (error || response.statusCode !== 200) {
    //             return res.status(500).json({ type: 'error', message: err.message });
    //         }

    //         res.json(JSON.parse(body));
    //     }
    // )
    console.log("BODY: ", req.body);
    let keyword = req.body;
    let key = "rMy1RF6fsAcJ66aNUB7kpfTNQIGb1-gAzujZ8NcCmfmWoj6hjQfbB4Q8CfDEzfZLhUCqQLfAvPOnecKX9FKaDdQBSL33mhu0SZ6j7__472iB89ZAqG9Ku_G0y0YaYHYx";
    let url = `https://api.yelp.com/v3/businesses/search?term=${keyword}&latitude=37.786882&longitude=-122.399972&radius=10000&limit=15`;

    fetch(url, {
        method: "GET",
        headers: {
            authorization: `Bearer ${key}`
        }
    }).then((response) => {
        response.json();
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
        return res.status(500).json({ type: 'error', message: err.message });
    });



    // let key = "rMy1RF6fsAcJ66aNUB7kpfTNQIGb1-gAzujZ8NcCmfmWoj6hjQfbB4Q8CfDEzfZLhUCqQLfAvPOnecKX9FKaDdQBSL33mhu0SZ6j7__472iB89ZAqG9Ku_G0y0YaYHYx";
    // $.ajax({
    //     url: `https://api.yelp.com/v3/businesses/search?term=${keyword}&latitude=37.786882&longitude=-122.399972&radius=10000&limit=15`,
    //     method: "GET",
    //     headers: {
    //         authorization: `Bearer ${key}`
    //     }
    // }).then(function (result) {
    //     console.log("search", result.businesses)
    //     renderResults(result.businesses);
    // })



});


app.listen(PORT, () => console.log(`listening on ${PORT}`));