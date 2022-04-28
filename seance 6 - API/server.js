const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");


// Database
const db = require('./app/config/database');


// Test DB
db.authenticate()
  .then(()=> console.log('DB connected...'))
  .catch(err => console.log('Error:' + err) )

// app init
const app = express();

// paths
const publicDirectory = path.join(__dirname, 'app/public');
const viewsPath = path.join(__dirname, 'app/views');
app.set('views', viewsPath);

// Handlebars
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine','handlebars' );

// Set static folder
app.use(express.static(publicDirectory));
app.use(express.static("img"));

// Body Parser to use json
app.use(bodyParser.urlencoded({ extended: false }));

// Index route
app.get("/", (req, res) => {
  res.render('index',{layout: 'landing'})
});

// destination routes
app.use('/destinations',require('./app/routes/destinations'));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
