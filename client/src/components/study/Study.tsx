import styles from '../../styles/Study.module.scss';
import { ReactComponent as Heart } from '../../assets/study/heart.svg';
import { ReactComponent as EmptyHeart } from '../../assets/study/empty-heart.svg';

export interface CategoryItemType {
    id: number;
    type: string;
    name: string;
    isValid: boolean;
}

export interface StudyItemType {
    id: number;
    isValid: number;
    name: string;
    category: number[];
    imageUrl: string;
    isNew: number;
    recruitStartDate: string;
    recruitEndDate: string;
}
const StudyItem = ({
    categoryList,
    study,
    likes,
}: {
    categoryList: CategoryItemType[];
    study: StudyItemType;
    likes: number[];
}) => {
    const { id, name, category, imageUrl, isNew, recruitStartDate, recruitEndDate } = study;

    const dateFormat = (date: string) => {
        const splitDate = date.split('T')[0].split('-');
        return `${splitDate[1]}월 ${splitDate[2]}일`;
    };

    return (
        <li className={styles.item}>
            <div className={styles.thumbnail_area}>
                <img src={imageUrl} alt="" className={styles.thumbnail} />
                {isNew && <span className={styles.new}>NEW</span>}
                {likes.includes(id) ? <Heart /> : <EmptyHeart />}
            </div>
            <div className={styles.info}>
                <span className={styles.category}>
                    {categoryList[category[0] - 1].name} &gt; {categoryList[category[1] - 1].name}
                </span>
                <p className={styles.title}>{name}</p>
                <span className={styles.date}>
                    {dateFormat(recruitStartDate)} ~ {dateFormat(recruitEndDate)}
                </span>
                <span className={styles.number}>총 n회 진행</span>
                {/*{recommend && (*/}
                {/*    <p className={styles.recommend}>*/}
                {/*        <b>[맞춤추천]</b> {recommend}*/}
                {/*    </p>*/}
                {/*)}*/}
            </div>
        </li>
    );
};

const StudyList = ({
    categoryList,
    studyList,
    likes,
}: {
    categoryList: CategoryItemType[];
    studyList: StudyItemType[];
    likes: number[];
}) => {
    return (
        <ul className={styles.study_list}>
            {studyList.map(
                (item: StudyItemType, index: number) =>
                    item.isValid && <StudyItem key={index} categoryList={categoryList} study={item} likes={likes} />,
            )}
        </ul>
    );
};

const StudyComponent = ({
    categoryList,
    studyList,
    userStudyInfo,
}: {
    categoryList: CategoryItemType[];
    studyList: StudyItemType[];
    userStudyInfo: { likes: number[]; hits: number[] };
}) => {
    return (
        <div id="component" className={styles.component}>
            <div className={styles.filter_area}>
                <button type="button" className={styles.sort}>
                    최신순
                </button>
                <hr />
                <ul className={styles.filter_list}>
                    <li role="button" className={`${styles.filter_item} ${styles.active}`}>
                        전체
                    </li>
                    {categoryList.map((item) => (
                        <li key={item.id} role="button" className={styles.filter_item}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            {categoryList.length && studyList.length && (
                <StudyList categoryList={categoryList} studyList={studyList} likes={userStudyInfo.likes} />
            )}
        </div>
    );
};

export default StudyComponent;
