import React, { useState } from 'react';
import './App.css';

function App() {
    const [distance, setDistance] = useState('');
    const [pace, setPace] = useState('');
    const [time, setTime] = useState('');
    const [result, setResult] = useState('');

    const calculate = () => {
        const distanceValue = parseFloat(distance);

        if (pace && distanceValue && !isNaN(distanceValue)) {
            const paceParts = pace.split('.');
            const paceMinutes = parseInt(paceParts[0]);
            const paceDecimal = parseInt(paceParts[1]);

            if (!isNaN(paceMinutes) && !isNaN(paceDecimal) && paceDecimal >= 0 && paceDecimal < 100) {
                let paceSeconds = Math.round((paceDecimal / 100) * 60);

                if (paceSeconds === 60) {
                    paceMinutes += 1;
                    paceSeconds = 0;
                }

                const totalPaceSeconds = paceMinutes * 60 + paceSeconds;

                const totalSeconds = totalPaceSeconds * distanceValue;
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = Math.floor(totalSeconds % 60);

                setResult(`Time: ${hours} hours ${minutes} minutes ${seconds} seconds`);
            } else {
                setResult('Invalid pace. Decimal part should be between 0 and 99.');
            }
        } else if (time && distanceValue && !isNaN(distanceValue)) {
            const timeParts = time.split('.');
            const hours = parseInt(timeParts[0]);
            const minutes = parseInt(timeParts[1]);
            const seconds = parseInt(timeParts[2]);

            if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
                const totalTimeSeconds = hours * 3600 + minutes * 60 + seconds;

                const totalPaceSeconds = totalTimeSeconds / distanceValue;
                const paceMinutes = Math.floor(totalPaceSeconds / 60);
                const paceSeconds = Math.floor(totalPaceSeconds % 60);

                setResult(`Pace: ${paceMinutes} minutes ${paceSeconds} seconds/km`);
            } else {
                setResult('Invalid time');
            }
        } else if (time && pace) {
            const paceParts = pace.split('.');
            const paceMinutes = parseInt(paceParts[0]);
            const paceDecimal = parseInt(paceParts[1]);

            if (!isNaN(paceMinutes) && !isNaN(paceDecimal) && paceDecimal >= 0 && paceDecimal < 100) {
                let paceSeconds = Math.round((paceDecimal / 100) * 60);

                if (paceSeconds === 60) {
                    paceMinutes += 1;
                    paceSeconds = 0;
                }

                const totalPaceSeconds = paceMinutes * 60 + paceSeconds;

                const timeParts = time.split('.');
                const hours = parseInt(timeParts[0]);
                const minutes = parseInt(timeParts[1]);
                const seconds = parseInt(timeParts[2]);

                if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
                    const totalTimeSeconds = hours * 3600 + minutes * 60 + seconds;

                    const distanceValue = totalTimeSeconds / totalPaceSeconds;

                    setResult(`Distance: ${distanceValue.toFixed(2)} km`);
                } else {
                    setResult('Invalid time');
                }
            } else {
                setResult('Invalid pace. Decimal part should be between 0 and 99.');
            }
        } else {
            setResult('Please fill in all fields');
        }
    };

    return (
        <div className="container">
            <h1>Running Calculator</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="distance">Distance (km):</label>
                <input
                    type="number"
                    id="distance"
                    name="distance"
                    step="0.01"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                />

                <label htmlFor="pace">Pace (minutes.seconds/km):</label>
                <input
                    type="text"
                    id="pace"
                    name="pace"
                    placeholder="mm.ss"
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                />

                <label htmlFor="time">Time (hours.minutes.seconds):</label>
                <input
                    type="text"
                    id="time"
                    name="time"
                    placeholder="hh.mm.ss"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <button type="button" onClick={calculate}>Calculate</button>
            </form>
            <div id="result">{result}</div>
        </div>
    );
}

export default App;
