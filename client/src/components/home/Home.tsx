import styles from '../../styles/Home.module.scss';
import Banner from './components/Banner';
import { Motivation, InfoSharing, Hackathon, Certificate } from '../../assets/index';

const HomeComponent = () => {
    return (
        <div id="component" className={styles.component}>
            <section id="information">
                <div className={styles.header}></div>
                <Banner />
                <ul className={styles.category_list}>
                    <li className={styles.category_item}>
                        <div className={styles.icon}>
                            <Motivation />
                        </div>
                        <span>동기부여</span>
                    </li>
                    <li className={styles.category_item}>
                        <div className={styles.icon}>
                            <InfoSharing />
                        </div>
                        <span>정보공유</span>
                    </li>
                    <li className={styles.category_item}>
                        <div className={styles.icon}>
                            <Hackathon />
                        </div>
                        <span>해커톤</span>
                    </li>
                    <li className={styles.category_item}>
                        <div className={styles.icon}>
                            <Certificate />
                        </div>
                        <span>자격증</span>
                    </li>
                </ul>
            </section>
            <section id="recommendation" className={styles.recommendation}>
                <div className={styles.recommended}>
                    <div className={styles.title_area}>
                        <span className={styles.title}>
                            새싹님의 <strong>관심사</strong>와 비슷한 스터디
                        </span>
                        <button type="button" name="more" className={styles.more}>
                            더보기
                        </button>
                    </div>
                    <ul className={styles.recommended_list}>
                        {Array.from({ length: 3 }, (_, i) => (
                            <li key={i} className={styles.interesting_item}>
                                <div className={styles.image_area}>
                                    <img src="" alt="thumbnail" />
                                    <span className={styles.on_n_off}>온라인</span>
                                    <span className={styles.like}>♡</span>
                                </div>
                                <div className={styles.category}>
                                    <span className={styles.c_item}>전문직</span>
                                    <span className={styles.c_item}>자격증</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.recommended}>
                    <div className={styles.title_area}>
                        <span className={styles.title}>
                            🔥 이번 주 <strong>활동적인</strong> 새싹 스터디
                        </span>
                        <button type="button" name="more" className={styles.more}>
                            더보기
                        </button>
                    </div>
                    <ul className={styles.recommended_list}>
                        {Array.from({ length: 3 }, (_, i) => (
                            <li key={i} className={styles.active_item}>
                                <div className={styles.image_area}>
                                    <img src="" alt="thumbnail" />
                                    <span className={styles.on_n_off}>온라인</span>
                                    <span className={styles.like}>♡</span>
                                </div>
                                <span className={styles.phrase}>
                                    3회차 돌파! 많은 새싹님들이 이 스터디를 지원했어요.
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.recommended_location}>
                    <div className={styles.location}>
                        <span>
                            <b>성북동</b> 이런 스터디 어떠세요?
                        </span>
                    </div>
                </div>
            </section>
            <section id="popular" className={styles.popular}>
                <div className={styles.title_area}>
                    <span>최근 인기 있는 스터디</span>
                    <button type="button" name="">
                        새로고침
                    </button>
                </div>
                <ul className={styles.popular_list}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <li key={i} className={styles.popular_item}>
                            <img src="" alt="thumbnail" />
                            <div>
                                <span>한식 조리기능사 자격증 실기 준비</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default HomeComponent;
