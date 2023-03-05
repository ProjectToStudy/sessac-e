import { ChangeEvent } from 'react';
import Button from '../../../atoms/Button';
import styles from '../../../../styles/Modal.module.scss';

interface Props {
    checked: string[];
    onCheck: (e: ChangeEvent<HTMLInputElement>) => void;
    onCloseClick: () => void;
    onSubmitClick: () => void;
}

const TermsModal = ({ checked, onCheck, onCloseClick, onSubmitClick }: Props) => {
    return (
        <div className={styles.terms_background} onClick={onCloseClick}>
            <div className={styles.terms} onClick={e => e.stopPropagation()}>
                <div className={styles.terms_list}>
                    <div className={styles.terms_item}>
                        <span>위치정보 수집 동의</span>
                        <input type="checkbox" id="check1" checked={checked.includes('check1')} onChange={onCheck} />
                        <label htmlFor="check1" />
                    </div>
                    <div className={styles.terms_item}>
                        <span>위치정보 수집 동의</span>
                        <input type="checkbox" id="check2" checked={checked.includes('check2')} onChange={onCheck} />
                        <label htmlFor="check2" />
                    </div>
                    <div className={styles.terms_item}>
                        <span>위치정보 수집 동의</span>
                        <input type="checkbox" id="check3" checked={checked.includes('check3')} onChange={onCheck} />
                        <label htmlFor="check3" />
                    </div>
                    <div className={styles.terms_item}>
                        <span>모두 동의하기</span>
                        <input type="checkbox" id="checkAll" checked={checked.length === 3} onChange={onCheck} />
                        <label htmlFor="checkAll" />
                    </div>
                </div>
                <Button props={{ text: '계속하기', onClick: onSubmitClick, isActive: checked.length === 3 }} />
            </div>
        </div>
    );
};

export default TermsModal;
