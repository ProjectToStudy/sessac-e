import React, { useEffect, useState } from 'react';
import JoinPlantingComponent from '../components/join/JoinPlanting';
import { useNavigate } from 'react-router';

const JoinPlantingContainer = ({ screenState }: { screenState: number }) => {
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState({ job: false, purpose: false });
    const [selected, setSelected] = useState<{ [key: string]: string[] }>({ job: [], purpose: [] });

    /** 페이지 화면 핸들러 함수
     * 다음 페이지로 전환
     * @param state: 현재 화면 번호
     */
    const handleScreenState = (state: number) => navigate(`/plant-seeds/${state + 1}`);

    const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const category = e.currentTarget.dataset.name;
        const value = e.currentTarget.dataset.value;

        if (category !== undefined && value !== undefined) {
            if (!selected[category].includes(value)) {
                setSelected({
                    ...selected,
                    [category]: [...selected[category], value],
                });
            } else {
                setSelected({
                    ...selected,
                    [category]: selected[category].filter((i) => i !== value),
                });
            }
        }
    };

    useEffect(() => {
        if (screenState === 2) {
            setIsActive({ ...isActive, job: selected.job.length > 0 });
        } else if (screenState === 3) {
            setIsActive({ ...isActive, purpose: selected.purpose.length > 0 });
        }
    }, [selected]);

    return (
        <div id="container">
            <JoinPlantingComponent
                screenState={screenState}
                isActive={screenState === 2 ? isActive.job : isActive.purpose}
                selected={screenState === 2 ? selected.job : selected.purpose}
                onNextClick={handleScreenState}
                onItemClick={handleItemClick}
            />
        </div>
    );
};

export default JoinPlantingContainer;
