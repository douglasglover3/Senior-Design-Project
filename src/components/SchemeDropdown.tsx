import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SchemeFunctions } from '../Classes/SchemeFunctions';
import { EDOSystem } from '../Classes/EDOSystem';

const scheme_item = {
	marginRight : '5px',
	marginTop : '5px',
	marginBottom: '5px',
	marginLeft : '5px',
	borderWidth: '2px',
	borderRadius: '5px',
	boarderColor: 'black'
}

const color_square = {
	marginRight : '5px',
	marginTop : '5px',
	marginBottom: '5px',
	marginLeft : '5px',
	width: '20xp',
	height: '20px',
	borderWidth: '2px',
	borderRadius: '5px',
	boarderColor: 'black',
	background: 'white'
}

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

	const addScheme = (e): void => {
		navigate('/AddSchema');
	}

	const handleDelete = (e): void => {
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

	const handleEdit = (e): void => {
		// Don't let user edit default schemes
		if (SchemeFunctions.isInDefaultSchemes(selectedScheme)) {
			setEditMessage('Sorry! Can\'t edit default schemes');
			return;
		}

		navigate('/EditSchema', {state:{scheme: selectedScheme}});
	}

    return(
        <div>
            <select style={scheme_item} onChange={ handleSchemeChange }>
				{schemes.map((scheme: Scheme) => <option key={ ind } value={ ind++ }>{ scheme.name }</option>)}
			</select>
			<button style={scheme_item} type="button" onClick={ addScheme }>+</button>


			<div>
			<button style={scheme_item} type="button" onClick={ handleEdit }>Edit Scheme</button>
			<button style={scheme_item} type="button" onClick={ handleDelete }>Delete Scheme</button>
			</div>
			<div>
				<span>{editMessage}</span>
				<br/>
				<span>{deleteMessage}</span>
			</div>
        </div>
    );
}
