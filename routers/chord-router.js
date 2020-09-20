const express = require('express');
const {Chord} = require('../models/chords');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const {checkChordNotes} = require('./helpers/chord-note-helper');
const {searchChord,deleteChord} = require('./helpers/chord-helpers');

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
//get all chords
router.get('/',async (req,res) => {
    try {
        let chords = await searchChord(req.query)
        return res.json({
            code: 200,
            message: 'chord found',
            chords
        });
    } catch (err) {
        console.log('error ', err);
        return res.json({
            code: 500,
            message: 'an error occured',
            error: err
        });
    }
});

router.get('/search',async (req,res) => {
    const {id,name} = req.query;
    try {
        
        let chords = await Chord.find()
        return res.json({
            code: 200,
            message: 'chord created',
            chord: chord_1
        });
    } catch (err) {
        console.log('error ', err);
        return res.json({
            code: 500,
            message: 'an error occured',
            error: err
        });
    }
});

router.delete('/:id',async (req,res) => {
    const {id} = req.params;
    try {
        console.log(id);
        await deleteChord(id);
        return res.json({
            code: 200,
            message: 'chord deleted',
        });
    } catch (err) {
        console.log('error ', err);
        return res.json({
            code: 500,
            message: 'an error occured',
            error: err
        });
    }
});

module.exports = {router};