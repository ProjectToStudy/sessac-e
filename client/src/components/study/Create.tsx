import React from 'react';
import styles from '../../styles/study/Create.module.scss';

interface Props {
    thumbnailList: string[];
    value: { [key in string]: string };
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDelClick: (key: string) => void;
    onCategoryClick: () => void;
    onDetailClick: () => void;
}

const CreateComponent = ({
    thumbnailList,
    value,
    onFileChange,
    onTextChange,
    onDelClick,
    onCategoryClick,
    onDetailClick,
}: Props) => {
    const { title } = value;

    return (
        <div id="component" className={styles.component}>
            <ul className={styles.photo_list}>
                <li className={styles.photo_item}>
                    <label htmlFor="file">
                        <input type="file" id="file" accept="image/*" onChange={onFileChange} />
                    </label>
                </li>
                {thumbnailList.map((item, index) => (
                    <li key={index} className={styles.photo_item}>
                        <img src={item} alt="" />
                    </li>
                ))}
                {thumbnailList.length < 4 && <li className={styles.photo_item} />}
                {thumbnailList.length < 3 && <li className={styles.photo_item} />}
                {thumbnailList.length < 2 && <li className={styles.photo_item} />}
                {thumbnailList.length < 1 && <li className={styles.photo_item} />}
            </ul>
            <div className={styles.title_area}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onTextChange}
                    placeholder="스터디 제목을 입력해주세요."
                />
                {title && title !== '' && <button type="button" name="delete" onClick={() => onDelClick('title')} />}
            </div>
            <div className={styles.on_off_area}>
                <label htmlFor="online">
                    <input type="checkbox" id="online" />
                    <span>온라인</span>
                </label>
                <label htmlFor="offline">
                    <input type="checkbox" id="offline" />
                    <span>오프라인</span>
                </label>
            </div>
            <div className={styles.add}>
                <span>카테고리 선택</span>
                <button type="button" onClick={onCategoryClick} />
            </div>
            <div className={styles.add}>
                <span>상세조건 설정하기</span>
                <button type="button" onClick={onDetailClick} />
            </div>
            <textarea placeholder="내용 입력" className={styles.textarea} />
        </div>
    );
};

export default CreateComponent;
