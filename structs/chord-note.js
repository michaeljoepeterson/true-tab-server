class ChordNoteStruct{
    id;
    finger;
    degree;
    strings;
    note;
    fret;

    constructor(chordNote){
        try{
            this.id = chordNote._id;
            this.note = this.note;
            this.strings = this.strings;
    
            this.degree = this.degree ? this.degree :null;
            this.finger = this.finger ? this.finger : null;
        }
        catch(e){
            throw {
                message:'missing chord note data'
            };
        }
    }
}

module.exports = ChordNoteStruct;