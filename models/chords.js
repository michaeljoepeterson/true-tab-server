const mongoose = require('mongoose');
const ChordStruct = require('../structs/chord');
//add instrument and visibilty to own collections
const chordSchema = mongoose.Schema({
    name: {type: String, required: true, unique:true},
    notes:{type:Array},
    degrees:{type:Array},
    chordNotes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'ChordNote', unique: false, required: [false, 'No notes found']}],
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: false,  required: [false, 'No users found']},
    fingers:{type:Array,required: true},
    visibility:{ type: mongoose.Schema.Types.ObjectId, ref: 'Visibility', unique: false,  required: [false, 'No users found']},
    instrument:{ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument', unique: false,  required: [false, 'No users found']}
});

chordSchema.methods.serialize = function(){
    let notes = this.chordNotes ? this.chordNotes.map((note => note.serialize())) : [];
    let user = null;
    if(this.createdBy){
        user = this.createdBy.serialize();
    }
    let chord = new ChordStruct(this,notes,user);
	return chord;
};

const Chord = mongoose.model("Chord",chordSchema);

module.exports = {Chord};