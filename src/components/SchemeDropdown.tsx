import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SchemeFunctions } from '../Classes/SchemeFunctions';
import { EDOSystem } from '../Classes/EDOSystem';

const { ipcRenderer } = window.require('electron');

type Scheme = {
	name: string,
	notes: string[]
}

export default function SchemeDropdown(props) {
	let _12tEDO = new EDOSystem(12);
	let schemes = SchemeFunctions.getSchemes();
	let toneList = _12tEDO.getToneList();
	// const _12Tones = { Ab: 0, A: 1, Bb: 2, B: 3, C: 4, Db: 5, D: 6, Eb: 7, E: 8, F: 9, Gb: 10, G: 11 };
	let ind = 0;

	const navigate = useNavigate();

	let [selectedScheme, setSelectedScheme] = useState(schemes[0]);
	let [deleteMessage, setDeleteMessage] = useState('');
	let [editMessage, setEditMessage] = useState('');

    // Set <currScheme> for both <SchemeDropdown /> and <MainWindow />
    const handleSchemeChange = (e): void => {
        let index: number = parseInt((e.target as HTMLSelectElement).value);
        setSelectedScheme(schemes[index]);

		// Reset any error messages
		setDeleteMessage('');
		setEditMessage('');
    }
	useEffect(() => {
		props.setSchemeInMain(selectedScheme);
	}, [selectedScheme]);

	const addScheme = (): void => {
		navigate('/AddSchema');
	}

	const handleDelete = (): void => {
		// Don't let user delete default schemes
		if (SchemeFunctions.isInDefaultSchemes(selectedScheme)) {
			setDeleteMessage('Sorry! Can\'t delete default schemes');
			return;
		}

		let confirmDelete = window.confirm('Are you sure you want to delete this scheme?');
		if (confirmDelete) {
			SchemeFunctions.deleteScheme(selectedScheme);
			setDeleteMessage('Scheme was successfully deleted');
			setSelectedScheme(schemes[0]);
		}
	}

	const handleEdit = (): void => {
		// Don't let user edit default schemes
		if (SchemeFunctions.isInDefaultSchemes(selectedScheme)) {
			setEditMessage('Sorry! Can\'t edit default schemes');
			return;
		}

		navigate('/EditSchema', {state:{scheme: selectedScheme}});
	}

	// Handle file-menu commands for Electron App
	ipcRenderer.once('ADD_COLOR_SCHEME', function (evt) {
		if (window.location.pathname === '/')
			addScheme();
	});
	ipcRenderer.once('EDIT_COLOR_SCHEME', function (evt) {
		if (window.location.pathname === '/')
			handleEdit();
	});

    return(
        <div>
            <select onChange={ handleSchemeChange }>
				{schemes.map((scheme: Scheme) => <option key={ ind } value={ ind++ }>{ scheme.name }</option>)}
			</select>
			<button type="button" onClick={ addScheme }>+</button>

			{/* Displays the main colors used for the selected color-scheme */}
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div id='C-color' style={{ width: 20, height: 20, background: selectedScheme.notes[toneList.C] }} />
				<div id='D-color' style={{ width: 20, height: 20, background: selectedScheme.notes[toneList.D] }} />
				<div id='E-color' style={{ width: 20, height: 20, background: selectedScheme.notes[toneList.E] }} />
				<div id='F-color' style={{ width: 20, height: 20, background: selectedScheme.notes[toneList.F] }} />
				<div id='G-color' style={{ width: 20, height: 20, background: selectedScheme.notes[toneList.G] }} />
				<div id='A-color' style={{ width: 20, height: 20, background: selectedScheme.notes[toneList.A] }} />
				<div id='B-color' style={{ width: 20, height: 20, background: selectedScheme.notes[toneList.B] }} />
			</div>

			<div>
				<button type="button" onClick={ handleEdit }>Edit Scheme</button>
				<span>{editMessage}</span>
			</div>
			<div>
				<button type="button" onClick={ handleDelete }>Delete Scheme</button>
				<span>{deleteMessage}</span>
			</div>
        </div>
    );
}