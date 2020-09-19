const mongoose = require('mongoose');

const visibilitySchema = mongoose.Schema({
    level:{type:String, required: true, unique:true}
});

visibilitySchema.methods.serialize = function(){
    return {
        id:this._id,
        level:this.level
    };
};

const Visibility = mongoose.model("Visibility",visibilitySchema);

module.exports = {Visibility};