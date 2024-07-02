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
            const paceSeconds = parseInt(paceParts[1]);

            if (!isNaN(paceMinutes) && !isNaN(paceSeconds)) {
                const totalPaceSeconds = paceMinutes * 60 + paceSeconds;

                const totalSeconds = totalPaceSeconds * distanceValue;
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = Math.floor(totalSeconds % 60);

                setResult(`เวลาที่ใช้: ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`);
            } else {
                setResult('Pace ไม่ถูกต้อง');
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

                setResult(`Pace: ${paceMinutes} นาที ${paceSeconds} วินาที/กม.`);
            } else {
                setResult('เวลาไม่ถูกต้อง');
            }
        } else if (time && pace) {
            const paceParts = pace.split('.');
            const paceMinutes = parseInt(paceParts[0]);
            const paceSeconds = parseInt(paceParts[1]);

            if (!isNaN(paceMinutes) && !isNaN(paceSeconds)) {
                const totalPaceSeconds = paceMinutes * 60 + paceSeconds;

                const timeParts = time.split('.');
                const hours = parseInt(timeParts[0]);
                const minutes = parseInt(timeParts[1]);
                const seconds = parseInt(timeParts[2]);

                if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
                    const totalTimeSeconds = hours * 3600 + minutes * 60 + seconds;

                    const distanceValue = totalTimeSeconds / totalPaceSeconds;

                    setResult(`ระยะทาง: ${distanceValue.toFixed(2)} กม.`);
                } else {
                    setResult('เวลาไม่ถูกต้อง');
                }
            } else {
                setResult('Pace ไม่ถูกต้อง');
            }
        } else {
            setResult('กรุณากรอกข้อมูลให้ครบถ้วน');
        }
    };

    return (
        <div className="container">
            <h1>เครื่องคำนวณการวิ่ง</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="distance">ระยะทาง (กม.):</label>
                <input
                    type="number"
                    id="distance"
                    name="distance"
                    step="0.01"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                />

                <label htmlFor="pace">Pace (นาที.วินาที/กม.):</label>
                <input
                    type="text"
                    id="pace"
                    name="pace"
                    placeholder="mm.ss"
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                />

                <label htmlFor="time">เวลา (ชั่วโมง.นาที.วินาที):</label>
                <input
                    type="text"
                    id="time"
                    name="time"
                    placeholder="hh.mm.ss"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <button type="button" onClick={calculate}>คำนวณ</button>
            </form>
            <div id="result">{result}</div>
        </div>
    );
}

export default App;
