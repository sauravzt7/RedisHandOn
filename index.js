const express = require("express");
const {SearchRepos} = require("./controller/SearchRepos.js");
const {SearchIssues} = require("./controller/SearchIssues.js");
const {SearchUsers} = require("./controller/SearchUsers.js");
const RedisHandler = require("./common/RedisHandler.js");
const axios = require("axios");

const app = express();

app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/search-repos", async (req, res) => {
    if(!req.query.query || req.query.query.trim === '') {
        res.json({"error": "Query is required"}).status(400);
    }
    try {
        const responseToSend = await SearchRepos(req.query.query);
        return res.json(responseToSend);
    }
    catch (error) {
        return res.json({"error": JSON.stringify(error)}).status(500);
    }
});


app.get("/search-issues", async (req, res) => {
    if(!req.query.query || req.query.query.trim === '') {
        res.json({"error": "Query is required"}).status(400);
    }
    try {
        const responseToSend = await SearchIssues(req.query.query);
        return res.json(responseToSend);
    }
    catch (error) {
        return res.json({"error": JSON.stringify(error)}).status(500);
    }
});



app.get("/search-users", async (req, res) => {
    if(!req.query.query || req.query.query.trim === '') {
        res.json({"error": "Query is required"}).status(400);
    }
    try {
        const responseToSend = await SearchUsers(req.query.query);
        return res.json(responseToSend);
    }
    catch (error) {
        return res.json({"error": JSON.stringify(error)}).status(500);
    }
});

app.listen(3000, async () => {
    await RedisHandler.init()
    console.log("Server is running on port 3000");
})






