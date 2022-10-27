
import Plot from 'react-plotly.js';
import { useState } from 'react';
import {Fourier} from "../Math/FourierTransform"

export default function DebugWindow() {
  const [inputX, setInputX] = useState([])
  const [inputY, setInputY] = useState([])

  const [outputX, setOutputX] = useState([])
  const [outputY, setOutputY] = useState([])

  //Create random data
  function getData() {
    let fourier = new Fourier;
    
    //create testing data
    let randomValue: number = Math.round(Math.random() * 500) + 600
    let frequency: number = Math.round(Math.random() * 300)
    let inputData = fourier.createSampleData(randomValue, frequency) 
    setInputX(inputData.x)
    setInputY(inputData.y)

    //input data into transform
    let outputData = fourier.applyTransform(inputData)
    setOutputX(outputData.x)
    setOutputY(outputData.y)

    console.log("Size is " + randomValue)
    console.log("Frequency is " + frequency)
    console.log("Top 5 Measured Frequencies: " +  fourier.getFrequencies(outputData, 5))
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

