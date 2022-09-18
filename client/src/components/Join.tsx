import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Back } from './atoms/.';
import styles from '../styles/Join.module.scss';

interface JoinComponentProps {
    screenState: number;
    phone: string;
    certification: string;
    errors: {
        phone: string;
        certification: string;
    };
    isActive: {
        getCode: boolean;
        start: boolean;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>, type?: string) => void;
    onGetCodeBtnClick: () => void;
}

const JoinComponent = ({
    screenState,
    phone,
    certification,
    errors,
    isActive,
    onChange,
    onGetCodeBtnClick,
}: JoinComponentProps) => {
    return (
        <div id="component" className={styles.component}>
            <Back />
            <div className={styles.title_area}>
                <span>회원가입을 위해</span>
                <span>휴대폰 번호를 입력해주세요</span>
            </div>
            <Input
                props={{
                    type: 'text',
                    name: 'phone',
                    maxLength: 13,
                    placeholder: '휴대폰 번호를 입력해주세요',
                    value: phone,
                    onChange,
                }}
                error={screenState === 1 ? errors.phone : null}
            />
            <Button
                props={{
                    text: screenState === 1 ? '인증번호 받기' : '인증번호 다시 받기',
                    isActive: isActive.getCode,
                    onClick: onGetCodeBtnClick,
                }}
            />
            {screenState === 1 && (
                <div className={styles.help_area}>
                    <span>휴대폰 번호가 변경되었나요?</span>
                    <Link to={'/'}>이메일로 계정찾기</Link>
                </div>
            )}
            {screenState === 2 && (
                <>
                    <Input
                        props={{
                            type: 'number',
                            name: 'certification',
                            maxLength: 6,
                            placeholder: '인증번호 입력',
                            value: certification,
                            onChange,
                        }}
                        error={errors.certification}
                        explanation={'어떤 경우에도 타인에게 공유하지 마세요!'}
                    />
                    <div className={styles.submit}>
                        <Button props={{ text: '인증하기', isActive: isActive.start }} />
                    </div>
                </>
            )}
        </div>
    );
};

export default JoinComponent;
