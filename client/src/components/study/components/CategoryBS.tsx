import React from 'react';
import styles from '../../../styles/study/Create.module.scss';

interface Props {
    select: string;
    selectItem: { [key in string]: string[] };
    onSelectClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onSelectItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
    onResetClick: () => void;
    onClose: () => void;
}

const tags = {
    1: '학생',
    2: '예술직종',
    3: '일반사무직',
    4: 'IT직종',
    5: '전문직',
    6: '취업준비',
    7: '크리에이터',
    8: '교육직',
    9: '기타',
    10: '취업준비',
    11: '자격증',
    12: '학업',
    13: '정보공유',
    14: '해커톤',
    15: '동기부여',
    16: '기타',
};

const CategoryBS = ({ select, selectItem, onSelectClick, onSelectItemClick, onResetClick, onClose }: Props) => {
    return (
        <div className={styles.background} onClick={onClose}>
            <div className={styles.bottom_sheet} onClick={(e) => e.stopPropagation()}>
                <div>
                    <div className={styles.select}>
                        <button
                            type="button"
                            name="job"
                            onClick={onSelectClick}
                            className={select === 'job' ? styles.active : ''}
                        >
                            직업
                        </button>
                        <button
                            type="button"
                            name="purpose"
                            onClick={onSelectClick}
                            className={select === 'purpose' ? styles.active : ''}
                        >
                            이용목적
                        </button>
                    </div>
                    <ul className={styles.tag_list}>
                        {(select === 'job' ? Object.values(tags).slice(0, 9) : Object.values(tags).slice(9)).map(
                            (item, index) => (
                                <li
                                    key={index}
                                    data-value={item}
                                    onClick={onSelectItemClick}
                                    className={`${styles.tag_item} ${
                                        selectItem[select].includes(item) ? styles.active : ''
                                    }`}
                                >
                                    {item}
                                </li>
                            ),
                        )}
                    </ul>
                </div>
                <div className={styles.bottom}>
                    <button type="button" name="reset" onClick={onResetClick}>
                        카테고리 재설정
                    </button>
                    <button
                        type="button"
                        name="add"
                        disabled={!(selectItem.job.length || selectItem.purpose.length)}
                        onClick={onClose}
                    >
                        조건 추가하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryBS;
