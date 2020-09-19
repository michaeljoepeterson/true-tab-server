const mongoose = require('mongoose');

const instrumentSchema = mongoose.Schema({
    name:{type:String, required: true, unique:true},
    strings:{type:Number,required:true},
    stringNames:{type:Array,required:true}
});

instrumentSchema.methods.serialize = function(){
    return {
        id:this._id,
        strings:this.strings,
        stringNames:this.stringNames
    };
};

const Instrument = mongoose.model("Instrument",instrumentSchema);

module.exports = {Instrument};