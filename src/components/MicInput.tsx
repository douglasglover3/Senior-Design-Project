import { useState, useRef , useEffect} from 'react';
export default function MicInput(props){
    const audioCtx = useRef(null);
    const interval = useRef(null);
    const gainNode = useRef(null);
    const [recording, setRecording] = useState(false);
    const [volume, setVolume] = useState(0.5)

    function startMicInput()
    {
        audioCtx.current = new window.AudioContext();
        gainNode.current = audioCtx.current.createGain();
        gainNode.current.gain.setValueAtTime(volume, audioCtx.current.currentTime);
        let microphoneStream = null;
        let analyserNode = audioCtx.current.createAnalyser()
        analyserNode.fftSize = 8192
        analyserNode.sampleRate = 96000
        let audioData = new Float32Array(analyserNode.fftSize);
        navigator.mediaDevices.getUserMedia ({audio: true})
            .then((stream) =>
            {
                microphoneStream = audioCtx.current.createMediaStreamSource(stream);
                microphoneStream.connect(gainNode.current);
                gainNode.current.connect(analyserNode);

                audioData = new Float32Array(analyserNode.fftSize);

                interval.current = setInterval(() => {       
                    analyserNode.getFloatTimeDomainData(audioData);
                    props.transformData(audioData)
                });

            });
        setRecording(true);
    }

    function stopMicInput()
    {
        audioCtx.current.close();
        clearInterval(interval.current);
        setRecording(false);
    }

    function changeVolume(inputVolume)
    {
        let newVolume = parseFloat(inputVolume.target.value) / 100;
        if(audioCtx.current != null && audioCtx.current.state == "running")
            gainNode.current.gain.setValueAtTime(newVolume, audioCtx.current.currentTime);
        setVolume(newVolume)
    }
    
    return(
        <div style={{width:"100%"}}>
            <div style={{width:"80%"}}>
                {!recording ?
                <button type="button" onClick={() => startMicInput()}>
                    Start
                </button>
                :
                <button type="button" onClick={() => stopMicInput()}>
                    Stop
                </button>
                }
                
                <div>
                    <input type="range"
                        value={Math.round(volume * 100)} onChange={changeVolume} />
                </div>
            </div>
        </div>
    )
}
