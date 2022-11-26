import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import JoinPlantingContainer from '../../containers/user/JoinPlanting';

const JoinPlanting = () => {
    const { state } = useParams();

    const location = useLocation();
    const { phone } = location.state as { phone: string };

    return <JoinPlantingContainer phone={phone} screenState={state ? Number(state) : 1} />;
};

export default JoinPlanting;
