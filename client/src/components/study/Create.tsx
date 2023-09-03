import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { CreateStudyState } from '../../recoil/study';
import styles from '../../styles/study/Create.module.scss';

interface Props {
    onCategoryClick: () => void;
    onDetailClick: () => void;
}

const CreateComponent = ({ onCategoryClick, onDetailClick }: Props) => {
    const [value, setValue] = useRecoilState(CreateStudyState);
    const { name } = value;

    const [thumbnailList, setThumbnailList] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;
        setValue({ ...value, image: [...value.image, files[0]] });
        setThumbnailList((thumbnailList) => [...thumbnailList, URL.createObjectURL(files[0])]);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target as HTMLInputElement;
        setValue({ ...value, [name]: e.target.value });
    };

    const handleDeleteClick = (key: string) => {
        setValue({ ...value, [key]: '' });
    };

    return (
        <div id="component" className={styles.component}>
            <ul className={styles.photo_list}>
                <li className={styles.photo_item}>
                    <label htmlFor="file">
                        <input type="file" id="file" accept="image/*" onChange={handleFileChange} />
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
                    name="name"
                    value={name}
                    onChange={handleTextChange}
                    placeholder="스터디 제목을 입력해주세요."
                />
                {name && name !== '' && (
                    <button type="button" name="delete" onClick={() => handleDeleteClick('title')} />
                )}
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
            <textarea
                name="description"
                placeholder="내용 입력"
                onChange={handleTextChange}
                className={styles.textarea}
            />
        </div>
    );
};

export default CreateComponent;
