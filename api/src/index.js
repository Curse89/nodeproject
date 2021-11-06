const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const {connectDb} = require("./helpers/db");
const { host, port, db, authApiUrl } = require('./configuration');

const app = express();

const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post', postSchema);


const startServer = () => {
    app.listen(port, () => {
        console.log("Started api service on " + port);
        console.log(`HOST: ${host}`)
        console.log(`DB: ${db}`)

        // Post.find(function(err, posts) {
        //     if (err) return console.log(err);
        //     console.log("posts", posts);
        // });

        const silence = new Post({ name: "Silence" });
        silence.save(function(err, savedSilence) {
            if (err) return console.error(err);
            console.log('savedSilence with volumes', savedSilence);
        });
        // console.log(silence.name);
    });
}

app.get('/test', (req, res) => {
    res.send('API is working');
});

app.get('/api/testapi', (req, res) => {
    res.json({
        testapi: true,
    });
});

app.get('/testuser', (req, res) => {
    axios.get(authApiUrl + '/currentUser').then(response => {
        res.json({
            testuser: true,
            userFromAuth: response.data
        });
    });
    
});




connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once("open", startServer);