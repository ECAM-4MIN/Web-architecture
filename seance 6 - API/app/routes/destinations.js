const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../config/database');
const Destination = require('../models/Destination');


// GET a list of all destinations
router.get('/',(req, res) => 
    Destination.findAll()    
    .then(destinations => {
        const dests = {
            context: destinations.map(data =>{
                return{
                    name: data.name,
                    description: data.description,
                    country: data.country
                }
            })
        }
        res.render('destinations',{
            destinations: dests.context
        });
    })
    .catch(err => console.log(err))   
    );

// get to the form
router.get('/add',(req, res) => {
    res.render('add')
});

// Add a new destination
router.post('/add',(req, res) => {
    
    let {name, description, country} = req.body;
    let errors = [];

    // validate fields
    if(!name){errors.push({text: "no name"})};
    if(!description){errors.push({text: "no description"})};
    if(!country){errors.push({text: "no country"})};

    //check for errors
    if(errors.length != 0){
        res.render('add',{
            errors,
            name,
            description,
            country
        })
    } else{
        //insert into table
        Destination.create({
            name,
            description,
            country
        })
            .then(destinations => res.redirect('/destinations')) 
            .catch(err => console.log(err))
        }   
    }
    
    
);

// Search for destinations
router.get('/search',(req, res) =>{
    let {term} = req.query;
    term = term.toLowerCase();

    Destination.findAll({
        where: {
            [Op.or]: {
                name: db.where(db.fn('LOWER',db.col('name')),'LIKE','%'+term+'%'),
                description: db.where(db.fn('LOWER',db.col('description')),'LIKE','%'+term+'%'),
                country: db.where(db.fn('LOWER',db.col('country')),'LIKE','%'+term+'%'),
            }
        }
    })
    .then(destinations => {
        const dests = {
            context: destinations.map(data =>{
                return{
                    name: data.name,
                    description: data.description,
                    country: data.country
                }
            })
        }
        res.render('destinations',{
            destinations: dests.context
        });
    })
    .catch(err => console.log(err));
})

module.exports = router;