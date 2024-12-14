import React, { useState } from 'react';
import colorTheme from './colorTheme';

const TestBlockStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minHeight: '200px',
}

const controlPanelStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '20px',
    height: '200px',
    background: colorTheme.black,
    border: `3px solid ${colorTheme.orange}`,
}

const testNameStyle = {
    fontSize: '1.3em',
}

const buttonStyle = {
    textAlign: 'center',
    width: '100px',
    justifySelf: 'middle',
    height: '40px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: `2px solid ${colorTheme.orange}`,
    padding: '5px',
    background: '#685752',
    color: colorTheme.white,
    margin: '20px',
    textTransform: 'capitalize',
    fontSize: '14px',
}

const statusStyle = {
    textAlign: 'center',
    justifySelf: 'middle',
    margin: '20px',
    fontSize: '14px',
    textTransform: 'capitalize',
}

const terminalStyle = {
    height: '200px',
    width: '840px',
    padding: '20px',
    background: colorTheme.black,
    border: `3px solid ${colorTheme.orange}`,
    overflowX: 'hidden',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyItems: 'center',
}

const lineStyle = {
    whiteSpace: 'pre',
    fontSize: '14px',
    color: colorTheme.white,
}

const infoBlockStyle = {

}

const TestBlock = () => {
    const [outputLines, setOutputLines] = useState([]);
    const [testStatus, setTestStatus] = useState('');
    const [exitCode, setExitCode] = useState('');

    let intervalID = 0;

    function launchTests() {
        fetch('/test/start', {
            method: 'POST',
            mode: 'cors',
        });
        if (intervalID === 0) {
            const id = setInterval(() => {
                fetchData();
            }, 2000);

            intervalID = id;
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch('/test/progress');
            const data = await response.json();

            setOutputLines(data.output.split('\n'));
            setTestStatus(data.testStatus);
            setExitCode(data.exitCode);

            if (['completed', 'stopped'].includes(data.testStatus)) {
                clearInterval(intervalID);
                intervalID = 0;
            }
        } catch (error) {
            console.error(error);
        }
    }

    function abortTests() {
        fetch('/test/abort', {
            method: 'POST',
            mode: 'cors',
        });
        clearInterval(intervalID);
        intervalID = 0;
    }

    return (
        <div style={TestBlockStyle}>
            <div style={infoBlockStyle}>
                <h2 style={testNameStyle}>Test #1</h2>
            </div>
            <div style={controlPanelStyle}>
                <div>
                    <button onClick={launchTests} style={buttonStyle}>
                        Start
                    </button>
                    <button onClick={abortTests} style={buttonStyle}>
                        Abort
                    </button>
                </div>

                <p disabled style={statusStyle}>{`${testStatus}...`}</p>
                {exitCode &&
                    <p>{`Exit code: ${exitCode}`}</p>
                }
            </div>
            < div style={terminalStyle}>
                {outputLines.toReversed().map((line, k) => (
                    <>
                        <tt key={k} style={lineStyle}>{line}</tt><br />
                    </>
                ))}
            </div>
        </div >
    );
}

export default TestBlock;