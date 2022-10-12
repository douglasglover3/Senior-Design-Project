import React from "react";
import { DefaultSerializer } from "v8";

export default function display_color(x: number, y: number, size: number, color: string)
{
    let div_style  =
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
    let new_div = document.createElement('div')
    new_div.setAttribute("style", div_style)


    return(
        new_div
    )
}
