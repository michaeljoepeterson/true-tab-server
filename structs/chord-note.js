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
            this.note = chordNote.note;
            this.strings = chordNote.strings;
            this.fret = chordNote.fret;
    
            this.degree = chordNote.degree ? chordNote.degree :null;
            this.finger = chordNote.finger ? chordNote.finger : null;
        }
        catch(e){
            throw {
                message:'missing chord note data'
            };
        }
    }
}

module.exports = ChordNoteStruct;