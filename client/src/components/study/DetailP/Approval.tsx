import styles from 'styles/study/Create.module.scss';
import { useState, MouseEvent } from 'react';

const Approval = () => {
    const [way, setWay] = useState<'approval' | 'first'>('approval');

    const handleWayClick = (e: MouseEvent<HTMLButtonElement>) => {
        setWay((e.target as HTMLButtonElement).name as 'approval' | 'first');
    };

    return (
        <div className={styles.approval}>
            <ul className={styles.button_list}>
                <li className={`${styles.button_item} ${way === 'approval' ? styles.active : ''}`}>
                    <button type="button" name="approval" onClick={handleWayClick}>
                        승인제
                    </button>
                </li>
                <li className={`${styles.button_item} ${way === 'first' ? styles.active : ''}`}>
                    <button type="button" name="first" onClick={handleWayClick}>
                        선착순
                    </button>
                </li>
            </ul>
            <p className={styles.guide_text}>
                *승인제 : 호스트가 직접 멤버를 수락하거나 거절 할 수 있어요. 질문을 통해 통하는 사람들과 만날 수 있어요.
                <br />
                <br />
                *선착순 : 멤버들의 신청과 동시에 참여가 완료돼요. 누구나 참여할 수 있어서 신청률이 높아요.
            </p>
        </div>
    );
};

export default Approval;
