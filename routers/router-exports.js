const express = require('express');
const router = express.Router();

//convert to router
const {router:userRouter} = require('./user-router');
const {router:chordRouter} = require('./chord-router');
const {router:visibilityRouter} = require('./visibility-router');

router.use('/users',userRouter);
router.use('/chords', chordRouter);
router.use('/visibility', visibilityRouter);

module.exports = {router};