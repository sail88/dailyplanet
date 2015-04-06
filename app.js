var express = require('express');
var bodyParser = require('body-parser');
var pg = require("pg");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use( express.static( "images" ) );

// Refactor connection and query code
var db = require("./models");

app.get('/articles', function(req,res) {
	db.Article.all().then(function(jsArticles){
		res.render('articles/articles.ejs',{ejsArticles:jsArticles});
  		console.log("GET /articles");
  	})
});

app.get('/articles/new', function(req,res) {
  res.render('articles/new');
});

app.post('/articles', function(req,res) {
	var newTitle = req.body.aTitle;
	var newAuthor = req.body.aAuthor;
	var newContent = req.body.aContent;

	console.log("New Author",newAuthor);

	db.Article.create({title:newTitle,author:newAuthor,content:newContent}).then(function(taco) {
		res.redirect('/articles');
  	})
});

app.get('/articles/:id', function(req, res) {
	var jsID = req.params.id;

	db.Article.find(jsID).then(function(jsOneArticle){
		res.render('articles/article',{ejsArticle:jsOneArticle});
		console.log(jsID);
	})
});

app.get('/', function(req,res) {
  res.render('site/index.ejs');
});

app.get('/about', function(req,res) {
  res.render('site/about');
});

app.get('/contact', function(req,res) {
  res.render('site/contact');
});

app.listen(3000, function() {
  console.log('Listening');
});
