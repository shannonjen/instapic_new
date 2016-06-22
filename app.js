var express = require('express');
var promise = require('bluebird');
var path = require('path');


var app = express();

var options =  {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp('postgres://localhost:5432/instapics');


// body parser
var bodyParser = require('body-parser');

// json method kaifu
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));

// users ROUTES BELOW

/*  "/users"
 *    GET: finds all users
 *    POST: creates a new user
 */

// get all users
app.get('/users',function(req,res,next){
	db.any('SELECT * FROM users')
	.then(function(data){
		res.render('index',{ data: data });
	})
	.catch(function(err){
		return next(err);
	});
});

// create a new user
app.post('/users',function(req,res,next){
	var newUser = req.body;
	// expects no rows
	db.none('INSERT INTO users(username,password)'+
		'values(${username},${password})',
		req.body)
	.then(function(){
		res.redirect('/users');
	})
	.catch(function (err){
		return next(err);
	});
});

/*  "/users/:id"
 *    GET: find user by id
 *    PUT: update user by id
 *    DELETE: deletes user by id
 */

// get user by id
app.get('/users/:id', function(req,res,next){
	var userId = req.params.id;
	db.one('SELECT * FROM users WHERE id = $1', userId)
   .then(function (user) {
   		db.any('SELECT * FROM pics WHERE user_id = $1', user.id)
   			.then(function(pics) {
   				res.render('show', { user: user, pics: pics });
   			})
   			.catch(function(err){
   				return next(err);
   			});
	 })
	 .catch(function(err){
	 	return next(err);
	 });
});

// update user by id
app.put("/users/:id", function(req, res) {
	res.send("req.body.username");
});

// delete user by id
app.delete("/users/:id", function(req, res) {
});

// create new pic

app.post("/users/:user_id/pics", function(req, res, next){
	var title = req.body.title;
	var src = req.body.src;
	var user_id = req.params.user_id;
	db.none('insert into pics(title,src,user_id) values(${title},${src},${user_id})', { user_id: user_id, 
			src: src,
			title: title} )
		.then(function(){
			res.redirect('/users/'+user_id);
		})
		.catch(function(err){
			return next(err);
		});
});


app.listen(3000);








