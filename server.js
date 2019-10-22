const express = require('express');
const bp = require('body-parser');
const URL = require('./db');
const fs = require('fs');
require('./connect');

//variables
var app = express();
var port = process.env.PORT || 8080;
let word = '';

//middleware
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname));

//GET for redirect to original link
app.get('/:link', (req, res) => {
    console.log('GET route reached');
    
    URL.findOne({link: req.params.link})
    .then((address) => {
        if(!address){
            return res.status(404).send(`<h3>Url supplied doesn't exist. By management</h3>`);
        }
        return res.redirect(address.url);
    }).catch((err) => {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        });
    });
});

//POST for new links
app.post('/', (req, res) => {
    console.log('POST route reached');

    var nUrl = getNewLink();

    URL.findOne({link: nUrl})
    .then((fUrl) => {
        if(!fUrl){
            var newUrl = new URL({
                url: req.body.url,
                link: nUrl
            });
        
            newUrl.save()
            .then((url) => {
                console.log(`New short url: http://localhost:${port}/${url.link}`);
                res.status(200).json({
                    message: `http://localhost:${port}/${url.link}`
                });
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: 'Database Error. Try Again'
                });
            });
        }
    })
});
function getNewLink(){
    try{
        var nLink = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);
        return nLink;
    }catch(error){
        throw error;
    }
};

app.listen(port, () => {
    console.log(`Checkout port:${port}`);
});