const express = require('express');
const {Chord} = require('../models/chords');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use(jwtAuth);

//create chord
router.post('/',(req,res) => {
    const {chord} = req.body;
    return Chord.create(chord)

    .then(chord => {
        return res.json({
            code:200,
            message:'chord created',
            chord:chord.serialize()
        });
    })

    .catch(err => {
        console.log('error ',err);
        if(err.message.includes('E11000')){
            return res.json({
                code:401,
                message:'chord already exists'
            });
        }
        return res.json({
            code:500,
            message:'an error occured',
            error:err
        });
    })
    
});

module.exports = {router};