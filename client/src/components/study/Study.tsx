import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import LikeBtn from '../atoms/LikeBtn';
import styles from '../../styles/Study.module.scss';
import React, { useEffect, useState } from 'react';

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
                    {category[1] && categoryList.filter((c: { id: number }) => c.id === category[1])[0].name}
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

const StudyList = ({ studyList, filter }: { studyList: StudyItemType[]; filter: number }) => {
    const [list, setList] = useState(studyList);

    useEffect(() => {
        if (filter === -1) setList(studyList);
        else setList(studyList.filter((s) => s.category.includes(filter)));
    }, [filter]);
    return (
        <ul className={styles.study_list}>
            {list.map((item: StudyItemType, index: number) => (
                <StudyItem key={index} study={item} />
            ))}
        </ul>
    );
};

const StudyComponent = ({ studyList }: { studyList: StudyItemType[] }) => {
    const { categoryList }: any = useSelector((state: RootState) => state.study);

    const [filter, setFilter] = useState<number>(-1);

    const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { id } = e.target as HTMLButtonElement;
        setFilter(Number(id));
    };

    return (
        <div id="component" className={styles.component}>
            <div className={styles.filter_area}>
                <button type="button" className={styles.sort}>
                    최신순
                </button>
                <hr />
                <ul className={styles.filter_list}>
                    <li role="button" className={`${styles.filter_item} ${filter === -1 ? styles.active : ''}`}>
                        <button type="button" id={String(-1)} onClick={handleFilter}>
                            전체
                        </button>
                    </li>
                    {categoryList.map((item: { id: number; name: string }) => (
                        <li
                            key={item.id}
                            role="button"
                            className={`${styles.filter_item} ${filter === item.id ? styles.active : ''}`}
                        >
                            <button type="button" id={String(item.id)} onClick={handleFilter}>
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {categoryList.length && studyList.length && <StudyList studyList={studyList} filter={filter} />}
        </div>
    );
};

export default StudyComponent;
