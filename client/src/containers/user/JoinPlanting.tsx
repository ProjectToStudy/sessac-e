import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../modules';
import { initializeKey, updateAPI } from '../../modules/user';
import JoinPlantingComponent from '../../components/user/join/JoinPlanting';

const JoinPlantingContainer = ({ screenState }: { screenState: number }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { update, updateError }: any = useSelector((state: RootState) => state.user);

    const [isActive, setIsActive] = useState({ career: false, purpose: false });
    const [selected, setSelected] = useState<{ [key: string]: string[] }>({ career: [], purpose: [] });

    const handleOmissionClick = () => window.location.replace('/home');

    /** 페이지 화면 핸들러 함수
     * 다음 페이지로 전환
     * @param state: 현재 화면 번호
     */
    const handleScreenState = (state: number) => {
        if (state < 4) navigate(`/add/${state + 1}`);
        else {
            dispatch(updateAPI({ ...selected, etc: '' }));
        }
    };

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
            setIsActive({ ...isActive, career: selected.career.length > 0 });
        } else if (screenState === 3) {
            setIsActive({ ...isActive, purpose: selected.purpose.length > 0 });
        }
    }, [selected]);

    useEffect(() => {
        if (update) {
            dispatch(initializeKey('update'));
            navigate('/home');
        }
    }, [update, updateError]);

    return (
        <div id="container">
            <JoinPlantingComponent
                screenState={screenState}
                isActive={screenState === 2 ? isActive.career : isActive.purpose}
                selected={screenState === 2 ? selected.career : selected.purpose}
                onNextClick={handleScreenState}
                onItemClick={handleItemClick}
                onOmissionClick={handleOmissionClick}
            />
        </div>
    );
};

export default JoinPlantingContainer;
