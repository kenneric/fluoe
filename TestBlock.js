import React, { useState } from 'react'
import colorTheme from './colorTheme'

const TestBlockStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: '200px',
    height: '200px',
    margin: '40px',
}

const controlPanelStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    height: '200px',
    width: '200px',
    background: colorTheme.darkGreen,
    border: `1px solid ${colorTheme.black}`,
    borderRight: `0px`,
    borderRadius: '5px 0px 0px 5px',
}

const testNameStyle = {
    flex: 1,
    fontSize: '1.3em',
    fontWeight: 300,
    textAlign: 'center',
    color: colorTheme.white,
    margin: '5px',
}

const buttonStyle = {
    textAlign: 'center',
    width: '80px',
    justifySelf: 'middle',
    height: '30px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: `1px solid ${colorTheme.black}`,
    padding: '5px',
    background: colorTheme.white,
    color: colorTheme.black,
    textTransform: 'capitalize',
    fontSize: '16px',
    fontFamily: 'inherit',
}

const statusStyle = {
    textAlign: 'center',
    justifySelf: 'middle',
    fontSize: '16px',
    textTransform: 'capitalize',
    color: colorTheme.white,
    flex: 2,
}

const terminalStyle = {
    height: '200px',
    width: '840px',
    padding: '10px',
    background: colorTheme.darkGreen,
    border: `1px solid ${colorTheme.black}`,
    overflowX: 'hidden',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyItems: 'center',
    borderRadius: '0px 5px 5px 0px',
}

const lineStyle = {
    whiteSpace: 'pre',
    fontSize: '14px',
    color: colorTheme.white,
}

const buttonsSectionStyle = {
    width: '200px',
    display: 'flex',
    justifyContent: 'space-evenly',
}

const TestBlock = () => {
    const [outputLines, setOutputLines] = useState([])
    const [testStatus, setTestStatus] = useState('')
    const [exitCode, setExitCode] = useState('')

    let intervalID = 0

    function launchTests() {
        setTestStatus('Starting')
        fetch('/test/start', {
            method: 'POST',
            mode: 'cors',
        })
        if (intervalID === 0) {
            const id = setInterval(() => {
                fetchData()
            }, 2000)

            intervalID = id
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch('/test/progress')
            const data = await response.json()

            setOutputLines(data.output.split('\n'))
            setTestStatus(data.testStatus)
            setExitCode(data.exitCode)

            if (['completed', 'stopped'].includes(data.testStatus)) {
                clearInterval(intervalID)
                intervalID = 0
            }
        } catch (error) {
            console.error(error)
        }
    }

    function abortTests() {
        fetch('/test/abort', {
            method: 'POST',
            mode: 'cors',
        })
        clearInterval(intervalID)
        intervalID = 0
    }

    return (
        <div style={TestBlockStyle}>
            <div style={controlPanelStyle}>
                <h2 style={testNameStyle}>Test #1</h2>
                <p style={statusStyle}>spec/newSpec.ts</p>
                <p disabled style={statusStyle}>{`${testStatus}...`}</p>

                <div style={buttonsSectionStyle}>
                    <button onClick={launchTests} style={buttonStyle}>
                        Start
                    </button>
                    <button onClick={abortTests} style={buttonStyle}>
                        Cancel
                    </button>
                </div>
            </div>
            <div style={terminalStyle}>
                {outputLines.toReversed().map((line, k) => (
                    <>
                        <tt key={k} style={lineStyle}>
                            {line}
                        </tt>
                        <br />
                    </>
                ))}
            </div>
        </div>
    )
}

export default TestBlock
