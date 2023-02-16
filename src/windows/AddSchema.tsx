// Library and Component imports
import { useState, useEffect } from 'react';
import { SchemeFunctions } from '../Classes/SchemeFunctions';
import { useNavigate } from 'react-router-dom';
import { setVol } from '../Classes/AudioFunctions';
import ColorSelector from '../components/ColorSelector';

// CSS imports
import '../css/GeneralStylings.css';
import '../css/AddEditScheme.css';

// For file I/O (Electron app only)
const fs = window.require('fs');
const path = window.require('path');

type Scheme = {
	name: string,
	notes: string[]
}

export default function AddSchema() {
  const navigate = useNavigate();

  // Volume set on a 0-100 scale
  const [volume, setVolume] = useState(50);
  useEffect(() => {
    setVol(volume);
  }, [volume]);

  // Store name and any associated error messages
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Store hex-color values for all 12 notes
  const [C, setC] = useState('#000000');
  const [Db, setDb] = useState('#000000');
  const [D, setD] = useState('#000000');
  const [Eb, setEb] = useState('#000000');
  const [E, setE] = useState('#000000');
  const [F, setF] = useState('#000000');
  const [Gb, setGb] = useState('#000000');
  const [G, setG] = useState('#000000');
  const [Ab, setAb] = useState('#000000');
  const [A, setA] = useState('#000000');
  const [Bb, setBb] = useState('#000000');
  const [B, setB] = useState('#000000');

  // // Changes the volume
  // const handleVolume = (e): void => {
  //   let volumeVal: number = parseInt(e.target.value);
  //   setVolume(volumeVal);   // In AddSchema.tsx
  //   setVol(volumeVal);      // In AudioFunctions.tsx
  // }

  // Add this color scheme if no errors exist
  const handleSubmit = (): void => {
    let schemes: Scheme[] = SchemeFunctions.getSchemes();

    // Error-handling to prevent special characters
    if (!name.match(/^[0-9a-zA-Z]+$/)) {
      setError('Please only use alphanumeric characters (a-Z and 0-9)');
      return;
    }

    // Error-handling to prevent duplicate names
    for (let i = 0; i < schemes.length; i++) {
      if (schemes[i].name === name) {
        setError('Sorry! A color-scheme with that name already exists');
        return;
      }
    }

    // Reset any error messages
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

    // Saves new scheme into file AND into schemes array
    let schemeObj = {name: name, notes: noteArray};
    let filePath = path.join(SchemeFunctions.getPathToUserSchemes(), schemeObj.name + '.json');
    fs.writeFileSync(filePath, JSON.stringify(schemeObj));
    SchemeFunctions.addScheme(schemeObj);
    navigate('/');
  }

  return (
    <div className='background'>
      <span className='title'>Add Scheme</span>
      <span className='subtitle'>Create your color profile</span> <br /> <br />

      <label className='input-label'>Scheme Name</label>
      <input type="text" className='input-field'
        required autoFocus
        value = {name} onChange = {(e) => setName(e.target.value.trim())} />
      <span>{error}</span> <br />

      <label className='input-label'>Volume Slider</label>
      <div className='input-field'>
        <input type="range" id='volume-slider'
          value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} />
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

      <button type='button' className='button' onClick={handleSubmit}>Add Scheme</button>
      <button type="button" className='button' onClick={() => {navigate('/')}}>Cancel</button>
    </div>
  );
}
