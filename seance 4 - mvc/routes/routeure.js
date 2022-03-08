// Get an instance of the express Router and set routes
let express = require('express');
let router = express.Router();

router.get('/', (request, response) => response.send('Hello World !'));

// Import contact controller
var roomController = require('../controllers/room');
router.get('/show_form', roomController.showForm);
router.get('/add_room', roomController.createRoom);

var appartController = require('../controllers/appartement');
router.get('/show_appart',appartController.showAppart);
router.get('/new_room',appartController.newRoom);

module.exports = router;