const chords = require("../models/chords");

class ChordStruct{
    id;
    name;
    notes;
    degrees;
    chordNotes;
    createdBy;
    fingers;
    visibility;
    instrument;

    constructor(chord,chordNotes,user){
        try{
            this.id = chord.id;
            this.name = chord.name;
            this.degrees = chord.degrees;
            if(user){
                this.createdBy = user;
            }
            this.fingers = chord.fingers;
            this.visibility = chord.visibility;
            this.instrument = chord.instrument;
            this.chordNotes = this.populateChordNotes(chordNotes);
        }
        catch(e){
            throw{
                message:'error building chord'
            };
        }
    }

    populateChordNotes = (chordNotes) => {
        let modifedNotes = chordNotes.map((note,i) => {
            //could replace with new chordnote if some issus pop up
            let newNote = {...note};
            newNote.finger = this.fingers[i];
            newNote.degree = this.degrees[i];
            return newNote;
        });

        return modifedNotes;
    }
}

module.exports = ChordStruct;