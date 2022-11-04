import React from 'react';
import { ReactMic } from 'react-mic';

class MicInput extends React.Component<{}, {record: boolean}> {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
    }
  }
 
  startRecording = () => {
    this.setState({ record: true });
  }
 
  stopRecording = () => {
    this.setState({ record: false });
  }
 
  onData(recordedBlob) {
    const buffer = recordedBlob.arrayBuffer();
    buffer.then(value => {
      const view = new Int8Array(value);
      console.log(view);
    }).catch(err => {
      console.log(err);
    })
  }
 
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }

  render() {
    return(
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="white"
          backgroundColor="black" />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
      </div>
    )
  }
}

export default MicInput;

