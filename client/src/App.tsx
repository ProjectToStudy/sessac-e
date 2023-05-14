import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { RootState } from './modules';
import { userInfoAPI } from './modules/userInfo';
import { getAccessToken } from './utils/cookie';
import { Main, Join, JoinPlanting, Home, Study, MyPage, StudyCreate, MyStudy, Search } from './pages/index';
import { Header, Navigation } from './components/atoms';
import './App.css';
import { categoryListAPI } from './modules/study';

const headerInfoList: { [key: string]: { title: string; isSearch: boolean } } = {
    '/study': {
        title: '스터디 찾기',
        isSearch: true,
    },
    '/my': {
        title: '나의 스터디',
        isSearch: false,
    },
    '/me': {
        title: '마이 페이지',
        isSearch: false,
    },
};

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { isSigning }: any = useSelector((state: RootState) => state.user);
    const { categoryList }: any = useSelector((state: RootState) => state.study);

    const noHeaderPages = ['/', '/join', '/login', '/add/1', '/add/2', '/add/3', '/add/4', '/home', '/study/create'];
    const noNavPages = ['/', '/join', '/login', '/add/1', '/add/2', '/add/3', '/add/4', '/study/create'];

    useEffect(() => {
        if (getAccessToken()) {
            dispatch(userInfoAPI());
        }
        if (!categoryList.length) dispatch(categoryListAPI());
    }, []);

    return (
        <>
            {!noHeaderPages.includes(location.pathname) && <Header props={headerInfoList[location.pathname]} />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/join" element={<Join />} />
                <Route path="/login" element={<Join />} />
                <Route path="/add/:state" element={isSigning ? <JoinPlanting /> : <Navigate to="/join" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/study" element={<Study />} />
                <Route path="/study/create" element={<StudyCreate />} />
                <Route path="/my" element={<MyStudy />} />
                <Route path="/me" element={<MyPage />} />
            </Routes>
            {!noNavPages.includes(location.pathname) && <Navigation />}
        </>
    );
};

export default App;
