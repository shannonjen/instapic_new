# Instapic

Instapic is a simple full-stack web application that allows users to share images with captions. Upon successful "login" (crude), a user is directed to their unique page which features their previously uploaded instapics and a form for instapic upload. In addition to a feed page that lists the instapics of all users, Instapics provides a lookup feature that makes a Spotify API call for Elvis. Instapics is a class example for TTP.

## To Use

Clone and cd into directory

 ```
$ git clone 
$ cd instapic_new

 ```

Install dependencies

```

$ npm install
```

Run with node


```

$ node app.js


```

## Built With

* Node
* Express
* PostgreSQL
	* [pg-promise/bluebird](https://www.npmjs.com/package/pg-promise)
* Handlebars
* [multer](https://www.npmjs.com/package/multer)
* Spotify Web API wrapper for Node: [spotify-web-api-node](https://www.npmjs.com/package/spotify-web-api-node)
* [Bootsrap](http://getbootstrap.com/)


## Author

Jen Shannon

## Acknowledgments

* [Bootstrap Jumbotron Template](http://getbootstrap.com/examples/jumbotron/)


## Next Steps

* Make modular (Use express.Router and employ MVC patter)
* Build legitimate login/sign-up
	* Store hashed/salted password (bcrypt)
	* Add sessions to store user login (express/session, morgan)
* Use appropriate HTTP verbs (method-override or Ajax)
* Ajax
* More Elvis
