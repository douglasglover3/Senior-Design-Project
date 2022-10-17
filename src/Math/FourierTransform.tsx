const FFT = require('fft.js');

//time constant is time between input data in ms
const timeConstant: number = 1;
//Output frequency range goes from 0 to arraySize * timeConstant / 2

interface XYdata {
    x: number[];
    y: number[];
}

//Testing values
let randomValue: number = Math.round(Math.random() * 500) + 500
let inputData: XYdata = createInputData(randomValue) 
let outputData = applyFourier(inputData)

function createInputData(arraySize: number) {
    let xArray = []
    let yArray = []
    for (let i = 0; i < arraySize; i++)
    {
        xArray.push(i)

        //frequency of 300 per second
        const frequency = 300

        //creates a sin wave of above frequency
        yArray.push(Math.sin(i * Math.PI * 2 * frequency / (arraySize * timeConstant)))

        //creates a complex wave of frequences 322, 1754, and 5728
        //yArray.push((Math.sin(i * 6.28 * 322 / (timeSpan * timeConstant)) + Math.sin(i * 6.28 * 1754 / (timeSpan * timeConstant)) + Math.sin(i * 6.28 * 5728 / (timeSpan * timeConstant))) / 3)

    }
    return({
        x: xArray,
        y: yArray
    })
}

function padData(xArray: number[], yArray: number[])
{
    // gets the exponent of the next highest power of two array size
    let exponent: number = Math.ceil(Math.log(xArray.length) / Math.LN2)
    // data must be in array with length of a power of two 
    let nextPowerOfTwo: number = Math.pow(2, exponent)
    
    //fill x array with index values counting up to new size
    let xValues = [...Array(nextPowerOfTwo - xArray.length).keys()].map(x => x + xArray.length)

    //fill y array with zeroes to new size
    let zeroes: number[] = new Array(nextPowerOfTwo - xArray.length).fill(0)
    return {
        x: xArray.concat(xValues),
        y: yArray.concat(zeroes)
    }
}

function applyFourier(data: XYdata)
{
    //pads data to appropriate size of a power of two
    let paddedData: XYdata = padData(data.x, data.y)

    //creates a fourier transform
    const f = new FFT(paddedData.x.length);
    let out = f.createComplexArray(paddedData.y);
    f.realTransform(out, paddedData.y);

    //collects and adjusts data
    let xArray: number[] = new Array
    xArray = xArray.concat(paddedData.x)
    adjustXRange(xArray, data.x.length)
    return({
        x: xArray,
        y: out
    })
}

function adjustXRange(arr: number[], originalSize) {
    //Value is slightly off as index rises in large input data arrays
    for (let i in arr) {
        arr[i] = arr[i] * (originalSize / arr.length) / 2; 
    }
}


export {inputData, outputData}