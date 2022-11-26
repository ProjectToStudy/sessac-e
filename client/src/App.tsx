import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { RootState } from './modules';
import { Main, Join, JoinPlanting, Home } from './pages/index';
import Navigation from './components/atoms/Navigation';
import './App.css';

const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const App = () => {
    const location = useLocation();

    const { isSigning }: any = useSelector((state: RootState) => state.user);

    const noHeaderPages = ['/', '/join', '/login', '/plant-seeds/1', '/plant-seeds/2', '/plant-seeds/3', '/plant-seeds/4'];

    useEffect(() => {
        setScreenSize();
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/join" element={<Join />} />
                <Route path="/login" element={<Join />} />
                <Route path="/plant-seeds/:state" element={isSigning ? <JoinPlanting /> : <Navigate to='/join' />} />
                <Route path="/home" element={<Home />} />
            </Routes>
            {!(noHeaderPages.includes(location.pathname)) && <Navigation />}
        </>
    );
};

export default App;
