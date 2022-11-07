import { textChangeRangeIsUnchanged } from "typescript";
import { color_canvas } from "../Classes/ColorDisplay"

const display_threshold = 30

export class DisplayManager {
	layers: color_canvas[];
	counters: number[];
	tonality: number
	display_flag = false

	constructor(tonality:number) {
		document.getElementById('canvas_space').replaceChildren()

		this.layers = new Array()
		this.counters = new Array()
		this.tonality = tonality

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
	check_status() {
		let res = false
		for(let i = 0; i < this.tonality; i++)
		{
			if(this.layers[i].status == true || this.layers[i].fade_sem != 0) {
				res = true
			}
			
		}
		return res
	}
	display(note:number, octave:number) {
		if(note == NaN || octave == NaN) {
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
					if(this.layers[i].status == true && this.layers[i].fade_sem == 0) {
						console.log("REMOVING COLOR - ", i)
						this.layers[i].fade_out()
						this.display_flag = false
					}
					
				}
			}
			if(this.counters[note] >= display_threshold) {
				this.counters[note] = display_threshold
				if(this.check_status() == false && this.layers[note].status == false){
					console.log("DISPLAYING COLOR - " , note, " ", octave)
					this.layers[note].draw_new(octave)
					this.display_flag = true
				}
				
			}
			//console.log(note, this.counters[note], this.display_flag)
			//console.log(this.display_flag, this.counters)
		}
		

		
	}
}
