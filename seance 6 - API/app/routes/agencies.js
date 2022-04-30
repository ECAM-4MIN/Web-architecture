const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../config/database');
const Agency = require('../models/Agency');
const Link = require('../models/Link');

// GET a list of all agencies
router.get('/',(req, res) => 
    Agency.findAll()    
    .then(agencies => {
        const ags = {
            context: agencies.map(data =>{
                return{
                    // id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    localization: data.localization
                }
            })
        }
        res.json( ags.context);
        // res.render('agencies',{
        //     agencies: ags.context
        // })
    })
    .catch(err => res.status(500).json({message: err})) 
);

// Return an agency with the id
router.get('/id=:agenId',(req,res)=>{
    agenId = req.params.agenId;
    // console.log(agenId)

    Agency.findByPk(agenId)
        .then( data => {
            const ag = {
                context: {                    
                    // id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    localization: data.localization
                }
            }
            res.json(ag.context)
        })
        .catch(err => res.status(500).json({message: err}));
   
});

// delete agency
router.delete('/id=:agenId',(req,res)=>{
    agenId = req.params.agenId;

    // Delete all links
    Link.destroy({
        where: {
            agency_id: agenId
        }
    }).then(
        // Delete destination
        Agency.destroy({
            where: {id: agenId}
        }).then( data =>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "agency deleted"}));
        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    ).catch(err => {
        res.status(500).json({message: err.message})
    })  

});

// get to the form
// router.get('/add',(req, res) => {
//     res.render('add',{agency:"agency"})
// });

// Add a new agency
router.post('/add',(req, res) => {
    
    let {name, email, phone, localization} = req.body;
    let errors = [];

    // validate fields
    if(!name){errors.push({text: "no name"})};
    if(!email){errors.push({text: "no email"})};
    if(!phone){errors.push({text: "no phone"})};
    if(!localization){errors.push({text: "no localization"})};

    //check for errors
    if(errors.length != 0){
        res.render('add',{
            errors,
            name,
            email,
            phone,
            localization
        })
    } else{
        //insert into table
        Agency.create({
            name,
            email,
            phone,
            localization
        })
            // .then(agencies => res.redirect('/agencies')) 
            .then(res.json({response: "agency added"}))
            .catch(err => res.status(500).json({message: err})) 
        }   
    }
    
    
);

// Search all agencies that are linked to a destination
router.get('/search/id=:destId',(req,res)=>{
    destId = req.params.destId;

    Link.findAll({
            where: {
                destination_id: destId
            }
        }
    ).then(
        linkies => {
            const agenIds = linkies.map(data=>{
                return data.agency_id
            })
            console.log(agenIds)
            Agency.findAll({
                where: {
                    id: agenIds
                }
            }).then(
                agencies =>{
                    const ags = {
                        context: agencies.map(data =>{
                            return{
                                // id: data.id,
                                name: data.name,
                                email: data.email,
                                phone: data.phone,
                                localization: data.localization
                            }
                        })
                    }
                    res.json( ags.context);
                }
            )
            .catch(err => res.status(500).json({message: err})) 
            
        }
    )


    //TODO: First do the links 
})

// Post a form and send
// router.get('/contact/dest=:destId&agen=:agenId',(req,res)=>{
//     // res.render('contact')
//     console.log(req.params)

// })

// Post a form
router.post('/contact',(req,res)=>{
    let {destination_id, agency_id, name, email, phone} = req.body;
    let errors = [];

    // validate fields
    if(!destination_id){errors.push({text: "no dest id"})};
    if(!agency_id){errors.push({text: "no agen id"})};
    if(!name){errors.push({text: "no name"})};
    if(!email){errors.push({text: "no email"})};
    if(!phone){errors.push({text: "no phone"})};

    //check for errors
    if(errors.length != 0){
        res.json({
            errors,
            destination_id, 
            agency_id,
            name,
            email,
            phone
        })
    } else{
        //insert into table
        res.json({ message: "form sent",
            data: {
                destination_id, 
                agency_id,
                name,
                email,
                phone
        }
        })
    }   
    

})

module.exports = router;