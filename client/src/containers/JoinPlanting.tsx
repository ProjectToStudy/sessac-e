import { useState } from 'react';
import JoinPlantingComponent from '../components/JoinPlanting';

const JoinPlantingContainer = () => {
    const [screenState, setScreenState] = useState<number>(1);

    /** 페이지 화면 핸들러 함수
     * 다음 페이지로 전환
     * @param state: 현재 화면 번호
     */
    const handleScreenState = (state: number) => setScreenState(state + 1);

    return (
        <div id="container">
            <JoinPlantingComponent screenState={screenState} onNextClick={handleScreenState} />
        </div>
    );
};

export default JoinPlantingContainer;
