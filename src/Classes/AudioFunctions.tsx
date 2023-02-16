// Stores the volume to be played
let vol: number;

// Changes <vol>
const setVol = function(volume: number) {
    vol = volume;
}

// Plays a file from 'musical_notes/' based on <note>
// e.g. when <note> is 'A', this plays 'Piano_A.mp3'
const playNote = function(note: string) {
    const file = require("../musical_notes/Piano_" + note + ".mp3");
    const audio = new Audio(file);
    audio.volume = (vol / 100);    // audio.volume in the range of [0, 1]
    audio.play();
}

export { playNote, setVol };