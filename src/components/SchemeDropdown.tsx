import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SchemeFunctions } from '../Classes/SchemeFunctions';
import { EDOSystem } from '../Classes/EDOSystem';
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

export default function SchemeDropdown({ setSchemeInMain }) {
	let _12tEDO = new EDOSystem(12);
	let schemes = SchemeFunctions.getSchemes();
	let toneList = _12tEDO.getToneList();
	let ind = 0;

	const navigate = useNavigate();

	let [selectedScheme, setSelectedScheme] = useState(schemes[0]);
	let [message, setMessage] = useState('');

    // Set <currScheme> for both <SchemeDropdown /> and <MainWindow />
    const handleSchemeChange = (e): void => {
        let index: number = parseInt((e.target as HTMLSelectElement).value);
        setSelectedScheme(schemes[index]);

		// Reset any error messages
		setMessage('');
    }
	useEffect(() => {
		setSchemeInMain(selectedScheme);
	}, [selectedScheme]);

	const addScheme = (): void => {
		navigate('/addSchema');
	}

	const handleDelete = (): void => {
		// Don't let user delete default schemes
		if (SchemeFunctions.isInDefaultSchemes(selectedScheme)) {
			setMessage('Sorry! Can\'t delete default schemes');
			return;
		}

		// let confirmDelete = window.confirm('Are you sure you want to delete this scheme?');
		let confirmDelete = dialog.showMessageBoxSync(options);
		if (confirmDelete === 0) {
			SchemeFunctions.deleteScheme(selectedScheme);
			setMessage('Scheme was successfully deleted');
			setSelectedScheme(schemes[0]);
		}
	}

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
