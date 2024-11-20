import React, { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

const TestProgress = () => {
    const [outputLines, setOutputLines] = useState([]);
    const [testStatus, setTestStatus] = useState('');
    const [exitCode, setExitCode] = useState('');

    let intervalID;

    useEffect(() => {
            intervalID = setInterval(() => {
                fetchData();
            }, 2000);
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/test/progress');
            const data = await response.json();

            setOutputLines(data.output.split('\n'));
            setTestStatus(data.testStatus);
            console.log(exitCode);
            setExitCode(data.exitCode);
            if (testStatus === 'completed' || testStatus === 'stopped') {
                clearInterval(intervalID);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {['started', 'running'].includes(testStatus) && <MoonLoader />}
            <p>{`Status: ${testStatus}`}</p>
            <p>{`Exit code: ${exitCode || '...'}`}</p>
            <div style={{ height: '400px', width: '900px', color: 'white', backgroundImage: 'linear-gradient(#f323f4, #1299f6)', padding: '10px', borderRadius: '3px', border: '5px solid #f323f4', overflow: 'scroll', display: 'flex', flexDirection: 'column-reverse', }}>
                <div >
                    {outputLines.map((line, k) => (
                        <div>
                            <tt key={k} style={{ whiteSpace: 'pre' }}>{line}</tt><br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TestProgress;