import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setIsSigning } from '../../modules/user';
import JoinPlantingComponent from '../../components/user/join/JoinPlanting';

const JoinPlantingContainer = ({ screenState }: { screenState: number }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState({ job: false, purpose: false });
    const [selected, setSelected] = useState<{ [key: string]: string[] }>({ job: [], purpose: [] });

    /** 페이지 화면 핸들러 함수
     * 다음 페이지로 전환
     * @param state: 현재 화면 번호
     */
    const handleScreenState = (state: number) => {
        if (state < 4) navigate(`/plant-seeds/${state + 1}`);
        else {
            dispatch(setIsSigning(false));
            navigate('/home');
        }
    }

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
