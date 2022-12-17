import styles from '../../styles/Study.module.scss';

const testData = [
    {
        img: '',
        mainCategory: '자격증',
        subCategory: '토익',
        title: '정기적인 스터디로 토익점수 올리자!',
        date: '12월 10일 ~ 6월 30일',
        number: 30,
        recommend: '요즘 상승세인 토익 스터디',
        like: false,
        sticker: 'new',
    },
    {
        img: '',
        mainCategory: '자격증',
        subCategory: '토익',
        title: '정기적인 스터디로 토익점수 올리자!',
        date: '12월 10일 ~ 6월 30일',
        number: 17,
        like: false,
        sticker: 'hot',
    }
]

interface StudyItemProps {
    img: string;
    mainCategory: string;
    subCategory: string;
    title: string;
    date: string;
    number: number;
    recommend?: string;
    like: boolean;
    sticker?: string;
}
const StudyItem = ({ props }: { props: StudyItemProps }) => {
    const { img, mainCategory, subCategory, title, date, number, recommend } = props;
    return (
        <li className={styles.item}>
            <div>
                <img src={img} alt="image" />
            </div>
            <div>
                <span>{mainCategory} &gt; {subCategory}</span>
                <p>{title}</p>
                <span>{date}</span>
                <span>총 {number}회 진행</span>
                {recommend && <span>[맞춤추천] {recommend}</span>}
            </div>
        </li>
    );
};

const StudyList = ({ studyList }: { studyList: StudyItemProps[] }) => {
    return (
        <ul className={styles.list}>
            {studyList.map((item: StudyItemProps, index: number) => (
                <StudyItem key={index} props={item} />
            ))}
        </ul>
    )
}

const StudyComponent = () => {
    return (
        <div id="component">
            <StudyList studyList={testData} />
        </div>
    );
};

export default StudyComponent;
