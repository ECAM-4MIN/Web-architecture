const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../config/database');
const Destination = require('../models/Destination');
const Link = require('../models/Link');


// GET a list of all destinations
router.get('/',(req, res) => 
    Destination.findAll()    
    .then(destinations => {
        const dests = {
            context: destinations.map(data =>{
                return{
                    // id: data.id,
                    name: data.name,
                    description: data.description,
                    country: data.country
                }
            })
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(dests.context));
        // res.render('destinations',{
        //     destinations: dests.context
        // });
        // res.json(dests.context)
    })
    .catch(err => res.status(500).json({message: err}))   
    
    );


// Return a destination with the id
router.get('/id=:destId',(req,res)=>{
    destId = req.params.destId;

    //TODO: get the agencies with a request to /search/id=destId

    Destination.findByPk(destId)
        .then( destination => {
            const dest = {
                context: {                    
                    // id: destination.id,
                    name: destination.name,
                    description: destination.description,
                    country: destination.country
                }
            }
            res.json(dest.context)
            // res.render('destinations',{
            //     destinations: [dest.context]
            // });
        })
        .catch(err => res.status(500).json({message: err}));
   
});

// delete destination
router.delete('/id=:destId',(req,res)=>{
    destId = req.params.destId;
    
    // Delete all links
    Link.destroy({
        where: {
            destination_id: destId
        }
    }).then(
        // Delete destination
        Destination.destroy({
            where: {id: destId}
        }).then( data =>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "destination deleted"}));
        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    ).catch(err => {
        res.status(500).json({message: err.message})
    })  

});

// get to the form
// router.get('/add',(req, res) => {
//     res.render('add',{destination:"destination"})
// });

// Add a new destination
router.post('/add',(req, res) => {
    
    let {name, description, country} = req.body;
    console.log(req.body);
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
            // .then(destinations => res.redirect('/destinations')) 
            
            // .then(res.json({message: "destination added"}))
            .then(dest =>{
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({message: "destination added"}));
            })
            .catch(err => res.status(500).json({message: err})) 
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
                    // id: data.id,
                    name: data.name,
                    description: data.description,
                    country: data.country
                }
            })
        }
        // res.render('destinations',{
        //     destinations: dests.context
        // });
        res.json(dests.context)
    })
    .catch(err => res.status(500).json({message: err})) 
})

module.exports = router;