import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import LikeBtn from '../atoms/LikeBtn';
import styles from '../../styles/Study.module.scss';

export interface StudyItemType {
    id: number;
    isValid: number;
    name: string;
    description: string;
    category: number[];
    channel: number[];
    imageUrl: string;
    isNew: number;
    startDate: string;
    endDate: string;
}

const StudyItem = ({ study }: { study: StudyItemType }) => {
    const { id, name, category, imageUrl, isNew, startDate, endDate } = study;

    const { categoryList }: any = useSelector((state: RootState) => state.study);

    const dateFormat = (date: string) => {
        const splitDate = date.split('T')[0].split('-');
        return `${splitDate[1]}월 ${splitDate[2]}일`;
    };

    return (
        <li className={styles.item}>
            <div className={styles.thumbnail_area}>
                <img src={imageUrl} alt="" className={styles.thumbnail} />
                {isNew === 1 && <span className={styles.new}>NEW</span>}
                <LikeBtn id={id} />
            </div>
            <div className={styles.info}>
                <span className={styles.category}>
                    {categoryList.filter((c: { id: number }) => c.id === category[0])[0].name} &gt;{' '}
                    {categoryList.filter((c: { id: number }) => c.id === category[1])[0].name}
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

const StudyList = ({ studyList }: { studyList: StudyItemType[] }) => {
    return (
        <ul className={styles.study_list}>
            {studyList.map((item: StudyItemType, index: number) => (
                <StudyItem key={index} study={item} />
            ))}
        </ul>
    );
};

const StudyComponent = ({ studyList }: { studyList: StudyItemType[] }) => {
    const { categoryList }: any = useSelector((state: RootState) => state.study);

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
                    {categoryList.map((item: { id: number; name: string }) => (
                        <li key={item.id} role="button" className={styles.filter_item}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            {categoryList.length && studyList.length && <StudyList studyList={studyList} />}
        </div>
    );
};

export default StudyComponent;
