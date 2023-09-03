import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import styles from '../../../styles/study/Create.module.scss';

interface Props {
    select: string;
    selectItem: number[];
    onSelectClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onSelectItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
    onResetClick: () => void;
    onClose: () => void;
}

const CategoryBS = ({ select, selectItem, onSelectClick, onSelectItemClick, onResetClick, onClose }: Props) => {
    // @ts-expect-error
    const { categoryList }: { categoryList: Array<{ id: number; name: string; category: string; type: string }> } =
        useSelector((state: RootState) => state.study);

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
                        {categoryList
                            .filter((i) => i.type === (select === 'job' ? 'career' : 'purpose'))
                            .map((item, index) => (
                                <li
                                    key={index}
                                    data-value={item.id}
                                    onClick={onSelectItemClick}
                                    className={`${styles.tag_item} ${
                                        selectItem.includes(item.id) ? styles.active : ''
                                    }`}
                                >
                                    {item.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className={styles.bottom}>
                    <button type="button" name="reset" onClick={onResetClick}>
                        카테고리 재설정
                    </button>
                    <button type="button" name="add" disabled={!selectItem.length} onClick={onClose}>
                        조건 추가하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryBS;
