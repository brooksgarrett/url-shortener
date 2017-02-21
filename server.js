var express = require('express');
var _ = require('lodash');
var validator = require('validator');

const PORT = process.env.PORT || 3000;

var app = express();

var urls = [];
var id = 0;

app.get('/new/:url', (req, res) => {
    if (validator.isURL(req.params.url, {
        require_protocol: true,
    })) {
        urls = _.concat(urls, {
            id,
            url: req.params.url
        });
        id = id + 1;
        return res.send(urls[id - 1]);
    } else {
        res.send({
            error: 'Wrong url format, make sure you have a valid protocol and real site.'
        });
    }
});

app.get('/:id', (req, res) => {
    var id = -1;
    try {
        var id = parseInt(req.params.id);
    } catch (e) {
        console.log(e);
        return res.send();
    }
    console.log(typeof id, id);
    var url = _.find(urls, {id}).url;
    console.log(url);
    return res.status(301).header('Location', url).send();
});


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});