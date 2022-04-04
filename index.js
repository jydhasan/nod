var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/index');
var BodyParser = require('body-parser');

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

mongoose.connect("mongodb://localhost:27017/Crud");
var connection = mongoose.connection;
connection.once('open', function () {
    console.log("Connected successfully"); 
});



app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('insert');
});
app.post('/insert', function (req, res) {
    
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
    });

    user.save(() => {
     res.send("<h1>Data successfully send</h1>");
        
    });
});
app.get('/show', function (req, res) {
    User.find({}, function (err, result) {
        
        res.render('show',{users:result});
    });
    
});
var server = app.listen(4000, function () {
    console.log("Server running at port 4000")
});