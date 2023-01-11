import { useState, useRef } from "react"

// Helper function to pad timings
function padTime(time) {
    return time.toString().padStart(2, '0')
}



function App() {
    const [title, setTitle] = useState('Let the countdown begin!!!')
    const [timeleft, setTimeleft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)

    const intervalRef = useRef(null);

    function startTimer() {
        if (intervalRef.current !== null) return;
        setTitle(`You're doing great!`)
        setIsRunning(true)
        intervalRef.current = setInterval(() => {
            setTimeleft((timeleft) => {
                if (timeleft >= 1) return timeleft - 1;
                resetTimer();
                return 0;
            });

        }, 1000)
    }

    function stopTimer() {
        if (intervalRef.current === null) return;
        clearInterval(intervalRef.current)
        intervalRef.current = null;
        setTitle('Keep it up!')
        setIsRunning(false)
    }

    function resetTimer() {
        clearInterval(intervalRef.current)
        intervalRef.current = null;
        setTitle('Ready to go another round?')
        setTimeleft(25 * 60)
        setIsRunning(false)
    }

    const minutes = padTime(Math.floor(timeleft / 60))
    const seconds = padTime((timeleft - minutes * 60))
    return (
        <div className="app">
            <h2>{title}</h2>

            <div className="timer">
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>

            <div className="buttons">
                {!isRunning && <button onClick={startTimer}>Start</button>}
                {isRunning && <button onClick={stopTimer}>Stop</button>}
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    )
}

export default App
