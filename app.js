const express = require('express');
const session = require('express-session');

//creating app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({ secret: 'keyboard cat',resave:false, cookie: { maxAge: 1000 * 60 * 60 * 24 },saveUninitialized:true, }))
// app.use(session({
//     secret: 'test',
//     resave: true,
//     saveUninitialized: true
// }));

//send the index.html when receiving HTTP GET /
//handling static HTML and EJS templates
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
 res.render('index'); //no need for ejs extension
});

//route for contacts
app.get('/contacts', (req, res) => {
 res.render('contacts'); 
});

app.get('/catalogue', (req, res) => {
    res.render('catalogue'); 
   });

   app.get("/register", (req, res) => {
    res.render('register');
});   

app.get("/login", (req, res) => {
    res.render('login');
}); 

//pass requests to the router middleware
const router = require('./apis/routes');
app.use(router);   
   
//make the app listen on port 
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
 console.log(`Cart app listening at http://localhost:${port}`);
})