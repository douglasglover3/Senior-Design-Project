import { textChangeRangeIsUnchanged } from "typescript";
import { color_canvas } from "../Classes/ColorDisplay";
import { EDOSystem } from "../Classes/EDOSystem";

const display_threshold = 5

// TODO: Replace with extensible EDO system
let edo = new EDOSystem(12);

export class DisplayManager {
	layers: color_canvas[];
	counters: number[];
	tonality: number;
	display_flag = false;
	currNote: number;

	constructor(tonality:number) {
		document.getElementById('canvas_space').replaceChildren()

		this.layers = new Array()
		this.counters = new Array()
		this.tonality = tonality
		this.currNote = -1;		// No note played before it

		for (let i = 0; i < tonality; i++) {
			this.layers[i] = new color_canvas('c' + i, '#000000')
			this.counters[i] = 0
		}

	}

	change_scheme(new_scheme) {
		for(let i = 0; i < this.tonality; i++) {
			this.layers[i].update_color(new_scheme.notes[i]) 
		}
	}

	check_all_inactive() {
		let res = true
		for(let i = 0; i < this.tonality; i++)
		{
			if(!this.layers[i].check_inactive()) {
				res = false
			}
			
		}
		return res
	}

	display(note:number, octave:number) {
		if(isNaN(note) || isNaN(octave)) {
			return
		}
		else {
			this.counters[note] += 1
			for(let i = 0; i < this.tonality; i++) {
				if (i != note) {
					this.counters[i] -= 1
				}
				if (this.counters[i] <= 0) {
					this.counters[i] = 0
					if(this.layers[i].check_active_idle()) {
						this.layers[i].fade_out()
					}
					
				}
			}
			if(this.counters[note] >= display_threshold) {
				this.counters[note] = display_threshold
				if(this.check_all_inactive()) {
					let intervalColor = edo.getInterval(this.currNote, note);
					this.layers[note].draw_new(octave, intervalColor);
					this.currNote = note;
				}
				
			}
		}
	}
}
