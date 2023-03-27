// For file I/O (Electron app only)
const fs = window.require('fs');
const path = window.require('path');
const isDev: boolean = process.env.NODE_ENV === 'production' ? false : true;

type Interval = {
    name: string,
    intervalLength: number,
    color: string,
    percentage: number,
    isTracked: boolean
}

// Reads all intervals in 'intervalFile'
function readIntervalsFromFile(intervalFilePath: string) {
	let intervals: Interval[] = [];

	let data: string = fs.readFileSync(intervalFilePath,
		{
			encoding: 'utf8',
			flag: 'r'
		});
	
	intervals = JSON.parse(data).intervals;
	return intervals;
}

// Store Interval-array of user-created intervals
let intervals: Interval[] = [];

// Finds the path to the program's resources
// 'schemes/' folder is in root dir in development and in 'resources/' dir in production
const resourceDir: string = isDev ? '.' : 'resources';
const pathToIntervalFile: string = path.join(resourceDir, 'intervals.json');

intervals = readIntervalsFromFile(pathToIntervalFile);

export class IntervalFunctions {
    // Getter function
    public static getIntervals(): Interval[] {
		return intervals;
	}

	// Setter function
	public static setIntervals(ints): void {
		intervals = ints;
	}
}