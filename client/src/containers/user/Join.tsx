import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../modules';
import { initializeKey, certCheckAPI, certSendAPI, setIsSigning, loginAPI, joinAPI } from '../../modules/user';
import useInputs from '../../hooks/useInputs';
import JoinComponent from '../../components/user/join/Join';
import TermsModal from '../../components/user/join/components/Terms';
import { setAccessToken } from '../../utils/cookie';

const JoinContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { certCheck, certCheckError, login, loginError, join, joinError }: any = useSelector(
        (state: RootState) => state.user,
    );

    const [screenState, setScreenState] = useState(1);
    const [state, handleChange] = useInputs({
        phone: '',
        certification: '',
    });
    const { phone, certification } = state;

    const [isValid, setIsValid] = useState({ phone: false, certification: false });
    const [isActiveBtnState, setIsActiveBtnState] = useState({ getCode: false, start: false });
    const [errors, setErrors] = useState({ phone: '', certification: '' });

    const [getCodeCount, setGetCodeCount] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);

    const [isTermsState, setIsTermsState] = useState<boolean>(false);
    const [checked, setChecked] = useState<string[]>([]);

    useEffect(() => {
        console.log(isActiveBtnState);
    }, [isActiveBtnState]);

    useEffect(() => {
        if (isValid.phone) {
            setErrors({ ...errors, phone: '' });
            setIsActiveBtnState({ ...isActiveBtnState, getCode: true });
        } else if (!isValid.phone) {
            setIsActiveBtnState({ ...isActiveBtnState, getCode: false });
            if (timer !== 0) setTimer(0);
        }
    }, [isValid]);

    useEffect(() => {
        if (getCodeCount > 0) {
            setTimer(300);
            dispatch(certSendAPI(phone));
        }
    }, [getCodeCount]);

    useEffect(() => {
        const handleTimer = setInterval(() => {
            setTimer((timer) => timer - 1);
        }, 1000);
        if (timer === 0) {
            clearInterval(handleTimer);
            setIsActiveBtnState({ ...isActiveBtnState, getCode: true });
        }
        return () => clearInterval(handleTimer);
    }, [timer]);

    useEffect(() => {
        if (certCheck) {
            dispatch(initializeKey('certCheck'));
            setErrors({ ...errors, certification: '' });
            setIsActiveBtnState({ ...isActiveBtnState, start: true });
        }
        if (certCheckError) {
            dispatch(initializeKey('certCheckError'));
            setErrors({ ...errors, certification: '인증번호가 일치하지 않습니다.' });
        }
    }, [certCheck, certCheckError]);

    useEffect(() => {
        if (login) {
            setAccessToken(login.result.accessToken);
            dispatch(initializeKey('login'));
            navigate('/home');
        }
        if (loginError) {
            if (loginError.code === 401002) setIsTermsState(true);
            dispatch(initializeKey('loginError'));
        }
    }, [login, loginError]);

    useEffect(() => {
        if (join) {
            setAccessToken(join.result.accessToken);
            dispatch(initializeKey('join'));
            navigate('/add/1');
        }
    }, [join, joinError]);

    /** 인증 코드 받기 버튼 클릭 핸들러 함수
     * 1. 인증 코드 받기 버튼 비활성화
     * 2. (첫 페이지라면) 두 번째 페이지로 전환
     * 3. 인증 코드 보내기 횟수 제한
     * 4. 인증 코드 보내는 api 호출
     */
    const handleGetCodeBtnClick = () => {
        console.log(getCodeCount);
        setIsActiveBtnState({ ...isActiveBtnState, getCode: false });
        if (getCodeCount < 5) setGetCodeCount(getCodeCount + 1);
        else alert('6회 이상 시도 불가');
        if (screenState === 1) setScreenState(2);
    };
    /** 유효성 체크 함수
     * 1. 휴대전화 번호 형식 (유효성) 체크
     * 2. 발급된 인증 코드와 일치하는지 체크: api 통신
     */
    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const phoneRegex = /^01([0]) ?([0-9]{4}) ?([0-9]{4})$/;
        if (e.target.name === 'phone') {
            if (isValid.phone) setIsValid({ ...isValid, phone: false });
            if (phone !== '') {
                if (!phoneRegex.test(phone)) setErrors({ ...errors, phone: '휴대폰 번호 형식이 알맞지 않습니다.' });
                else setIsValid({ ...isValid, phone: true });
            }
        } else if (e.target.name === 'certification') {
            if (certification !== '') {
                dispatch(certCheckAPI({ phone, certificationNumber: certification }));
            }
        }
    };

    const handleSubmitClick = () => dispatch(loginAPI(phone));

    const handleTermsState = () => {
        setIsTermsState(false);
    };

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'checkAll') {
            if (e.target.checked) setChecked(['check1', 'check2', 'check3']);
            else setChecked([]);
        } else {
            if (e.target.checked) setChecked([...checked, e.target.id]);
            else setChecked(checked.filter((id) => id !== e.target.id));
        }
    };

    const handleTermsSubmitClick = () => {
        if (checked.length === 3) {
            dispatch(setIsSigning(true));
            dispatch(joinAPI(phone));
        }
    };

    return (
        <div id="container">
            <JoinComponent
                screenState={screenState}
                phone={phone}
                certification={certification}
                timer={`${Math.floor(timer / 60)}:${(timer - Math.floor(timer / 60) * 60).toString().padStart(2, '0')}`}
                errors={errors}
                isActive={isActiveBtnState}
                onChange={handleChange}
                onBlur={handleInputBlur}
                onGetCodeBtnClick={handleGetCodeBtnClick}
                onSubmitClick={handleSubmitClick}
            />
            {isTermsState && (
                <TermsModal
                    checked={checked}
                    onCheck={handleCheck}
                    onCloseClick={handleTermsState}
                    onSubmitClick={handleTermsSubmitClick}
                />
            )}
        </div>
    );
};

export default JoinContainer;
