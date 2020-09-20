const express = require('express');
const {Chord} = require('../models/chords');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const {checkChordNotes} = require('./helpers/chord-note-helper');

router.use(jwtAuth);

//create chord
router.post('/',async (req,res) => {
    const {chord} = req.body;
    try {
        const noteIds = await checkChordNotes(chord.chordNotes);
        chord.chordNotes = noteIds;
        let chord_1 = await Chord.create(chord)
        return res.json({
            code: 200,
            message: 'chord created',
            chord: chord_1
        });
    } catch (err) {
        console.log('error ', err);
        if (err.message.includes('E11000')) {
            return res.json({
                code: 401,
                message: 'chord already exists'
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