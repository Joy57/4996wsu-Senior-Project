var mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require("./models/user"),
    passportLocalMongoose = require('passport-local-mongoose');



var app = express();

app.use(require("express-session")({
    //to encode/decode session data.
    secret:"my secret key for session",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// responsible for reading session, taking the data, encode and decode
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const ObjectID = require('mongodb').ObjectID;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://joy:amijoy57@ds139632.mlab.com:39632/todosdatabase',{ useNewUrlParser: true }, (err, response) => {
    console.log('Database Connected...');

    if (err) 
        throw err;
    // console.log(response);
    db = response;
    dbTodo = db.collection('todos');

});



app.get("/",(rep, res, next)=>{
    res.redirect("login");
  });

app.get('/home', isLoggedIn ,(req, res, next) => {
    dbTodo.find({}).toArray((err, list) => {
      if(err){
        return console.log(err);
      }
      res.render('home',{
        //   property:data
        list: list
      });
    });
  });


  app.post('/add', (req, res, next) => {
    // Create todo
    const todo = {
      text: req.body.text,
    }
    console.log(todo);
 
    dbTodo.insert(todo, (err, result) => {
      if(err){
        return console.log(err);
      }
      console.log('Todo Added...');
      res.redirect('/home');
    });
  });

  app.delete('/delete/:id', (req, res, next) => {
    const query = {_id: ObjectID(req.params.id)}
    console.log("query: ",query);
    dbTodo.deleteOne(query, (err, response) => {
      if(err){
        return console.log(err);
      }
      console.log('Todo Removed');
      res.status(200)
    });
  });
  



app.listen(3000, function(){
    console.log("Server listening on port 3000");
});

app.get("/register", (req, res, next)=>{
    res.render("register");
});
//handle user sign up
app.post("/register", (req, res, next)=>{
    var user = req.body.username;
    var pass = req.body.password;
    User.register(new User({username: user}), pass, (err, user)=>{
        if (err){
            error = err.message;
            console.log(error);
            return res.render('register',{
                //   property:data
                error:error
              });
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        });
    });
})

// login route
app.get("/login", (req, res, next)=>{
    res.render("login");
});


// middleware, runs before final route callback
app.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
}) ,(req, res, next)=>{
    
});


app.get("/logout",(req, res, next)=>{
    req.logout();
    res.redirect("login");
  });

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}