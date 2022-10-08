import React from "react";
class ColorDisplay extends React.Component {
    constructor(x, y, size, color) {
        super();
        this.name = x.toString() + y.toString() + color;
        this.style =
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

    // fade color splotch out CURRENTLY NOT WORKING
    fade() {
        let div = document.getElementById(this.name)
        div.style.opacity = '0'
    }
    // display colot splotch TRANISITION NOT WORKING
    display() {

        let new_div = document.createElement("div")
        new_div.id = this.name
        new_div.setAttribute("style", this.style.toString())
        let root = document.getElementById("root")

        root.append(new_div)


    }
}

export default (ColorDisplay);

