import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.scss';

const Home = () => {
    return (
        <div id="Home">
            <div id="container">
                <div id="component" className={styles.component}>
                    <div className={styles.slogan}>슬로건</div>
                    <div className={styles.btn_area}>
                        <Link to="/join" className={styles.start}>
                            시작하기
                        </Link>
                        <div className={styles.login_area}>
                            <span>이미 계정이 있나요?</span>
                            <Link to="/login">로그인</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
