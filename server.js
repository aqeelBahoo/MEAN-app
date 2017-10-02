/**
 * Created by Home on 9/28/2017.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost/tutorial', function (err) {
    if (err) {
        console.log("not connected to db " + err);
    } else {
        console.log("successfully connected to mongodb");
    }
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function () {
    console.log("server running " + port)
})