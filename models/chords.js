const mongoose = require('mongoose');
//schema for each finger
const positionSchema = mongoose.Schema({
    image: {type:String,required:true},
    finger: {type:Number,required:true},
    fret: {type:Number,required:true},
    strings: {type:Array,required:true},
    note: {type:String},
    degree: {type:Number}
},{_id:false});

const chordSchema = mongoose.Schema({
    name: {type: String, required: true, unique:true},
    notes:{type:Array},
    users:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: false,  required: [false, 'No users found']}],
    degrees:{type:Array},
    notePositions:[positionSchema],
    cretedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: false,  required: [false, 'No users found']}
});

chordSchema.methods.serialize = function(){
	return {
		id:this._id,
		notes:this.notes,
		users:this.users,
		degrees:this.degrees,
		notePositions:this.notePositions,
	};
};

const Chord = mongoose.model("Chord",chordSchema);

module.exports = {Chord};