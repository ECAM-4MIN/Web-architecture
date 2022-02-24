class Room{
    constructor(name, width, length){
        this.name = name;
        this.width = width;
        this.length = length;
    }
    get area() {
        return this.calcArea();
    }
    calcArea() {
        return this.length * this.width;
    }

};
module.exports = Room;