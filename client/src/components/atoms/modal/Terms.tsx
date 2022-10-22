import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../Button';
import styles from '../../../styles/Modal.module.scss';

interface Props {
    onCloseClick: () => void;
}

const TermsModal = ({ onCloseClick }: Props) => {
    const navigate = useNavigate();

    const handleSubmitClick = () => {
        navigate('/plant-seeds/1');
    };

    return (
        <div className={styles.terms_background} onClick={onCloseClick}>
            <div className={styles.terms} onClick={e => e.stopPropagation()}>
                <div className={styles.terms_list}>
                    <div className={styles.terms_item}>
                        <span>위치정보 수집 동의</span>
                        <input type="checkbox" id="check1" />
                        <label htmlFor="check1" />
                    </div>
                    <div className={styles.terms_item}>
                        <span>위치정보 수집 동의</span>
                        <input type="checkbox" id="check2" />
                        <label htmlFor="check2" />
                    </div>
                    <div className={styles.terms_item}>
                        <span>위치정보 수집 동의</span>
                        <input type="checkbox" id="check3" />
                        <label htmlFor="check3" />
                    </div>
                    <div className={styles.terms_item}>
                        <span>모두 동의하기</span>
                        <input type="checkbox" id="checkAll" />
                        <label htmlFor="checkAll" />
                    </div>
                </div>
                <Button props={{ text: '계속하기', onClick: handleSubmitClick, isActive: true }} />
            </div>
        </div>
    );
};

export default TermsModal;
