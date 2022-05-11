const Sequelize = require('sequelize');
const db = require('../config/database');

const Destination = db.define('destinations',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },

})
module.exports = Destination;