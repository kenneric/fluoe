import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

function Main() {
    return <App />;
}

ReactDOM.hydrateRoot(document.querySelector('#root'), <Main />);
