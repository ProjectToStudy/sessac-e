import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsSigning } from '../modules/user';
import HomeContainer from '../containers/Home';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsSigning(false));
    }, []);

    return <HomeContainer />;
};

export default Home;
