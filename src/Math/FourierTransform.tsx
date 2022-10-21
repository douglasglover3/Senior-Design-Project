const FFT = require('fft.js');

//time constant is time between input data in seconds
const timeConstant: number = 0.1;

//Output frequency range goes from 0 to input array size * timeConstant / 2 (nyquist frequency)

interface XYdata {
    x: number[];
    y: number[];
}

function createSampleData(arraySize: number, frequency: number) {
    let xArray: number[] = []
    let yArray: number[] = []
    for (let i = 0; i < arraySize; i++)
    {
        //x array is time and y array is amplitude
        xArray.push(i)
        //creates a sin wave of above frequency
        yArray.push(Math.sin(i * Math.PI * 2 * frequency * timeConstant / arraySize))

        //creates a complex wave based on above frequency (frequency, frequency / 6, frequency * 0.6)
        //yArray.push(Math.sin(i * Math.PI * 2 * frequency * timeConstant / arraySize) + Math.sin(i * Math.PI / 3 *  frequency * timeConstant / arraySize) + Math.sin(i * Math.PI * 1.2 * frequency * timeConstant / arraySize))
    }
    console.log(frequency, frequency / 6, frequency * 0.6)
    return({
        x: xArray,
        y: yArray
    })
}

function padData(data: XYdata)
{
    // gets the exponent of the next highest power of two array size
    let exponent: number = Math.ceil(Math.log(data.x.length) / Math.LN2)
    // data must be in array with length of a power of two 
    let nextPowerOfTwo: number = Math.pow(2, exponent)
    
    //create array with index values counting up to new size to fill x array
    let xValues: number[] = [...Array(nextPowerOfTwo - data.x.length).keys()].map(x => x + data.x.length)

    //create array with zeroes to fill y array to new size
    let zeroes: number[] = new Array(nextPowerOfTwo - data.x.length).fill(0)
    return {
        x: data.x.concat(xValues),
        y: data.y.concat(zeroes)
    }
}

function applyFourier(data: XYdata)
{
    //pads data to appropriate size of a power of two
    let paddedData: XYdata = padData(data)

    //creates a fourier transform
    const f = new FFT(paddedData.x.length);
    let out = f.createComplexArray(paddedData.y);
    f.realTransform(out, paddedData.y);

    //adjusts data to appropriate frequency range
    const xRange: number[] = adjustXRange(paddedData.x, data.x.length)
    return({
        x: xRange,
        y: out
    })
}

function adjustXRange(arr: number[], originalSize) {
    //Adjusts array values to account for size before padding and the time span measured
    for (let i in arr) {
        arr[i] = arr[i] * (originalSize / arr.length) / (2 * timeConstant); 
    }
    //cuts down array to highest measurable frequency (Nyquist Frequency)
    return arr.slice(0, arr.length *  timeConstant)
}


interface frequencyData {
    frequency: number[],
    slope: number[],
}

//gets top frequencies detected within fourier transform
//quantity determines how many frequencies to find
function getFrequencies(fourierData: XYdata, quantity: number) {

    let frequencyArray: frequencyData = {
        frequency: new Array(quantity).fill(0),
        slope: new Array(quantity).fill(0),
    }

    //Cycles through fourier transforms searching for peaks
    for (let i = 1; i < fourierData.x.length; i++) 
    {
        //Idea is to identify peaks by largest slopes in the graph

        //finds slope between current x and adjacent x
        let slope: number = Math.abs(fourierData.y[i] - fourierData.y[i - 1])
        for(let j in frequencyArray.slope)
            //if a larger slope is detected, add its frequency to frequency array
            if (slope > frequencyArray.slope[j])
            {
                //average of x values sharing slope
                frequencyArray.frequency[j] = (fourierData.x[i] + fourierData.x[i - 1]) / 2
                frequencyArray.slope[j] = slope
                break;
            }
    }
    return frequencyArray.frequency
}

export {createSampleData, applyFourier, getFrequencies}