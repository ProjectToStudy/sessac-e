import { useRecoilState } from 'recoil';
import { CreateStudyState } from '../../../recoil/study';
import styles from 'styles/study/Create.module.scss';

const SetNumber = () => {
    const [value, setValue] = useRecoilState(CreateStudyState);
    const { capacity } = value;

    const handleMinusClick = () => {
        if (capacity === 1) return;
        setValue({ ...value, capacity: value.capacity - 1 });
    };
    const handlePlusClick = () => {
        if (capacity === 10) return;
        setValue({ ...value, capacity: value.capacity + 1 });
    };
    return (
        <div className={styles.set_number}>
            <div className={styles.control_area}>
                <button type="button" onClick={handleMinusClick} className={styles.minus_btn}></button>
                <span>{capacity}</span>
                <button type="button" onClick={handlePlusClick} className={styles.plus_btn}></button>
            </div>
            <span className={styles.guide_text}>
                스터디 최대 인원이 <strong>10명</strong>으로 설정됩니다.
            </span>
        </div>
    );
};

export default SetNumber;
