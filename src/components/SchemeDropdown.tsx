import { useState } from 'react';

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
				{
					encoding: 'utf8',
					flag: 'r'
				});

			// Format each JSON file into a 2-array of <name> and <notes>
			schemes.push(JSON.parse(data));
		}
	});

	return schemes;
}

export default function SchemeDropdown() {
    let schemes: Array<Scheme> = [];
	let ind = 0;

	// Get all Default Schemes
	const pathToDefaultSchemesFolder = path.join('src', 'schemes', 'default');
	schemes = schemes.concat(readSchemesFromFolder(pathToDefaultSchemesFolder));

	// Get all User-made schemes
	const pathToUserSchemesFolder = path.join('src', 'schemes');
	schemes = schemes.concat(readSchemesFromFolder(pathToUserSchemesFolder));

	const _12Tones = { Ab: 0, A: 1, Bb: 2, B: 3, C: 4, Db: 5, D: 6, Eb: 7, E: 8, F: 9, Gb: 10, G: 11 };
	let [currScheme, setScheme] = useState(schemes[0]);

    return(
        <div>
            <select onChange={(e) => setScheme(schemes[parseInt((e.target as HTMLSelectElement).value)])}>
				{schemes.map((scheme: Scheme) => <option key={ind} value={ind++}>{scheme.name}</option>)}
			</select>

			{/* Displays the main colors used for the selected color-scheme */}
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div id='A-color' style={{ width: 20, height: 20, background: currScheme.notes[_12Tones.A] }} />
				<div id='B-color' style={{ width: 20, height: 20, background: currScheme.notes[_12Tones.B] }} />
				<div id='C-color' style={{ width: 20, height: 20, background: currScheme.notes[_12Tones.C] }} />
				<div id='D-color' style={{ width: 20, height: 20, background: currScheme.notes[_12Tones.D] }} />
				<div id='E-color' style={{ width: 20, height: 20, background: currScheme.notes[_12Tones.E] }} />
				<div id='F-color' style={{ width: 20, height: 20, background: currScheme.notes[_12Tones.F] }} />
				<div id='G-color' style={{ width: 20, height: 20, background: currScheme.notes[_12Tones.G] }} />
			</div>
        </div>
    );
}