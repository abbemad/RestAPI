var express = require('express'),
    mongoose = require('mongoose');
// Below DB connection
var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;


var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(req,res){

        var query = {};
        // Below is the check if the query that is entered exists
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        Book.find(query, function(err,books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    });

bookRouter.route('/Books/:bookId')
    .get(function(req,res){
        // bookId can be whatever you want link movies, music etc but change it in the bookRouter and Book.findById
        Book.findById(req.params.bookId, function(err,book){
            if(err)
                res.status(500).send(err);
            else
                res.json(book);
        });
    });

app.use('/api', bookRouter);


app.get('/', function(req, res){
    res.send('Hello API');
});

app.listen(port, function(){
    console.log('Gulp running my app PORT: ' + port);
});

