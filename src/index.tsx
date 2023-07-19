import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Homepage from './components/homepage';
import Schedule from './components/schedule';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/schedule/:stationId' element={<Schedule />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
