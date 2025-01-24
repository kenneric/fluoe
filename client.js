import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import colorTheme from './colorTheme';

import Header from './components/header';
import TestPage from './pages/TestPage';
import CreateNewTestPage from './pages/CreateNewTestPage';

const appStyle = {
    height: '100%',
    width: '100%',
    color: colorTheme.black,
    fontSize: '1.5em',
    fontFamily: 'Asap',
    fontWeight: 300,
};

ReactDOM.createRoot(document.querySelector('#root')).render(
    <div style={appStyle}>
        <Header />
        <Router>
            <Routes>
                <Route path="/" element={<TestPage />}></Route>
                <Route path="/create" element={<CreateNewTestPage />} />
                {/* <Route path="project/:id" element={<Project />} /> */}
            </Routes>
        </Router>
    </div>
);
