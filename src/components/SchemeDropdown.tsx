// Library and Component imports
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SchemeFunctions } from '../Classes/SchemeFunctions';
import SchemePreview from '../components/SchemePreview';

// For handling delete-confirmation
const { dialog } = window.require('electron').remote;
let options = {
	buttons: ["Yes", "No"],
	message: "Do you really want to delete this scheme?"
};

type Scheme = {
	name: string,
	notes: string[]
}

// Represents the list of color-schemes available to the user (both default and user-created)
export default function SchemeDropdown({ setSchemeInMain }) {
	const navigate = useNavigate();
	const location = useLocation();

	// Get the list of available schemes from the 'schemes/' folder
	let schemes: Scheme[] = SchemeFunctions.getSchemes();

	const [selectedScheme, setSelectedScheme] = useState(() => {
		// If just opening up/reloading app, default to first scheme
		if (location.state === null)
			return schemes[0];
		// Default to scheme that was just added/edited
		else {
			let schemeName = location.state.scheme.name;
			window.history.replaceState({}, document.title);
			return schemes.find(scheme => scheme.name === schemeName);
		}
	});
	const [message, setMessage] = useState('');

    // Set <currScheme> for both <SchemeDropdown /> and <MainWindow />
    const handleSchemeChange = (e): void => {
		let schemeName: string = e.target.value;
        setSelectedScheme(schemes.find(scheme => scheme.name === schemeName));

		// Reset any error messages
		setMessage('');
    }
	useEffect(() => {
		setSchemeInMain(selectedScheme);
	}, [selectedScheme, setSchemeInMain]);

	// Switch over to <AddSchema /> Window
	const addScheme = (): void => {
		navigate('/addSchema');
	}

	// Try and delete the selected color-scheme
	const handleDelete = (): void => {
		// Don't let user delete default schemes
		if (SchemeFunctions.isInDefaultSchemes(selectedScheme)) {
			setMessage('Sorry! Can\'t delete default schemes');
			return;
		}

		// Get user's option (0 for YES, 1 for NO)
		let confirmDelete = dialog.showMessageBoxSync(options);
		if (confirmDelete === 0) {
			// Deletes <selectedScheme> from <schemes> and 'schemes/' folder
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

		navigate('/editSchema', {state:{scheme: selectedScheme}});
	}

    return(
        <div>
			<div className='subsection'>
				<select className='select-box' onChange={ handleSchemeChange }>
					{schemes.map((scheme: Scheme) => <option key={ scheme.name }>{ scheme.name }</option>)}
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
