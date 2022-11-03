import { color_canvas } from "../Classes/ColorDisplay"
import { useState } from 'react';
import SchemeDropdown from "../components/SchemeDropdown";

type Scheme = {
	name: string,
	notes: string[]
}

// create an array of canvas elements to draw one (1 shape per canvas layer)
const max_colors = 12
document.getElementById('canvas_space').replaceChildren()
let color_layers = new Array()
for (let i = 0; i < max_colors; i++) {
	color_layers[i] = new color_canvas('c' + i)
}

// function to draw the shapes of all canvas elements, can be removed later
function draw_colors(scheme, octive) {
	for (let i = 0; i < max_colors; i++) {
		color_layers[i].draw_new(scheme.notes[i], octive)
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
					onClick={function () { draw_colors(scheme, 0) }} // will need to pass proper octive here in place of the '0'
				>Draw Colors</button>
				<button
					onClick={function () { clear_colors() }}
				>Clear Colors</button>
			</div>
		</div>
	);
}
