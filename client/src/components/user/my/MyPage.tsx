import { Link } from 'react-router-dom';

const MyPageComponent = () => {
    return (
        <div id="component">
            <Link to="/study/create">스터디 생성하기</Link>
        </div>
    );
};

export default MyPageComponent;
