import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { categoryListAPI } from '../../modules/study';
import { getStudy } from '../../api/study';
import StudyComponent, { StudyItemType } from '../../components/study/Study';
import { userStudy } from '../../api/user';
import { getAccessToken } from '../../utils/cookie';

const StudyContainer = () => {
    const dispatch = useDispatch();

    const { categoryList }: any = useSelector((state: RootState) => state.study);

    const [studyList, setStudyList] = useState<StudyItemType[]>([]);
    const [userStudyInfo, setUserStudyInfo] = useState<{ likes: number[]; hits: number[] }>({ likes: [], hits: [] });

    const getStudyList = async () => {
        try {
            const { data } = await getStudy();
            setStudyList(data.result);
        } catch (e) {
            console.log(e);
        }
    };
    const getUserStudyInfo = async () => {
        try {
            const { data } = await userStudy();
            setUserStudyInfo(data.result);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!categoryList.length) dispatch(categoryListAPI());
        getStudyList();
        if (getAccessToken()) getUserStudyInfo();
    }, []);

    return (
        <div id="container">
            <StudyComponent categoryList={categoryList} studyList={studyList} userStudyInfo={userStudyInfo} />
        </div>
    );
};

export default StudyContainer;
