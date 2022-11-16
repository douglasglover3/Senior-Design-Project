import { useState } from 'react';
import SchemeDropdown from "../components/SchemeDropdown";
import Plot from 'react-plotly.js';
import {Fourier} from "../Classes/FourierTransform"
import MicInput from "../components/MicInput";
import {EDOSystem} from "../Classes/EDOSystem";
import {DisplayManager} from "../Classes/DisplayManager"





export default function MainWindow() {
	let new_div = document.createElement('div')

	new_div.id = 'canvas_space'
	new_div.setAttribute('style', "position: relative")
	let root = document.getElementById('root')
	root.appendChild(new_div)

	let fourier = new Fourier();
    let edo = new EDOSystem(12);
	let display_manager = new DisplayManager(12);

	let canvas = document.createElement("canvas")
	canvas.width = 370
	canvas.height = 50
	const ele = document.getElementById('wave_display')
    if (ele != null) {
		while (ele.firstChild) {
			ele.removeChild(ele.firstChild);
		}
      ele.append(canvas)

    }

	let [scheme, setSchemeInMain] = useState({ name: "", notes: [""] });
	let [inputX, setInputX] = useState([])
  	let [inputY, setInputY] = useState([])
	display_manager.change_scheme(scheme)

	let time = 0
	let cnt = 0

	function OnDraw()
    {
        time = time + 0.05;
        var dataLine = canvas.getContext("2d");

        dataLine.clearRect(0, 0, canvas.width, canvas.height);

        dataLine.beginPath();

        for(cnt = -1; cnt <= canvas.width; cnt++)
        {
            dataLine.lineTo(cnt, canvas.height * 0.5 - (Math.random() * 2 + Math.cos(time + cnt * 0.05) * ((canvas.height / 2)-10) ));
        }

        dataLine.lineWidth = 1;
        dataLine.strokeStyle = "black";
        dataLine.stroke();
    }

	function readMicData(data) {
		setTimeout(OnDraw, 250);
		//makes data into two arrays, x and y
		let inputData = fourier.normalizeData(data);
		//transforms data into frequency domain using fourier transform
		let outputData = fourier.applyTransform(inputData);
		//attempts to get top five frequencies from transformed data
		let frequencies = fourier.getFrequencies(outputData, 5)
		let estimate = edo.frequencyToNote(frequencies[0])
		//console.log(`Estimated note: Note=${estimate.note} Octave=${estimate.octave}`);
		display_manager.display(estimate.note, estimate.octave)
	  }

	return (
		<div>
			<div id='header'>
				<h1 style={{textAlign:'center', margin:'20px'}}>Synethize</h1>
				<h2 style={{textAlign:'center'}}>A Sound to Color Application</h2>
			</div>
			<div id = 'controls' style={{ display: 'flex', flexDirection: 'row', gap:'1rem'}}>
				<div id='scheme_control' style={{flex:'1'}}>
					<h3 style={{textAlign:'center', marginTop:'0px', marginBottom:'10px'}}>Color Scheme</h3>
					<SchemeDropdown setSchemeInMain={setSchemeInMain} />
				</div>
				<div id = 'separator' style = {{border: '1px solid black'}}></div>
				<div id='mic_controls' style={{flex:'1'}}>
				<h3 style={{textAlign:'center', marginTop:'0px', marginBottom:'10px'}}>Mic Controls</h3>
					<div id = 'mic_control' style = {{width: "45px"}}>
						<div className='mic_input'>
							<MicInput transformData={readMicData}/>
						</div>
						<div id = 'mic_plot'>
						</div>
				</div>
			</div>
			</div>
			
		</div>
	);
}
