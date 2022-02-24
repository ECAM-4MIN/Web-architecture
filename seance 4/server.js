// Import express
let express = require('express');
// Initialize the app
let app = express();

app.use(express.static('public'));

let session = require('express-session');
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
    })
);

app.set('view engine', 'ejs');
// Send message for default URL


let routes = require('./routes/routeure');
app.use('/',routes);

// Setup server port
let port = 3000;
// Launch app to listen to specified port
app.listen(port, function () {
console.log('Server running on port' + port);
});