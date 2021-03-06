const {ChordNote} = require('../../models/chord-note');

const createChordNote = async (noteData) => {
    try{
        let note = await ChordNote.create(noteData);
        let serializedNote = note.serialize();
        return serializedNote.id;
    }
    catch(e){
        throw e;
    }
}
//check if single note is found in the note res
const compareSingleNote = (notes,singleNote) => {
    
    let foundNote = null;
    for(let i = 0;i < notes.length;i++){
        let note = notes[i];
        let sameStrings = false;
        if(note.strings.length === singleNote.strings.length){
            let stringMatches = 0;
            note.strings.forEach((string,i) => {
                if(string === singleNote.strings[i]){
                    stringMatches++;
                }
            });
            sameStrings = stringMatches === singleNote.strings.length ? true : false;
        }
    
        if(note.note === singleNote.note && note.fret === singleNote.fret && sameStrings){
            foundNote = note;
            break;
        }
    }

    let sameNote = foundNote ? foundNote : false;
    
    return sameNote;
}
//check existing notes and create array of requests or ids
const checkExistingNotes = (noteRes,chordNotes) => {
    let createRequests = noteRes.map((res,i) => {
        if(res.length === 0){
            return createChordNote(chordNotes[i]);
        }
        else{
            const sameNote = compareSingleNote(res,chordNotes[i]);
            const noteVal = sameNote ? sameNote.id : createChordNote(chordNotes[i]);
            return noteVal;
        }
    });

    return createRequests;
}

const checkChordNotes = async (chordNotes) =>{
    try{
        let noteChecks = chordNotes.map(noteData => ChordNote.find({note:noteData.note}));
        const checkRes = await Promise.all(noteChecks);
        const serializedRes = checkRes.map(res => {
            if(res.length === 1){
                return [res[0].serialize()];
            }
            else if(res.length > 1){
                return res.map(singleRes => singleRes.serialize())
            }
            else{
                return res;
            }
        });
        console.log('serialized=============',serializedRes);
        const createReqs = checkExistingNotes(serializedRes,chordNotes);
        console.log('create reqs=================',createReqs);
        const ids = await Promise.all(createReqs);

        console.log('ids================',ids);
        return ids;
    }
    catch(e){
        console.log('error checking notes');
        throw e;
    }
}

const updateNote = async (id,note) => {
    try{
        await ChordNote.findByIdAndUpdate(id,{
            $set:note
        });

        return true;
    }
    catch(e){
        throw e;
    }
}

const updateNotes = async (ids,chordNotes) =>{
    let updateRequess = ids.map((id,i) => updateNote(id,chordNotes[i]));
    try{
        await Promise.all(updateRequess);
        return true;
    }
    catch(e){
        throw e;
    }
}
//could optimize if needed by not updating newly created chords
const checkNotesAndUpdate = async (chordNotes) => {
    let ids = await checkChordNotes(chordNotes);

    try{
        await updateNotes(ids,chordNotes);
        return ids;
    }
    catch(e){
        throw e;
    }
}

module.exports = {createChordNote,checkChordNotes,checkNotesAndUpdate}