import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Main, Join, JoinPlanting, Home } from './pages/index';
import { RootState } from './modules';
import './App.css';

const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const App = () => {
    const { isSigning }: any = useSelector((state: RootState) => state.user);

    useEffect(() => {
        setScreenSize();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Join />} />
            <Route path="/plant-seeds/:state" element={isSigning ? <JoinPlanting /> : <Navigate to='/join' />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};

export default App;
