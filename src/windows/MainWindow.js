import { wait } from "@testing-library/user-event/dist/utils/index.js";
import Select from "react-select";
import ColorDisplay from "../Classes/ColorDisplay.js"

const fs = window.require('fs');
const path = window.require('path');

// set of colors for testing purposes, can be removed later
const options =
  [
    { value: '#000000', label: "Black" },
    { value: '#ffffff', label: "White" },
    { value: '#ff0000', label: "Red" },
    { value: '#00ff00', label: "Green" },
    { value: '#0000ff', label: "Blue" },
    { value: '#55cc77', label: "Teal" },
  ]
// set initial style elements
let divStyle = {
  backgroundColor: options[0].value,
  width: '30px',
  height: '30px',
  position: 'absolute',
  right: '25px',
  top: '25px',
  borderRadius: '15px'
}
// handle onChange event of the dropdown
const handleChange = e => {
  let color = new ColorDisplay(Math.random() * (50, 450) + 50, Math.random() * (150, 400) + 150, Math.random() * (10, 100) + 10, e.value);
  color.display();
}


export default function MainWindow() {

  return (
    <div>
      <p>Main Window</p>
      <br></br>
      <div id="color_select">
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={options[0]}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={false}
          name="color"
          options={options}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
