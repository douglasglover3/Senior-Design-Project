import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SchemeFunctions } from '../Classes/SchemeFunctions';
import { EDOSystem } from '../Classes/EDOSystem';

const { ipcRenderer } = window.require('electron');

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
		navigate('/AddSchema');
	}

	const handleDelete = (): void => {
		// Don't let user delete default schemes
		if (SchemeFunctions.isInDefaultSchemes(selectedScheme)) {
			setMessage('Sorry! Can\'t delete default schemes');
			return;
		}

		let confirmDelete = window.confirm('Are you sure you want to delete this scheme?');
		if (confirmDelete) {
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
			<div className='subsection'>
				<div className='color-block' style={{backgroundColor:selectedScheme.notes[toneList.C]}} />
				<div className='color-block' style={{backgroundColor:selectedScheme.notes[toneList.D]}} />
				<div className='color-block' style={{backgroundColor:selectedScheme.notes[toneList.E]}} />
				<div className='color-block' style={{backgroundColor:selectedScheme.notes[toneList.F]}} />
				<div className='color-block' style={{backgroundColor:selectedScheme.notes[toneList.G]}} />
				<div className='color-block' style={{backgroundColor:selectedScheme.notes[toneList.A]}} />
				<div className='color-block' style={{backgroundColor:selectedScheme.notes[toneList.B]}} />
			</div>
			<div className='subsection'>
				<span className='scheme-message'>{message}</span>
			</div>
        </div>
    );
}
