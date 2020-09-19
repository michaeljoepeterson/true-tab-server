const express = require('express');
const {Instrument} = require('../models/instrument');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use(jwtAuth);

//create visiblity
router.post('/',async (req,res) => {
    const {instrument} = req.body;
    try {
        const instrumentDb = await Instrument.create(instrument);

        return res.json({
            code: 200,
            message: 'instrument created',
            instrument: instrumentDb.serialize()
        });
    } catch (err) {
        console.log('error ', err);
        if (err.message.includes('E11000')) {
            return res.json({
                code: 401,
                message: 'instrument already exists'
            });
        }
        return res.json({
            code: 500,
            message: 'an error occured',
            error: err
        });
    }
    
});

module.exports = {router};