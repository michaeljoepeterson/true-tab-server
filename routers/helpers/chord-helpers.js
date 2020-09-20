const { serialize } = require('v8');
const { Chord } = require('../../models/chords');
const { Instrument } = require('../../models/instrument');

const findInstrument = async (name) => {
    try{
        let instrument = await Instrument.find({name});
        return instrument[0]._id;
    }
    catch(e){
        throw e
    }
}

const searchChord = async (params) => {
    if(!params.instrument){
        throw {
            message:'missing instrument'
        };
    }
    let search = null;
    let searchBy = null;
    if(params.id){
        searchBy = 'id';
        search = params.id;
    }
    else if(params.name){
        searchBy = 'name';
        search = params.name;
    }
    try{
        let instrument = params.instrumentId ? params.instrumentId : await findInstrument(params.instrument);
        let query = {
            [searchBy]:search,
            instrument
        };
        console.log('query',query);
        console.log('instrument: ',instrument)
        let chords = await Chord.find(query).populate('chordNotes');
        return chords.map(chord => chord.serialize());
    }
    catch(e){
        throw e;
    }

}

const deleteChord = async (id) => {
    try{
        await Chord.findOneAndDelete({_id:id})
        return 'deleted';
    }
    catch(e){
        throw e;
    }
}

module.exports = {searchChord,deleteChord};