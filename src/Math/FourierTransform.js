const FFT = require('fft.js');

//time constant is time between input data in ms
const timeConstant = 1;
// data must be in array with length of power of two 
const inputSize = 16384;

//Output frequency range goes from 0 to inputSize * timeConstant / 2

let inputData = createInputData(inputSize) 
let outputData = applyFourier(inputData)

function createInputData(timeSpan) {
    let xArray = []
    let yArray = []
    for (let i = 0; i < timeSpan; i++)
    {
        xArray.push(i)

        //frequency of 300 per second
        const frequency = 300

        //creates a sin wave of above frequency
        yArray.push(Math.sin(i * 6.28 * frequency / (timeSpan * timeConstant)))

        //creates a complex wave of frequences 322, 1754, and 5728
        //yArray.push((Math.sin(i * 6.28 * 322 / (timeSpan * timeConstant)) + Math.sin(i * 6.28 * 1754 / (timeSpan * timeConstant)) + Math.sin(i * 6.28 * 5728 / (timeSpan * timeConstant))) / 3)
    }
    return({
        x: xArray,
        y: yArray
    })
}

function applyFourier(data)
{
    const f = new FFT(data.x.length);

    let out = f.createComplexArray(data.y);
    
    f.realTransform(out, data.y);
    let xArray = new Array
    xArray = xArray.concat(data.x)
    xArray.forEach(getFrequency)
    return({
        x: xArray,
        y: out
    })
}

function getFrequency(item, index, arr) {
    //Value is slightly off as index rises in large input data arrays
    arr[index] = item * timeConstant / 2; 
}


export {inputData, outputData}