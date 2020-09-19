const express = require('express');
const {Visibility} = require('../models/visibility');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use(jwtAuth);

//create visiblity
router.post('/',async (req,res) => {
    const {visibility} = req.body;
    try {
        const visibilityDb = await Visibility.create(visibility);

        return res.json({
            code: 200,
            message: 'visibility created',
            visibility: visibilityDb.serialize()
        });
    } catch (err) {
        console.log('error ', err);
        if (err.message.includes('E11000')) {
            return res.json({
                code: 401,
                message: 'visbility already exists'
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