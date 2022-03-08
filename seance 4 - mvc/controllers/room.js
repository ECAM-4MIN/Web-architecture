let Room = require("../models/room.js")

exports.createRoom = function(req, res){
    let name = req.query.name;
    let length = parseInt(req.query.length);
    let width = parseInt(req.query.width);
    let room = new Room(name,width,length);

    if (req.session.rooms){
        req.session.rooms.push(room);
    }
    else{
        req.session.rooms = [];
        req.session.rooms.push(room);
    }
    console.log(req.session.rooms);
    res.redirect('/show_appart');

}
exports.showForm = function(req, res) {
    res.render('room.ejs')
    
}

