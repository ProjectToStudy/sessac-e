import { useState } from 'react';
import styles from 'styles/study/Create.module.scss';

const SetNumber = () => {
    const [number, setNumber] = useState(1);

    const handleMinusClick = () => {
        if (number === 1) return;
        setNumber((number) => number - 1);
    };
    const handlePlusClick = () => {
        if (number === 10) return;
        setNumber((number) => number + 1);
    };
    return (
        <div className={styles.set_number}>
            <div className={styles.control_area}>
                <button type="button" onClick={handleMinusClick} className={styles.minus_btn}></button>
                <span>{number}</span>
                <button type="button" onClick={handlePlusClick} className={styles.plus_btn}></button>
            </div>
            <span className={styles.guide_text}>
                스터디 최대 인원이 <strong>10명</strong>으로 설정됩니다.
            </span>
        </div>
    );
};

export default SetNumber;
