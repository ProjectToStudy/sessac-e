import styles from '../../styles/Study.module.scss';

export interface StudyItemType {
    name: string;
    recruitStartDate: string;
    recruitEndDate: string;
}
const StudyItem = ({ props }: { props: StudyItemType }) => {
    const { name, recruitStartDate, recruitEndDate } = props;
    return (
        <li className={styles.item}>
            <div className={styles.thumbnail_area}>
                <img src="" alt="image" className={styles.thumbnail} />
            </div>
            <div className={styles.info}>
                <span className={styles.category}>mainCategory &gt; subCategory</span>
                <p className={styles.title}>{name}</p>
                <span className={styles.date}>
                    {recruitStartDate} ~ {recruitEndDate}
                </span>
                <span className={styles.number}>총 0회 진행</span>
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
        <ul className={styles.list}>
            {studyList.map((item: StudyItemType, index: number) => (
                <StudyItem key={index} props={item} />
            ))}
        </ul>
    );
};

const StudyComponent = ({ studyList }: { studyList: StudyItemType[] }) => {
    return (
        <div id="component" className={styles.component}>
            <StudyList studyList={studyList} />
        </div>
    );
};

export default StudyComponent;
