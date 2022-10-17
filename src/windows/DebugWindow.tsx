
import Plot from 'react-plotly.js';
import { useState } from 'react';
import {createInputData, applyFourier, XYdata} from "../Math/FourierTransform"

export default function DebugWindow() {
  const [inputX, setInputX] = useState([])
  const [inputY, setInputY] = useState([])

  const [outputX, setOutputX] = useState([])
  const [outputY, setOutputY] = useState([])

  //Create random data
  function getData() {
    //create testing data
    let randomValue: number = Math.round(Math.random() * 500) + 500
    let frequency: number = Math.round(Math.random() * 300)
    let inputData = createInputData(randomValue, frequency) 
    setInputX(inputData.x)
    setInputY(inputData.y)

    //input data into transform
    let outputData = applyFourier(inputData)
    setOutputX(outputData.x)
    setOutputY(outputData.y)

    console.log("Size is " + randomValue)
    console.log("Frequency is " + frequency)
  }

  return (
    <div>
      <button onClick={(() => getData())}>Random Data</button>
      <Plot
        data={[
          {
            x: inputX,
            y: inputY,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},

          }
        ]}
        layout={{width: 400, height: 300, title: 'Input Data'}}
      />
      <Plot
        data={[
          {
            x: outputX,
            y: outputY,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},

          }
        ]}
        layout={{width: 400, height: 300, title: 'Fourier Transform Data'}}
      />
    </div>
  );
}

