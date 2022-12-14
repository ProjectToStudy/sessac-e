import { Link } from 'react-router-dom';
import styles from '../styles/Main.module.scss';

const Main = () => {
    return (
        <div id="Main">
            <div id="container">
                <div id="component" className={styles.component}>
                    <div className={styles.slogan}>함께 자라나는 새싹 E</div>
                    <div className={styles.auth_area}>
                        <Link to="/join" className={styles.join_btn}>
                            회원가입
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

export default Main;
