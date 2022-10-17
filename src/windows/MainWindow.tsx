import { color_canvas } from "../Classes/ColorDisplay"
import { useState } from 'react';
import SchemeDropdown from "../components/SchemeDropdown";

type Scheme = {
	name: string,
	notes: string[]
}

// set of colors for testing purposes, can be removed later
const options =
	[
		{ value: '#000000', label: "Black" },
		{ value: '#808080', label: "Grey" },
		{ value: '#ff0000', label: "Red" },
		{ value: '#00ff00', label: "Green" },
		{ value: '#0000ff', label: "Blue" },
		{ value: '#55cc77', label: "Teal" },
		{ value: '#800080', label: "Purple" }
	]
// create an array of canvas elements to draw one (1 shape per canvas layer)
const max_colors = 12
let color_layers = new Array()
for (let i = 0; i < max_colors; i++) {
	color_layers[i] = new color_canvas('c' + i)
}

// function to draw the shapes of all canvas elements, can be removed later
function draw_colors(scheme) {
	for (let i = 0; i < max_colors; i++) {
		color_layers[i].create_new(scheme.notes[i])
		color_layers[i].fade_in()
	}
}
function clear_colors() {
	for (let i = 0; i < max_colors; i++) {
		color_layers[i].fade_out()
	}
}

export default function MainWindow() {
	let [scheme, setSchemeInMain] = useState({ name: "", notes: [""] });

	return (
		<div>
			<p>Main Window</p>

			<SchemeDropdown setSchemeInMain={setSchemeInMain} />

			<br />
			<div id="color_select">
				<button
					onClick={function () { draw_colors(scheme) }}
				>Draw Colors</button>
				<button
					onClick={function () { clear_colors() }}
				>Clear Colors</button>
			</div>
		</div>
	);
}
