const FFT = require('fft.js');

//time constant is time between input data in ms
const timeConstant: number = 1;
// data must be in array with length of power of two 
const inputSize: number = 16384;
//Output frequency range goes from 0 to inputSize * timeConstant / 2

interface XYdata {
    x: number[];
    y: number[];
}

let inputData: XYdata = createInputData(inputSize) 
let outputData = applyFourier(inputData)

function createInputData(timeSpan: number) {
    let xArray = []
    let yArray = []
    for (let i = 0; i < timeSpan; i++)
    {
        xArray.push(i)

        //frequency of 300 per second
        const frequency = 5000

        //creates a sin wave of above frequency
        yArray.push(Math.sin(i * Math.PI * 2 * frequency / (timeSpan * timeConstant)))

        //creates a complex wave of frequences 322, 1754, and 5728
        //yArray.push((Math.sin(i * 6.28 * 322 / (timeSpan * timeConstant)) + Math.sin(i * 6.28 * 1754 / (timeSpan * timeConstant)) + Math.sin(i * 6.28 * 5728 / (timeSpan * timeConstant))) / 3)
    }
    return({
        x: xArray,
        y: yArray
    })
}


function applyFourier(data: XYdata)
{
    const f = new FFT(data.x.length);

    let out = f.createComplexArray(data.y);
    
    f.realTransform(out, data.y);
    let xArray: number[] = new Array
    xArray = xArray.concat(data.x)
    xArray.forEach(adjustFrequency)
    return({
        x: xArray,
        y: out
    })
}

function adjustFrequency(value: number, index: number, arr: number[]) {
    //Value is slightly off as index rises in large input data arrays
    arr[index] = value * timeConstant / 2; 
}


export {inputData, outputData}