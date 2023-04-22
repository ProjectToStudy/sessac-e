import { NavLink } from 'react-router-dom';
import styles from '../../styles/Component.module.scss';

const Navigation = () => {
    return (
        <header>
            <nav>
                <ul className={styles.nav_list}>
                    <li className={styles.nav_item}>
                        <NavLink
                            to="/home"
                            id="home"
                            className={({ isActive }) => (isActive ? styles.active : undefined)}
                        />
                        <span>홈</span>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                            to="/study"
                            id="studyList"
                            className={({ isActive }) => (isActive ? styles.active : undefined)}
                        />
                        <span>스터디찾기</span>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                            to={'/my'}
                            id="myStudy"
                            className={({ isActive }) => (isActive ? styles.active : undefined)}
                        ></NavLink>
                        <span>나의 스터디</span>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                            to={'/me'}
                            id="myPage"
                            className={({ isActive }) => (isActive ? styles.active : undefined)}
                        ></NavLink>
                        <span>마이페이지</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navigation;
