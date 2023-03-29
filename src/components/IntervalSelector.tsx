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
    
    // Change percentage of interval
    const handlePercentage = (e): void => {
        const newPercentage: number = e.target.value;
        const intervalName: string = e.target.id;
        let newIntervals: Interval[] = intervals.map((interval) => {
            // This is the interval we want to modify
            if (interval.name === intervalName) {
                return {...interval, percentage: newPercentage};
            }
            else {
                return interval;
            }
        });
        setIntervals(newIntervals);

        // Overwrite 'intervals.json' file with new intervals
        IntervalFunctions.saveIntervalsToFile(newIntervals);
    };

    // Change color of interval
    const handleColor = (e): void => {
        const newColor: string = e.target.value;
        const intervalName: string = e.target.id;
        let newIntervals: Interval[] = intervals.map((interval) => {
            // This is the interval we want to modify
            if (interval.name === intervalName) {
                return {...interval, color: newColor};
            }
            else {
                return interval;
            }
        });
        setIntervals(newIntervals);

        // Overwrite 'intervals.json' file with new intervals
        IntervalFunctions.saveIntervalsToFile(newIntervals);
    };

    return(
        <ul className='interval-grid'>
            {intervals.map((interval) => 
                <div className='interval' key={interval.name}>
                    <div className='interval-container'>
                        <span className='delete-interval' onClick={() => handleDelete(interval.name)}>&times;</span>
                        <input value={interval.name} type='checkbox' onChange={handleSelect} checked={interval.isTracked} />
                        <input type="color" id={interval.name} className='interval-color'
                            value={interval.color} onChange={handleColor} />
                        <span>{interval.name}</span>
                    </div>
                    <div className='percentage-slider-container'>
                        <input className='percentage-slider' type="range" id={interval.name}
                            value={interval.percentage} onChange={handlePercentage} />
                    </div>
                </div>
            )}
            <button type="button" className='button'>
                  Add interval
            </button>
        </ul>
    );
}