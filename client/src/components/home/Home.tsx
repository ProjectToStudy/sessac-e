import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../modules';
import Banner from './components/Banner';
import LikeBtn from '../atoms/LikeBtn';
import { StudyItemType } from '../study/Study';
import { Motivation, InfoSharing, Hackathon, Certificate } from '../../assets/index';
import styles from '../../styles/Home.module.scss';

interface Props {
    interestStudyList: StudyItemType[];
    popularStudyList: StudyItemType[];
}

const HomeComponent = ({ interestStudyList, popularStudyList }: Props) => {
    const { categoryList }: any = useSelector((state: RootState) => state.study);

    return (
        <div id="container">
            <div id="component" className={styles.component}>
                <section id="information">
                    <div className={styles.header}>
                        <Link to={'/search'} className={styles.search} />
                        <Link to={'/notification'} className={styles.notification} />
                    </div>
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
                            {interestStudyList?.map((item, index) => (
                                <li key={index} className={styles.interesting_item}>
                                    <div className={styles.image_area}>
                                        <img src={item.imageUrl} alt="thumbnail" />
                                        <span className={styles.on_n_off}>
                                            {item.channel[0] ? '온라인' : ''} {item.channel[1] ? '오프라인' : ''}
                                        </span>
                                        <LikeBtn id={item.id} />
                                    </div>
                                    <ul className={styles.category}>
                                        {item.category.map((category, index) => (
                                            <li key={index} className={styles.c_item}>
                                                {categoryList.filter((c: { id: number }) => c.id === category)[0].name}
                                            </li>
                                        ))}
                                    </ul>
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
                            {popularStudyList?.map((item, index) => (
                                <li key={index} className={styles.active_item}>
                                    <div className={styles.image_area}>
                                        <img src={item.imageUrl} alt="thumbnail" />
                                        <span className={styles.on_n_off}>
                                            {item.channel[0] ? '온라인' : ''} {item.channel[1] ? '오프라인' : ''}
                                        </span>
                                        <LikeBtn id={item.id} />
                                    </div>
                                    <span className={styles.phrase}>
                                        n회차 돌파! 많은 새싹님들이 이 스터디를 지원했어요.
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
                        <span className={styles.title}>최근 인기 있는 스터디</span>
                    </div>
                    <ul className={styles.popular_list}>
                        {popularStudyList?.map((item, index) => (
                            <li key={index} className={styles.popular_item}>
                                <img src={item.imageUrl} alt="thumbnail" />
                                <div className={styles.right}>
                                    <span className={styles.name}>{item.name}</span>
                                    <span className={styles.desc}>{item.description}</span>
                                    <ul className={styles.category}>
                                        {item.category.map((category, index) => (
                                            <li key={index} className={styles.c_item}>
                                                {categoryList.filter((c: { id: number }) => c.id === category)[0].name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default HomeComponent;
