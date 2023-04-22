import { useSelector } from 'react-redux';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { RootState } from './modules';
import { Main, Join, JoinPlanting, Home, Study, MyPage, StudyCreate } from './pages/index';
import { Header, Navigation } from './components/atoms';
import './App.css';

const headerInfoList: { [key: string]: { title: string; isSearch: boolean } } = {
    '/study': {
        title: '스터디 찾기',
        isSearch: true,
    },
    '/me': {
        title: '나의 스터디',
        isSearch: false,
    },
};

const App = () => {
    const location = useLocation();

    const { isSigning }: any = useSelector((state: RootState) => state.user);

    const noHeaderPages = ['/', '/join', '/login', '/add/1', '/add/2', '/add/3', '/add/4', '/home', '/study/create'];
    const noNavPages = ['/', '/join', '/login', '/add/1', '/add/2', '/add/3', '/add/4', '/study/create'];

    return (
        <>
            {!noHeaderPages.includes(location.pathname) && <Header props={headerInfoList[location.pathname]} />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/join" element={<Join />} />
                <Route path="/login" element={<Join />} />
                <Route path="/add/:state" element={isSigning ? <JoinPlanting /> : <Navigate to="/join" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/study" element={<Study />} />
                <Route path="/study/create" element={<StudyCreate />} />
                <Route path="/me" element={<MyPage />} />
            </Routes>
            {!noNavPages.includes(location.pathname) && <Navigation />}
        </>
    );
};

export default App;
