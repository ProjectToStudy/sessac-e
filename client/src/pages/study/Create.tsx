import { Header } from '../../components/atoms';
import CreateContainer from '../../containers/study/Create';

const Create = () => {
    return (
        <>
            <Header props={{ title: '나의 스터디 개설', isSearch: false, isComplete: true }} />
            <CreateContainer />
        </>
    );
}

export default Create;
