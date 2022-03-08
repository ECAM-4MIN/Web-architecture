class Appartement{
    constructor(rooms){
        this.rooms = rooms;
    }

    calcTotalArea(){
        let totArea = 0;
        for (let i=0; i < this.rooms.length; i++){
            totArea += this.rooms[i].area;
        }
        return totArea;
    }

    get totalArea(){
        return this.calcTotalArea();
    }

    get get_rooms(){
        return this.rooms;
    }

};
module.exports = Appartement;