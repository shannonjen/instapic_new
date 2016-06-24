var express = require('express');
var promise = require('bluebird');
var path = require('path');
var multer = require('multer');
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();

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

app.use(express.static('public'));

app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));


app.get('/', function(req,res){
	res.render('index.hbs');
})

app.post('/login', function(req,res,next){
	db.one('SELECT * FROM users WHERE username = ${username} and password= $(password)', {username: req.body.username, password: req.body.password})
   .then(function (user) {
   		res.render('users/show', {user: user});
	 })
	 .catch(function(err){
	 	var failMess = "Wrong credentials - try again";
	 		res.render('index', {failMess: failMess});
	 });
});
// users ROUTES BELOW

/*  "/users"
 *    GET: finds all users
 *    POST: creates a new user
 */

// get all users
app.get('/users',function(req,res,next){
	db.any('SELECT * FROM users')
	.then(function(data){
		res.render('users/index',{ data: data });
	})
	.catch(function(err){
		return next(err);
	});
});

// get all pics
app.get('/pics', function(req,res,next){
	db.any('SELECT * FROM pics')
	.then(function(pics){
		res.render('pics/index', { pics: pics });
	})
	.catch(function(){

	});
})



app.get('/lookup', function(req,res){
	spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  .then(function(data) {
  	console.log(data.body);
    res.render('artist', { data: data.body });
  }, function(err) {
    console.error(err);
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
   				res.render('users/show', { user: user, pics: pics });
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
app.get("/delete/users/:id", function(req, res, next) {
	var user_id = req.params.id;
	db.none('delete from users where id=$1', user_id)
		.then(function(){
			res.redirect('/users');
		})
		.catch(function(err){
			return next(err);
		});
});

// create new pic

app.post("/users/:user_id/pics", multer({ dest: './public/images/'}).single('upl'), function(req, res, next){
	var title = req.body.title;
	var src = req.file.filename;
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








