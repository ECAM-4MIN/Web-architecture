const Sequelize = require('sequelize');
const db = require('../config/database');

const Agency = db.define('agencies',{
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true
    // },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    localization: {
        type: Sequelize.STRING
    },

})
module.exports = Agency;