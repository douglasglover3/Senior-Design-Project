// Library and Component imports
import { useState, useEffect } from 'react';
import { IntervalFunctions } from '../Classes/IntervalFunctions';

type Interval = {
    name: string,
    intervalLength: number,
    color: string,
    percentage: number,
    isTracked: boolean
}

// Displays the list of trackable intervals for Level 1 Note Relationships
export default function IntervalSelector() {
    // Get list of intervals from 'intervals.json'
    const [intervals, setIntervals]: [Interval[], any] = useState(IntervalFunctions.getIntervals());
    useEffect(() => {
        IntervalFunctions.setIntervals(intervals);
    }, [intervals]);

    // Change whether this interval is being tracked
    const handleSelect = (e): void => {
        const intervalName: string = e.target.value;

        setIntervals(intervals.map((interval) => {
            // This is the interval we want to change
            if (interval.name === intervalName) {
                return {...interval, isTracked: !interval.isTracked};
            }
            else {
                return interval;
            }
        }));
    };

    // Remove this interval from the list entirely
    const handleDelete = (intervalName: string): void => {
        let newIntervals: Interval[] = intervals.filter(interval => interval.name !== intervalName);

        // Remove interval from <intervals>
        setIntervals(newIntervals);

        // Overwrite 'intervals.json' file with new intervals
        IntervalFunctions.saveIntervalsToFile(newIntervals);
    }

    return(
        <div className='interval-grid'>
            {intervals.map((interval) => <div className='interval' key={interval.name}>
                <input value={interval.name} type='checkbox' onChange={handleSelect} checked={interval.isTracked} />
                <span>{interval.name}</span>
                <span className='delete-interval' onClick={() => handleDelete(interval.name)}>&times;</span>
                </div>)}
        </div>
    );
}