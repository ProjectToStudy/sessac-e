import StudyComponent, { StudyItemType } from '../../components/study/Study';
import { useEffect, useState } from 'react';
import { getStudy } from '../../api/study';

const StudyContainer = () => {
    const [studyList, setStudyList] = useState<StudyItemType[]>([]);

    const getStudyList = async () => {
        try {
            const { data } = await getStudy();
            setStudyList(data.result);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getStudyList();
    }, []);

    return (
        <div id="container">
            <StudyComponent studyList={studyList} />
        </div>
    );
};

export default StudyContainer;
