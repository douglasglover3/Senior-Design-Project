import React from "react";
class ColorDisplay extends React.Component {
    name: string;
    style: string;
    constructor(x: number, y: number, size: number, color: string) {
        super("");
        this.name = x.toString() + y.toString() + color;
        this.style  =
            "background-color: " + color +
            " ;width: " + size + "px" +
            " ;height: " + size + "px" +
            " ;position: absolute" +
            " ;left: " + x + "px" +
            " ;top: " + y + "px" +
            " ;border-radius: " + size / 2 + "px" +
            " ;opacity: 1" +
            " ;box-shadow: 0px 0px 15px 5px " + color +
            " ;opacity: 1" +
            " ;transition: opacity 2s ease-in;"
            ;
    }

    // fade color splotch out | CURRENTLY NOT WORKING
    fade() {
        let div: HTMLElement | null = document.getElementById(this.name)
        if (div != null)
            div.style.opacity = '0'
    }
    // display color splotch | TRANISITION NOT WORKING
    display() {

        let new_div : HTMLElement | null  = document.createElement("div")
        let root : HTMLElement | null = document.getElementById("root")
        if((new_div != null) && (root != null))
        {            
            new_div.id = this.name
            new_div.setAttribute("style", this.style.toString())
            root.append(new_div)
        }
    }
}

export default (ColorDisplay);

