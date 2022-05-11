const Sequelize = require('sequelize');
const db = require('../config/database');

const Link = db.define('links',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    destination_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
    },
    agency_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
    }


})
module.exports = Link;