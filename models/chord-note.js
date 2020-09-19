const mongoose = require('mongoose');
const ChordNoteStruct = require('../structs/chord-note');
//schema for each finger
const chordNoteSchema = mongoose.Schema({
    fret: {type:Number,required:true},
    strings: {type:Array,required:true},
    note: {type:String}
});

chordNoteSchema.methods.serialize = function(){
    let chordNote = new ChordNoteStruct(this);
    return chordNote;
};

const ChordNote = mongoose.model("ChordNote",chordNoteSchema);

module.exports = {ChordNote};