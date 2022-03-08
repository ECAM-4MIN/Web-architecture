let Appartement = require("../models/appartement.js")
let Room = require("../models/room.js")
exports.showAppart = function(req, res) {

    let rooms = req.session.rooms;
    let roumes = [];
    for (let i=0; i<rooms.length;i++){
        room = rooms[i];
        roume = new Room(room.name,room.width,room.length);
        roumes.push(roume);
    }
    let appart = new Appartement(roumes);


    res.render('appartement.ejs',{
        rooms: appart.get_rooms,
        area: appart.totalArea
    })
    
}
exports.newRoom = function(req, res) {
    res.redirect('/show_form');
    
}
