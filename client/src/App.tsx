import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main, Join, JoinPlanting, Home } from './pages/index';
import './App.css';

const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const App = () => {
    useEffect(() => {
        setScreenSize();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/join" element={<Join />} />
            <Route path="/plant-seeds/:state" element={<JoinPlanting />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};

export default App;
