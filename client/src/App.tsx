import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Join from './pages/Join';
import JoinPlanting from './pages/JoinPlanting';
import Login from './pages/Login';
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
            <Route path="/" element={<Index />} />
            <Route path="/join" element={<Join />} />
            <Route path="/plant-seeds/:state" element={<JoinPlanting />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default App;
