const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../config/database');
const Link = require('../models/Link');

// GET a list of all links
router.get('/',(req, res) => {
    Link.findAll()    
    .then(links => {
        const linkies = {
            context: links.map(data =>{
                return{
                    // id: data.id,
                    destination_id: data.destination_id,
                    agency_id: data.agency_id
                }
            })
        }
        res.json({links: linkies.context});
        // res.render('links',{links: linkies.context})

    })
    .catch(err => res.status(500).json({message: err})) 
    
});

// get to the form TODO: remove? find another way
// router.get('/add',(req, res) => {
//     res.json({
//         destination_id: req.params.destId,
//         agency_id: req.params.agenId
//     })
// });

// Add a new destination
router.post('/add',(req, res) => {

    let {destination_id, agency_id} = req.body;
    let errors = [];

    // validate fields
    if(!destination_id){errors.push({text: "no dest id"})};
    if(!agency_id){errors.push({text: "no agen id"})};

    //check for errors
    if(errors.length != 0){
        res.json({
            errors,
            destination_id, 
            agency_id
        })
    } else{
        //insert into table
        Link.create({
            destination_id, 
            agency_id
        })
            // .then(linkes => res.redirect('/links'))
            .then(res.json({message: "link added"})) 
            .catch(err => console.log(err))
        }   
    }
    
    
);

// Return a link with the id
router.get('/id=:linkId',(req,res)=>{
    linkId = req.params.linkId;
    // console.log(agenId)

    Link.findByPk(linkId)
        .then( data => {
            const linkie = {
                context: {                    
                    // id: data.id,
                    destination_id: data.destination_id,
                    agency_id: data.agency_id
                }
            }
            res.json(linkie.context)
        })
        .catch(err => res.status(500).json({message: err}));
   
});

// delete link
router.delete('/id=:linkId',(req,res)=>{
    linkId = req.params.linkId;
    Link.destroy({
        where: {id: linkId}
    }).then( data =>{
        res.json({message: "link deleted"});
    }).catch(err => {
        res.status(500).json({message: err.message})
    })

});


module.exports = router;