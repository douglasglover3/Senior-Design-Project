// Library and Component imports
import { useState, useEffect } from 'react';
import { playNote } from '../Classes/AudioFunctions';

// CSS imports
import PlayButton from '../images/PlayButton.png';
import '../css/AddEditScheme.css';

// Represents an individual instance of a note-to-color mapping
// Uses playNote() from AudioFunctions to play the note based on <noteName> (e.g. noteName=A plays Piano_A.mp3)
export default function ColorSelector({ noteName, noteColor, setNoteInWindow }) {
    // Store the current hex-color value and update it in the window whenever <note> changes
    const [note, setNote] = useState(noteColor);
    useEffect(() => {
        setNoteInWindow(note);
    }, [note]);

    return(
        <div className='note'>
            <img src={PlayButton} alt='' className='play-note' onClick={() => playNote(noteName)} />
            <label className='note-name'>{noteName}</label>
            <input type="color" id={noteName} className='note-color'
                value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
    );
}