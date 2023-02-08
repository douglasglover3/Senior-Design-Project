// Library and Component imports
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SchemeFunctions } from '../Classes/SchemeFunctions';
import { setVol } from '../Classes/AudioFunctions';
import ColorSelector from '../components/ColorSelector';

// CSS imports
import '../css/GeneralStylings.css';
import '../css/AddEditScheme.css';

const fs = window.require('fs');
const path = window.require('path');

export default function EditSchema() {
  const location = useLocation();
  let selectedScheme = location.state.scheme;
  let originalName = selectedScheme.name;

  // Variables used in form
  const [volume, setVolume] = useState(50);
  const [name, setName] = useState(selectedScheme.name);
  const [error, setError] = useState('');
  const [C, setC] = useState(selectedScheme.notes[0]);
  const [Db, setDb] = useState(selectedScheme.notes[1]);
  const [D, setD] = useState(selectedScheme.notes[2]);
  const [Eb, setEb] = useState(selectedScheme.notes[3]);
  const [E, setE] = useState(selectedScheme.notes[4]);
  const [F, setF] = useState(selectedScheme.notes[5]);
  const [Gb, setGb] = useState(selectedScheme.notes[6]);
  const [G, setG] = useState(selectedScheme.notes[7]);
  const [Ab, setAb] = useState(selectedScheme.notes[8]);
  const [A, setA] = useState(selectedScheme.notes[9]);
  const [Bb, setBb] = useState(selectedScheme.notes[10]);
  const [B, setB] = useState(selectedScheme.notes[11]);

  const handleVolume = (e) => {
    let volumeVal = parseInt(e.target.value);
    setVolume(volumeVal);   // In AddSchema.tsx
    setVol(volumeVal);      // In AudioFunctions.tsx
  }

  const handleSubmit = () => {
    let schemes = SchemeFunctions.getSchemes();

    // Error-handling to prevent special characters
    if (!name.match(/^[0-9a-zA-Z]+$/)) {
      setError('Please only use alphanumeric characters (a-Z and 0-9)');
      return;
    }

    // Error-handling to prevent duplicate names, but allow overwriting filename
    for (let i = 0; i < schemes.length; i++) {
      if (name === schemes[i].name && originalName !== schemes[i].name) {
        setError('Sorry! A color-scheme with that name already exists');
        return;
      }
    }

    setError('');

    // Add hex code colors to <noteArray>
	  let noteArray: string[] = [];
	  noteArray.push(C);
	  noteArray.push(Db);
	  noteArray.push(D);
	  noteArray.push(Eb);
	  noteArray.push(E);
	  noteArray.push(F);
	  noteArray.push(Gb);
	  noteArray.push(G);
    noteArray.push(Ab);
	  noteArray.push(A);
	  noteArray.push(Bb);
	  noteArray.push(B);

	  let schemeObj = {name: name, notes: noteArray};

    // See whether or not filename for scheme needs to be changed
    if (name !== originalName) {
      // Need to change filename
      let newFilePath = path.join('src', 'schemes', name + '.json');
      let oldFilePath = path.join('src', 'schemes', originalName + '.json');
      fs.renameSync(oldFilePath, newFilePath);
    }

    let filePath = path.join('src', 'schemes', name + '.json');
    fs.writeFileSync(filePath, JSON.stringify(schemeObj));
    SchemeFunctions.editScheme(originalName, schemeObj);
	  window.location.href ='/';
  }

  return (
    <div className='background'>
      <span className='title'>Edit Scheme</span>
      <span className='subtitle'>Change your color profile</span> <br /> <br />

      <label className='input-label'>Rename Your Scheme: </label>
      <input type="text" className='input-field'
          required autoFocus
          value = {name} onChange = {(e) => setName(e.target.value.trim())}/>
      <span>{error}</span> <br /> <br />

      <label className='input-label'>Volume Slider</label>
      <div className='input-field'>
        <input type="range" id='volume-slider'
            value={volume} onChange={handleVolume} />
      </div>

      <div className='note-grid'>
        <ColorSelector noteName='C' noteColor={C} setNoteInWindow={setC} />
        <ColorSelector noteName='Db' noteColor={Db} setNoteInWindow={setDb} />
        <ColorSelector noteName='D' noteColor={D} setNoteInWindow={setD} />
        <ColorSelector noteName='Eb' noteColor={Eb} setNoteInWindow={setEb} />
        <ColorSelector noteName='E' noteColor={E} setNoteInWindow={setE} />
        <ColorSelector noteName='F' noteColor={F} setNoteInWindow={setF} />
        <ColorSelector noteName='Gb' noteColor={Gb} setNoteInWindow={setGb} />
        <ColorSelector noteName='G' noteColor={G} setNoteInWindow={setG} />
        <ColorSelector noteName='Ab' noteColor={Ab} setNoteInWindow={setAb} />
        <ColorSelector noteName='A' noteColor={A} setNoteInWindow={setA} />
        <ColorSelector noteName='Bb' noteColor={Bb} setNoteInWindow={setBb} />
        <ColorSelector noteName='B' noteColor={B} setNoteInWindow={setB} />
      </div>

      <button type='button' className='button' onClick={handleSubmit}>Edit Scheme</button>
      <button type="button" className='button' onClick={() => {window.location.href='/'}}>Cancel</button>
    </div>
  );
}
