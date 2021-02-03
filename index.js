const inputEl = document.getElementById("input");

function getAutoComplete(keyword) {
    console.log(keyword);
    if (keyword.length < 3) {
        return false;
    }
    let url = `https://api.yelp.com/v3/autocomplete?text=${keyword}&latitude=37.786882&longitude=-122.399972`;
    let headers = {
        Authorization: "Bearer rMy1RF6fsAcJ66aNUB7kpfTNQIGb1-gAzujZ8NcCmfmWoj6hjQfbB4Q8CfDEzfZLhUCqQLfAvPOnecKX9FKaDdQBSL33mhu0SZ6j7__472iB89ZAqG9Ku_G0y0YaYHYx"
    }
    fetch(url, headers).then((response) => {
        console.log(response);
    })
}


inputEl.addEventListener("keypress", (e) => {
    getAutoComplete(e.target.value);
})

