import { useState } from 'react';
import { postLike } from '../../api/study';
import styles from '../../styles/Study.module.scss';

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
    startDate: string;
    endDate: string;
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
    const { id, name, category, imageUrl, isNew, startDate, endDate } = study;

    const [isLike, setIsLike] = useState(likes.includes(id));

    const dateFormat = (date: string) => {
        const splitDate = date.split('T')[0].split('-');
        return `${splitDate[1]}월 ${splitDate[2]}일`;
    };

    const onLikeClick = async () => {
        try {
            const data = await postLike(id);
            if (data.code === 200000) setIsLike((isLike) => !isLike);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <li className={styles.item}>
            <div className={styles.thumbnail_area}>
                <img src={imageUrl} alt="" className={styles.thumbnail} />
                {isNew && <span className={styles.new}>NEW</span>}
                <button type="button" name={isLike ? 'hate' : 'like'} onClick={onLikeClick} />
            </div>
            <div className={styles.info}>
                <span className={styles.category}>
                    {categoryList[category[0] - 1].name} &gt; {categoryList[category[1] - 1].name}
                </span>
                <p className={styles.title}>{name}</p>
                <span className={styles.date}>
                    {dateFormat(startDate)} ~ {dateFormat(endDate)}
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
            {studyList.map((item: StudyItemType, index: number) => (
                <StudyItem key={index} categoryList={categoryList} study={item} likes={likes} />
            ))}
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
