import { Link } from 'react-router-dom';
import { Button } from './atoms/.';
import styles from '../styles/JoinPlanting.module.scss';

const HomeScreen = () => {
    return (
        <div className={styles.content}>
            <div className={styles.desc_area}>
                <img src="/images/firecracker.svg" alt="congrats" />
                <span>
                    무럭무럭 성장하기 위해
                    <br />
                    씨앗을 심으러 가볼까요?
                </span>
            </div>
            <div className={styles.auth_area}>
                <Button props={{ text: '회원가입' }} />
                <Link to="/">생략하고 둘러보기</Link>
            </div>
        </div>
    );
};

const JoinPlantingComponent = () => {
    return (
        <div id="component" className={styles.component}>
            <HomeScreen />
        </div>
    );
};

export default JoinPlantingComponent;
