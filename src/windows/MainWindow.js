import Select from "react-select";

const fs = window.require('fs');
const path = window.require('path');

const options =
  [
    { value: '#000000', label: "Black" },
    { value: '#ffffff', label: "White" },
    { value: '#ff0000', label: "Red" },
    { value: '#00ff00', label: "Green" },
    { value: '#0000ff', label: "Blue" },
    { value: '#55cc77', label: "Teal" },
  ]
let divStyle = { backgroundColor: options[2].value }

// handle onChange event of the dropdown
const handleChange = e => {
  let box = document.getElementById('color_box')
  let divStyle = { backgroundColor: e.value }
  box.style.backgroundColor = e.value
  console.log(box.style)
}
export default function MainWindow() {
  return (
    <div>
      <p>Main Window</p>
      <br></br>
      <div id="color_box"
        style={divStyle}
      >
        <br></br>
      </div>
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
