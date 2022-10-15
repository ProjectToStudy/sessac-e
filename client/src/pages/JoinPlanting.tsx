import { useParams } from 'react-router';
import JoinPlantingContainer from '../containers/JoinPlanting';

const JoinPlanting = () => {
    const { state } = useParams();

    return <JoinPlantingContainer screenState={state ? Number(state) : 1} />;
};

export default JoinPlanting;
