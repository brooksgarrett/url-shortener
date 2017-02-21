var express = require('express');

const PORT = process.env.PORT || 3000;

var app = express();

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});