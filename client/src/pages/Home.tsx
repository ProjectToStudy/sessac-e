import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSigning } from '../modules/user';
import HomeComponent from '../components/home/Home';
import { getStudy } from '../api/study';
import { RootState } from '../modules';

const Home = () => {
    const dispatch = useDispatch();

    const { user }: any = useSelector((state: RootState) => state.userInfo);
    const { categoryList }: any = useSelector((state: RootState) => state.study);

    const [interestStudyList, setInterestStudyList] = useState([]);
    const [popularStudyList, setPopularStudyList] = useState([]);

    const getInterestStudyList = async () => {
        const { career, purpose } = user;

        const category = [];

        for (let i = 0; i < career.length; i++) {
            const array = categoryList.filter((c: { name: string }) => c.name === career[i]);
            if (array.length) category.push(array[0].id);
        }
        for (let i = 0; i < purpose.length; i++) {
            const array = categoryList.filter((c: { name: string }) => c.name === purpose[i]);
            if (array.length) category.push(array[0].id);
        }

        try {
            const { data } = await getStudy(category.join(','), 7);
            setInterestStudyList(data.result);
        } catch (e) {
            console.log(e);
        }
    };

    const getPopularStudyList = async () => {
        try {
            const { data } = await getStudy(undefined, 4);
            setPopularStudyList(data.result);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        dispatch(setIsSigning(false));
        getPopularStudyList();
    }, []);

    useEffect(() => {
        if (user) getInterestStudyList();
    }, [user]);

    return <HomeComponent interestStudyList={interestStudyList} popularStudyList={popularStudyList} />;
};

export default Home;
