import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { RootState } from './modules';
import { Main, Join, JoinPlanting, Home, Study } from './pages/index';
import { Header, Navigation } from './components/atoms';
import './App.css';

const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const titleList: { [key: string]: string } = {
    '/study': '스터디 찾기',
};

const App = () => {
    const location = useLocation();

    const { isSigning }: any = useSelector((state: RootState) => state.user);

    const noHeaderPages = ['/', '/join', '/login', '/add/1', '/add/2', '/add/3', '/add/4', '/home'];
    const noNavPages = ['/', '/join', '/login', '/add/1', '/add/2', '/add/3', '/add/4'];

    useEffect(() => {
        setScreenSize();
    }, []);

    return (
        <>
            {!(noHeaderPages.includes(location.pathname)) && <Header title={titleList[location.pathname]} />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/join" element={<Join />} />
                <Route path="/login" element={<Join />} />
                <Route path="/add/:state" element={isSigning ? <JoinPlanting /> : <Navigate to='/join' />} />
                <Route path="/home" element={<Home />} />
                <Route path="/study" element={<Study />} />
            </Routes>
            {!(noNavPages.includes(location.pathname)) && <Navigation />}
        </>
    );
};

export default App;
