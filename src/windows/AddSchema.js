import {useState} from 'react';
import A3 from "../musical_notes/Piano_A3.mp3"
import B3 from "../musical_notes/Piano_B3.mp3"
import C4 from "../musical_notes/Piano_C4.mp3"
import D4 from "../musical_notes/Piano_D4.mp3"
import E4 from "../musical_notes/Piano_E4.mp3"
import F4 from "../musical_notes/Piano_F4.mp3"
import G4 from "../musical_notes/Piano_G4.mp3"

export default function AddSchema() {

  function playNote(note) {
    const file = require("../musical_notes/Piano_" + note + ".mp3")
    const audio = new Audio(file)
    audio.play()
  }

  // Holds variable information from form
  const [name, setName] = useState('');
  const [A, setA] = useState('#000000');
  const [B, setB] = useState('#000000');
  const [C, setC] = useState('#000000');
  const [D, setD] = useState('#000000');
  const [E, setE] = useState('#000000');
  const [F, setF] = useState('#000000');
  const [G, setG] = useState('#000000');

  // Handles submit request
  const handleSubmit = (e) => {
	  e.preventDefault();
	  let noteArray = [];
	  noteArray.push({A});
	  noteArray.push({B});
	  noteArray.push({C});
	  noteArray.push({D});
	  noteArray.push({E});
	  noteArray.push({F});
	  noteArray.push({G});

	  // Saves form info into JS object and closes window
	  let schemeObj = {name: name, notes: noteArray};
	  let jsonPayload = JSON.stringify(schemeObj);
	  // TODO: Save <schemeObj> somewhere within application
	  console.log(schemeObj);
	  console.log(jsonPayload);
	  // window.close();
  }

  return (
    <div>
      <span>Add New Color Scheme</span> <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name Your Scheme: </label>
          <input type="text" id="name"
			 required autoFocus
			 value = {name} onChange = {(e) => setName(e.target.value)}/>
        </div>
        <div>
          <label>A: </label>
          <input type="color" id="A"
			 value = {A} onChange = {(e) => setA(e.target.value)}/>
          <button type="button" onClick={() => playNote("A3")}>Try Me!</button>
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
          <label>D: </label>
          <input type="color" id="D"
			 value = {D} onChange = {(e) => setD(e.target.value)}/>
          <button type="button" onClick={() => playNote("D4")}>Try Me!</button>
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
