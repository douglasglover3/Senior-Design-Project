// Library and Component imports
import { useState } from 'react';
import { SchemeFunctions } from '../Classes/SchemeFunctions';

type Interval = {
    name: string,
    intervalLength: number,
    color: string,
    percentage: number
}

// Displays the list of trackable intervals for Level 1 Note Relationships
export default function IntervalSelector() {
    // Get list of intervals from 'intervals.json'
    let intervals: Interval[] = SchemeFunctions.getIntervals();

    // Represents which intervals are being tracked
	let [selectedIntervals, setSelectedIntervals] = useState(Array(intervals.length).fill(true));

    // Flip element at index of <selectedIntervals>
    const handleSelect = (e): void => {
        const selectedInd: number = parseInt(e.target.value);
        const newIntervals: boolean[] = selectedIntervals.map((curr, i) => {
            if (i === selectedInd)
                return !curr;
            else
                return curr;
        });

        setSelectedIntervals(newIntervals);
    };

    let ind: number = 0;

    return(
        <div className='interval-grid'>
            {intervals.map((interval) => <div className='interval' key={interval.name}>
                <input value={ind} type='checkbox' onChange={handleSelect} checked={selectedIntervals[ind++]} />
                <span>{interval.name}</span>
                </div>)}
        </div>
    );
}