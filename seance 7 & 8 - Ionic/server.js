const express = require("express");
// const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require('cors');
// const path = require("path");



// Database
const db = require('./app/config/database');

// Test DB
db.authenticate()
  .then(()=> console.log('DB connected...'))
  .catch(err => console.log('Error:' + err) )

// app init
const app = express();


// Body Parser to use json
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');



// allow urls
const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

// Index route
app.get("/", (req, res) => {
  // res.render('index',{layout: 'landing'})
  res.redirect('/destinations')
});

// All routes
app.use('/destinations',cors(corsOptions), require('./app/routes/destinations'));
app.use('/agencies', cors(corsOptions),require('./app/routes/agencies'));
app.use('/links', cors(corsOptions),require('./app/routes/links'));


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
