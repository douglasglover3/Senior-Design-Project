import { wait } from "@testing-library/user-event/dist/utils/index.js";
import Select from "react-select";
import Display_color from "../Classes/ColorDisplay.tsx"
import {useState} from 'react';

const fs = window.require('fs');
const path = window.require('path');

// Reads all color-schemes in 'folderPath/'
function readSchemesFromFolder(folderPath) {
	let schemes = [];

	let files = fs.readdirSync(folderPath);
	files.forEach((file) => {
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
const color_options =
  [
    { value: '#000000', label: "Black" },
    { value: '#808080', label: "Grey" },
    { value: '#ff0000', label: "Red" },
    { value: '#00ff00', label: "Green" },
    { value: '#0000ff', label: "Blue" },
    { value: '#55cc77', label: "Teal" },
    { value: '#800080', label: "Purple" }
  ]

// used to display the color splotch when selected in the dropdown, can be removed later
const handleChange = e => {
  let root = document.getElementById('root')
  console.log(Display_color(Math.random() * (50, 450) + 50, Math.random() * (150, 400) + 150, Math.random() * (10, 100) + 10, e.value))
}


export default function MainWindow() {
	let schemes = [];
	let ind = 0;

	// Get all Default Schemes
	const pathToDefaultSchemesFolder = path.join('src', 'schemes', 'default');
	schemes = schemes.concat(readSchemesFromFolder(pathToDefaultSchemesFolder));

	// Get all User-made schemes
	const pathToUserSchemesFolder = path.join('src', 'schemes');
	schemes = schemes.concat(readSchemesFromFolder(pathToUserSchemesFolder));

	let [currScheme, setScheme] = useState(() => {
		if (schemes.length > 0)
			return schemes[0];
		else
			return '';
	});

	console.log(currScheme);

  return (
    <div>
      <p>Main Window</p>
		<select onChange={(e) => setScheme(schemes[e.target.value])}>
			{schemes.map((scheme) => <option key={ind} value={ind++}>{scheme.name}</option>)}
		</select>

      <br />
      {Display_color(Math.random() * (50, 450) + 50, Math.random() * (150, 400) + 150, Math.random() * (10, 100) + 10, '#55cc77')}
    </div>
  );
}
