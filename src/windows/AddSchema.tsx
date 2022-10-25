import { FormEvent, useState } from 'react';
import { SchemeFunctions } from '../Classes/SchemeFunctions';

const fs = window.require('fs');
const path = window.require('path');

export default function AddSchema() {

  function playNote(note: string) {
    const file = require("../musical_notes/Piano_" + note + ".mp3");
    const audio = new Audio(file);
    audio.volume = (volume / 100);    // audio.volume in the range of [0, 1]
    audio.play();
  }

  // Variables used in form
  const [volume, setVolume] = useState(50);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [Ab, setAb] = useState('#000000');
  const [A, setA] = useState('#000000');
  const [Bb, setBb] = useState('#000000');
  const [B, setB] = useState('#000000');
  const [C, setC] = useState('#000000');
  const [Db, setDb] = useState('#000000');
  const [D, setD] = useState('#000000');
  const [Eb, setEb] = useState('#000000');
  const [E, setE] = useState('#000000');
  const [F, setF] = useState('#000000');
  const [Gb, setGb] = useState('#000000');
  const [G, setG] = useState('#000000');

  const handleSubmit = (e: FormEvent) => {
	  e.preventDefault();
    let schemes = SchemeFunctions.getSchemes();

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

    setError('');

    // Add hex code colors to <noteArray>
	  let noteArray: string[] = [];
	  noteArray.push(Ab);
	  noteArray.push(A);
	  noteArray.push(Bb);
	  noteArray.push(B);
	  noteArray.push(C);
	  noteArray.push(Db);
	  noteArray.push(D);
	  noteArray.push(Eb);
	  noteArray.push(E);
	  noteArray.push(F);
	  noteArray.push(Gb);
	  noteArray.push(G);

	  // Saves new scheme into file AND into schemes array
	  let schemeObj = {name: name, notes: noteArray};
	  let filePath = path.join('src', 'schemes', schemeObj.name + '.json');
	  fs.writeFileSync(filePath, JSON.stringify(schemeObj));
    SchemeFunctions.addScheme(schemeObj);
	  window.location.href = '/';
  }

  return (
    <div>
      <span>Add New Color Scheme</span> <br /> <br />

      <span>Volume Slider</span>
      <input type="range" id='volume-slider'
          value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} /> <br /> <br />

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name Your Scheme: </label>
          <input type="text" id="name"
			        required autoFocus
			        value = {name} onChange = {(e) => setName(e.target.value.trim())}/>
        </div>
        <span>{error}</span> <br /> <br />

        <div>
          <label>Ab: </label>
          <input type="color" id="Ab"
              value = {Ab} onChange = {(e) => setAb(e.target.value)}/>
          <button type="button" onClick={() => playNote("Ab3")}>Try Me!</button>
        </div>

        <div>
          <label>A: </label>
          <input type="color" id="A"
			        value = {A} onChange = {(e) => setA(e.target.value)}/>
          <button type="button" onClick={() => playNote("A3")}>Try Me!</button>
        </div>

        <div>
          <label>Bb: </label>
          <input type="color" id="Bb"
              value = {Bb} onChange = {(e) => setBb(e.target.value)}/>
          <button type="button" onClick={() => playNote("Bb3")}>Try Me!</button>
        </div>

        <div>
          <label>B: </label>
          <input type="color" id="B"
			        value = {B} onChange = {(e) => setB(e.target.value)}/>
          <button type="button" onClick={() => playNote("B3")}>Try Me!</button>
        </div>

        <div>
          <label>C: </label>
          <input type="color" id="C"
			        value = {C} onChange = {(e) => setC(e.target.value)}/>
          <button type="button" onClick={() => playNote("C4")}>Try Me!</button>
        </div>

        <div>
          <label>Db: </label>
          <input type="color" id="Db"
              value = {Db} onChange = {(e) => setDb(e.target.value)}/>
          <button type="button" onClick={() => playNote("Db4")}>Try Me!</button>
        </div>

        <div>
          <label>D: </label>
          <input type="color" id="D"
			        value = {D} onChange = {(e) => setD(e.target.value)}/>
          <button type="button" onClick={() => playNote("D4")}>Try Me!</button>
        </div>

        <div>
          <label>Eb: </label>
          <input type="color" id="Eb"
              value = {Eb} onChange = {(e) => setEb(e.target.value)}/>
          <button type="button" onClick={() => playNote("Eb4")}>Try Me!</button>
        </div>

        <div>
          <label>E: </label>
          <input type="color" id="E"
			        value = {E} onChange = {(e) => setE(e.target.value)}/>
          <button type="button" onClick={() => playNote("E4")}>Try Me!</button>
        </div>

        <div>
          <label>F: </label>
          <input type="color" id="F"
			        value = {F} onChange = {(e) => setF(e.target.value)}/>
          <button type="button" onClick={() => playNote("F4")}>Try Me!</button>
        </div>

        <div>
          <label>Gb: </label>
          <input type="color" id="Gb"
              value = {Gb} onChange = {(e) => setGb(e.target.value)}/>
          <button type="button" onClick={() => playNote("Gb4")}>Try Me!</button>
        </div>

        <div>
          <label>G: </label>
          <input type="color" id="G"
			        value = {G} onChange = {(e) => setG(e.target.value)}/>
          <button type="button" onClick={() => playNote("G4")}>Try Me!</button>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
