import { wait } from "@testing-library/user-event/dist/utils/index.js";
import Select from "react-select";
import { color_canvas } from "../Classes/ColorDisplay"
import { ChangeEvent, FormEvent, useState } from 'react';
import SchemeDropdown from "../components/SchemeDropdown";

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
// create an array of canvas elements to draw one (1 shape per canvas)
const max_colors = 7
let color_layers = new Array()
for (let i = 0; i < max_colors; i++) {
	color_layers[i] = new color_canvas('c' + i)
}

// function to draw the shapes of all canvas elements, can be removed later
function draw_colors() {
	for (let i = 0; i < max_colors; i++) {
		color_layers[i].draw(options[i].value)
	}
}

export default function MainWindow() {
	return (
		<div>
			<p>Main Window</p>

			<SchemeDropdown />

			<br />
			<div id="color_select">
				<button
					onClick={function () { draw_colors() }}
				>Draw Colors</button>
			</div>
		</div>
	);
}
