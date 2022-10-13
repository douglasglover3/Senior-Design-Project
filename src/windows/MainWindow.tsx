import { wait } from "@testing-library/user-event/dist/utils/index.js";
import Select from "react-select";
import {initCanvas, circle} from "../Classes/ColorDisplay"
import {ChangeEvent, FormEvent, useState} from 'react';

const fs = window.require('fs');
const path = window.require('path');

type Scheme = {
  name: string,
  notes: Array<string>
}

// Reads all color-schemes in 'folderPath/'
function readSchemesFromFolder(folderPath: string) {
	let schemes: Array<Scheme> = [];

	let files = fs.readdirSync(folderPath);
	files.forEach((file: string) => {
		if (file.slice(-5) === '.json') {
			let filePath = path.join(folderPath, file);
			let data = fs.readFileSync(filePath,
				{encoding: 'utf8',
				flag: 'r'});

			// Format each JSON file into a 2-array of <name> and <notes>
			schemes.push(JSON.parse(data));
		}
	});

	return schemes;
}

// set of colors for testing purposes, can be removed later
const options =
  [
    { value: '#000000', label: "Black" },
    { value: '#808080', label: "Grey" },
    { value: '#ff0000', label: "Red" },
    { value: '#00ff00', label: "Green" },
    { value: '#0000ff', label: "Blue" },
    { value: '#55cc77', label: "Teal" },
    { value: '#800080', label: "Purple" }
  ]
export default function MainWindow() {
	let schemes: Array<Scheme> = [];
	let ind = 0;

  initCanvas();

	// Get all Default Schemes
	const pathToDefaultSchemesFolder = path.join('src', 'schemes', 'default');
	schemes = schemes.concat(readSchemesFromFolder(pathToDefaultSchemesFolder));

	// Get all User-made schemes
	const pathToUserSchemesFolder = path.join('src', 'schemes');
	schemes = schemes.concat(readSchemesFromFolder(pathToUserSchemesFolder));

  const _12Tones = {Ab:0, A:1, Bb:2, B:3, C:4, Db:5, D:6, Eb:7, E:8, F:9, Gb:10, G:11};
	let [currScheme, setScheme] = useState(schemes[0]);

	console.log(currScheme);


  return (
    <div>
      <p>Main Window</p>
		  <select onChange={(e: ChangeEvent) => setScheme(schemes[parseInt((e.target as HTMLSelectElement).value)])}>
			  {schemes.map((scheme: Scheme) => <option key={ind} value={ind++}>{scheme.name}</option>)}
		  </select>

      {/* Displays the main colors used for the selected color-scheme */}
      <div style={{display:'flex', flexDirection:'row'}}>
        <div id='A-color' style={{width:20, height:20, background:currScheme.notes[_12Tones.A]}} />
        <div id='B-color' style={{width:20, height:20, background:currScheme.notes[_12Tones.B]}} />
        <div id='C-color' style={{width:20, height:20, background:currScheme.notes[_12Tones.C]}} />
        <div id='D-color' style={{width:20, height:20, background:currScheme.notes[_12Tones.D]}} />
        <div id='E-color' style={{width:20, height:20, background:currScheme.notes[_12Tones.E]}} />
        <div id='F-color' style={{width:20, height:20, background:currScheme.notes[_12Tones.F]}} />
        <div id='G-color' style={{width:20, height:20, background:currScheme.notes[_12Tones.G]}} />
      </div>

      <br />
      <br />

      {/* dropdown for testing the color display, can be removed later */}
      <div id="color_select">
        <Select
          defaultValue={options[0]}
          options={options}
          onChange={function(e:any) {new circle(e.value)}}
        />
      </div>
    </div>
  );
}
