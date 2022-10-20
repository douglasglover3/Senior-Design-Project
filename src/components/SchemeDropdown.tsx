import { ChangeEvent, useState, useEffect } from 'react';
import { SchemeList } from '../Classes/SchemeList';

type Scheme = {
	name: string,
	notes: string[]
}


export default function SchemeDropdown(props) {
	let schemes = SchemeList.getSchemes();

	let ind = 0;

	const _12Tones = { Ab: 0, A: 1, Bb: 2, B: 3, C: 4, Db: 5, D: 6, Eb: 7, E: 8, F: 9, Gb: 10, G: 11 };

	let [selectedScheme, setSelectedScheme] = useState(schemes[0]);

    // Set <currScheme> for both <SchemeDropdown /> and <MainWindow />
    const handleSchemeChange = (e): void => {
        let index: number = parseInt((e.target as HTMLSelectElement).value);
        setSelectedScheme(schemes[index]);
    }
	useEffect(() => {
		props.setSchemeInMain(selectedScheme);
	}, [selectedScheme]);

	const handleDelete = (e): void => {
		let confirmDelete = window.confirm('Are you sure you want to delete this scheme?');
		if (confirmDelete)
			SchemeList.deleteScheme(selectedScheme.name);
		else
			return;
	}

    return(
        <div>
            <select onChange={ handleSchemeChange }>
				{schemes.map((scheme: Scheme) => <option key={ ind } value={ ind++ }>{ scheme.name }</option>)}
			</select>

			{/* Displays the main colors used for the selected color-scheme */}
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div id='A-color' style={{ width: 20, height: 20, background: selectedScheme.notes[_12Tones.A] }} />
				<div id='B-color' style={{ width: 20, height: 20, background: selectedScheme.notes[_12Tones.B] }} />
				<div id='C-color' style={{ width: 20, height: 20, background: selectedScheme.notes[_12Tones.C] }} />
				<div id='D-color' style={{ width: 20, height: 20, background: selectedScheme.notes[_12Tones.D] }} />
				<div id='E-color' style={{ width: 20, height: 20, background: selectedScheme.notes[_12Tones.E] }} />
				<div id='F-color' style={{ width: 20, height: 20, background: selectedScheme.notes[_12Tones.F] }} />
				<div id='G-color' style={{ width: 20, height: 20, background: selectedScheme.notes[_12Tones.G] }} />
			</div>

			<button type="button" onClick={ handleDelete }>Delete Scheme</button>
        </div>
    );
}