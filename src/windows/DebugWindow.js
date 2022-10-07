
import Plot from 'react-plotly.js';
import {inputData, outputData} from "../Math/FourierTransform"

export default function DebugWindow() {
  return (
    <div>
      <Plot
        data={[
          {
            x: inputData.x,
            y: inputData.y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},

          }
        ]}
        layout={{width: 600, height: 300, title: 'Input Data'}}
      />
      <Plot
        data={[
          {
            x: outputData.x,
            y: outputData.y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},

          }
        ]}
        layout={{width: 600, height: 300, title: 'Fourier Transform Data'}}
      />
    </div>
  );
}

