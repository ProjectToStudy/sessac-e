import React, { useEffect, useState } from 'react';
import JoinComponent from '../components/Join';
import useInputs from '../hooks/useInputs';

const JoinContainer = () => {
    const [screenState, setScreenState] = useState(1);
    const [state, handleChange] = useInputs({
        phone: '',
        certification: '',
    });
    const { phone, certification } = state;

    const [isActiveBtnState, setIsActiveBtnState] = useState({
        getCode: false,
        start: false,
    });
    const [errors, setErrors] = useState({
        phone: '',
        certification: '',
    });

    const [getCodeCount, setGetCodeCount] = useState<number>(0);

    const handleGetCodeBtnClick = () => {
        if (getCodeCount < 5) setGetCodeCount((getCodeCount) => getCodeCount + 1);
        else alert('6회 이상 시도 불가');
        if (screenState === 1) setScreenState(2);
    };

    useEffect(() => {
        const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        if (isActiveBtnState.getCode) setIsActiveBtnState({ ...isActiveBtnState, getCode: false });

        if (phone !== '') {
            if (!regex.test(phone)) setErrors({ ...errors, phone: '잘못된 번호입니다.' });
            else {
                setErrors({ ...errors, phone: '' });
                setIsActiveBtnState({ ...isActiveBtnState, getCode: true });
            }
        }
    }, [phone]);

    return (
        <div id="container">
            <JoinComponent
                screenState={screenState}
                phone={phone}
                certification={certification}
                errors={errors}
                isActive={isActiveBtnState}
                onChange={handleChange}
                onGetCodeBtnClick={handleGetCodeBtnClick}
            />
        </div>
    );
};

export default JoinContainer;
