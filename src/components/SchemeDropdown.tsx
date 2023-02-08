// Library and Component imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SchemeFunctions } from '../Classes/SchemeFunctions';
import SchemePreview from '../components/SchemePreview';

// Electron import (for app use only)
const { ipcRenderer } = window.require('electron');

type Scheme = {
	name: string,
	notes: string[]
}

// Represents the list of color-schemes available to the user (both default and user-created)
export default function SchemeDropdown({ setSchemeInMain }) {
	const navigate = useNavigate();

	// Get the list of available schemes from the 'schemes/' folder
	let schemes: Scheme[] = SchemeFunctions.getSchemes();
	let ind: number = 0;

	let [selectedScheme, setSelectedScheme] = useState(schemes[0]);
	let [message, setMessage] = useState('');

    // Set <currScheme> for both <SchemeDropdown /> and <MainWindow />
    const handleSchemeChange = (e): void => {
        let index: number = parseInt(e.target.value);
        setSelectedScheme(schemes[index]);

		// Reset any error messages
		setMessage('');
    }
	useEffect(() => {
		setSchemeInMain(selectedScheme);
	}, [selectedScheme, setSchemeInMain]);

	// Switch over to <AddSchema /> Window
	const addScheme = (): void => {
		navigate('/AddSchema');
	}

	// Try and delete the selected color-scheme
	const handleDelete = (): void => {
		// Don't let user delete default schemes
		if (SchemeFunctions.isInDefaultSchemes(selectedScheme)) {
			setMessage('Sorry! Can\'t delete default schemes');
			return;
		}

		// Allow user to confirm their decision
		let confirmDelete = window.confirm('Are you sure you want to delete this scheme?');
		if (confirmDelete) {
			SchemeFunctions.deleteScheme(selectedScheme);
			setMessage('Scheme was successfully deleted');
			setSelectedScheme(schemes[0]);
		}
	}

	// Try and edit the selected color-scheme
	const handleEdit = (): void => {
		// Don't let user edit default schemes
		if (SchemeFunctions.isInDefaultSchemes(selectedScheme)) {
			setMessage('Sorry! Can\'t edit default schemes');
			return;
		}

		// Go to <EditSchema /> Window with information about selected scheme
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
			<div className='subsection'>
				<select className='select-box' onChange={ handleSchemeChange }>
					{schemes.map((scheme: Scheme) => <option key={ ind } value={ ind++ }>{ scheme.name }</option>)}
				</select>
				<button type="button" className='button' onClick={ addScheme }>+</button>
			</div>
			<div className='subsection'>
				<button type="button" className='button' onClick={ handleEdit }>Edit Scheme</button>
				<button type="button" className='button' onClick={ handleDelete }>Delete Scheme</button>
			</div>
			<SchemePreview scheme={selectedScheme} />
			<div className='subsection'>
				<span className='scheme-message'>{message}</span>
			</div>
        </div>
    );
}
