# Step by Step HW Review: News Feed with Sequelize

A step by step guide to reviewing today's homework with the class.

1. npm install
2. createdb newsfeed_app
3. sequelize init
4. modify config.json file like we did in class (i.e. change the development db to "newsfeed_app" and the dialect to "postgres", etc)
5. sequelize model:create --name Article --attribtues title:string,author:string,content:text,fiction:boolean
6. sequelize db:migrate
7. Enter a node REPL by typing `node` at bash prompt and try the following JS commands (you're in a Node REPL when your command prompt has changed to `>`):
  - `var db = require("./models")`
  - `db.article.create({title: "Our first article", author: "Brett", content: "this is our first article about WDI 15.", fiction: true})`
If everything has worked out, hit Ctrl+D on your keyboard to exit the Node REPL.
8. Add the same line you typed in your Node REPL to your `app.js` file with the other `require` statements at the top:
  - `var db = require("./models")`
9. Start replacing the insides of the express routes with:
```js
db.article
    .findAll()
    .then(function (articles) {
      res.render("articles/index", {articlesList: articles});
    });

db.article
	.create(...)
	.then(function (article) {
		res.redirect("/articles");
	});
```
10. Will need to create a new EJS at ./articles/article.ejs

