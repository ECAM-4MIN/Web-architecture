const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');



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
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// // swagger
// const swaggerOptions = {
//   swaggerDefinition: {
//     info:{
//       title: "Tragency",
//       description: "API",
//       contact:{
//         name: "Nicolas Samelson"
//       },
//       servers: ["http://localhost:3000"]
//     }

//   },
//   apis: ["server.js","app/routes/*.js"]
  
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Index route
app.get("/", (req, res) => {
  res.render('index',{layout: 'landing'})
});

// All routes
app.use('/destinations',require('./app/routes/destinations'));
app.use('/agencies', require('./app/routes/agencies'));
app.use('/links', require('./app/routes/links'));


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
