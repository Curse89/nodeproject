const express = require('express');
const {connectDb} = require("./helpers/db");
const axios = require('axios');
const { host, port, db, apiUrl } = require('./configuration');
const app = express();


const startServer = () => {
    app.listen(port, () => {
        console.log("Started AUTH service on " + port);
        console.log(`HOST: ${host}`)
        console.log(`DB: ${db}`)

    });
}

app.get('/test', (req, res) => {
    res.send('AUTH is working');
});

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: "1234",
        email: 'foo@gmail.com'
    });
});

app.get('/testapidata', (req, res) => {
    axios.get(apiUrl + '/testapi').then(response => {
        res.json({
            testapidata: response.data.testapi
        });
    });
});

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: "1234",
        email: 'foo@gmail.com'
    });
});

connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once("open", startServer);