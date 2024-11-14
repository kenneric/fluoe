import React, { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
// import ansiHTML from 'ansi-html';

const TestProgress = () => {
    const [output, setOutput] = useState('');
    const [outputLines, setOutputLines] = useState([]);
    const [progressLevel, setProgressLevel] = useState(0);
    const [inProgress, setInProgress] = useState(false);

    let intervalID;

    useEffect(() => {
        intervalID = setInterval(() => {
            fetchData();
        }, 1000);
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/test/progress');
            const data = await response.json();

            setOutput(data.output);
            setOutputLines(data.output.split('\n'));
            setProgressLevel(data.progressLevel);
            setInProgress(data.inProgress);
            if (!data.inProgress) {
                clearInterval(intervalID);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {inProgress && <MoonLoader />}
            <p>{`${inProgress ? 'Test is running...' : 'Test is not running'}`}</p>
            <p>{`${progressLevel}%`}</p>
            <div style={{ height: '400px', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse', }}>
                <div >
                    {outputLines.map((line, k) => (
                        <div>
                            <tt key={k} style={{ whiteSpace: 'pre' }} sx={{ color: 'text.secondary', }}>{line}</tt><br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TestProgress;