import React from 'react';
import styles from '../../../styles/study/Create.module.scss';

interface Props {
    select: string;
    selectItem: { [key in string]: string[] };
    onSelectClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onSelectItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
    onClose: () => void;
}

const jobTags = ['학생', '예술직종', '일반사무직', 'IT직종', '전문직', '취업준비', '크리에이터', '교육직', '기타'];

const CategoryBS = ({ select, selectItem, onSelectClick, onSelectItemClick, onClose }: Props) => {
    return (
        <div className={styles.background} onClick={onClose}>
            <div className={styles.bottom_sheet} onClick={(e) => e.stopPropagation()}>
                <div>
                    <div className={styles.select}>
                        <button type="button" name="job" onClick={onSelectClick} className={select === 'job' ? styles.active : ''}>직업</button>
                        <button type="button" name="purpose" onClick={onSelectClick} className={select === 'purpose' ? styles.active : ''}>이용목적</button>
                    </div>
                    <ul className={styles.tag_list}>
                        {jobTags.map((item, index) => (
                            <li
                                key={index}
                                data-value={item}
                                onClick={onSelectItemClick}
                                className={`${styles.tag_item} ${selectItem[select].includes(item) ? styles.active : ''}`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.bottom}>
                    <button type="button" name="reset">카테고리 재설정</button>
                    <button type="button" name="add">조건 추가하기</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryBS;
