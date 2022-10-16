import { useParams } from 'react-router';
import JoinPlantingContainer from '../../containers/user/JoinPlanting';

const JoinPlanting = () => {
    const { state } = useParams();

    return <JoinPlantingContainer screenState={state ? Number(state) : 1} />;
};

export default JoinPlanting;
