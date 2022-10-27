
import Plot from 'react-plotly.js';
import { useState } from 'react';
import {createSampleData, applyFourier, getFrequencies} from "../Math/FourierTransform"
import { ReactMic } from 'react-mic';
import MicInput from "../Classes/MicInput";

export default function DebugWindow() {
  const [inputX, setInputX] = useState([])
  const [inputY, setInputY] = useState([])

  const [outputX, setOutputX] = useState([])
  const [outputY, setOutputY] = useState([])

  //Create random data
  function getData() {
    //create testing data
    let randomValue: number = Math.round(Math.random() * 500) + 600
    let frequency: number = Math.round(Math.random() * 300)
    let inputData = createSampleData(randomValue, frequency) 
    setInputX(inputData.x)
    setInputY(inputData.y)

    //input data into transform
    let outputData = applyFourier(inputData)
    setOutputX(outputData.x)
    setOutputY(outputData.y)

    console.log("Size is " + randomValue)
    console.log("Frequency is " + frequency)
    console.log("Top 5 Measured Frequencies: " +  getFrequencies(outputData, 5))
  }
  const Mic = new MicInput(true);
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
    <div className='mic_input'>
      <h2>Mic Recording</h2>
      <MicInput />
    </div>
    </div>
  );
}

