
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

  return (
    <div>
      <span>Add New Color Scheme</span> <br />
      <form>
        <div>
          <label>Name Your Scheme: </label>
          <input type="text" id="name" autoFocus />
        </div>
        <div>
          <label>A: </label>
          <input type="color" id="A" />
          <button type="button" onClick={() => playNote("A3")}>Try Me!</button>
        </div>
        <div>
          <label>B: </label>
          <input type="color" id="B" />
          <button type="button" onClick={() => playNote("B3")}>Try Me!</button>
        </div>
        <div>
          <label>C: </label>
          <input type="color" id="C" />
          <button type="button" onClick={() => playNote("C4")}>Try Me!</button>
        </div>
        <div>
          <label>D: </label>
          <input type="color" id="D" />
          <button type="button" onClick={() => playNote("D4")}>Try Me!</button>
        </div>
        <div>
          <label>E: </label>
          <input type="color" id="E" />
          <button type="button" onClick={() => playNote("E4")}>Try Me!</button>
        </div>
        <div>
          <label>F: </label>
          <input type="color" id="F" />
          <button type="button" onClick={() => playNote("F4")}>Try Me!</button>
        </div>
        <div>
          <label>G: </label>
          <input type="color" id="G" />
          <button type="button" onClick={() => playNote("G4")}>Try Me!</button>
        </div>
        <button type="submit">Add Color Scheme</button>
      </form>
    </div>
  );
}
