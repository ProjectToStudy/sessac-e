import React from 'react';
import { useRecoilState } from 'recoil';
import { CreateStudyState } from '../../../recoil/study';
import styles from 'styles/study/Create.module.scss';

const CallOut = () => {
    const [value, setValue] = useRecoilState(CreateStudyState);

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.callout}>
            <div className={styles.example}>
                <span>이런 형태로 내용을 추가 할 수 있어요!</span>
                <span>이곳에 내용을 추가하게 되면</span>
                <span>내용이 강조되어 보일 수 있어요</span>
                <span>참여조건, 사전숙지사항 등을 강조해보세요.</span>
            </div>
            <input
                type="text"
                name="callOutTitle"
                value={value.callOutTitle}
                placeholder="제목을 입력해주세요."
                onChange={handleItemChange}
                className={styles.title_input}
            />
            <textarea
                name="callOutContents"
                value={value.callOutContents}
                placeholder="내용을 입력해주세요.(최대 500자)"
                onChange={handleItemChange}
                className={styles.content_input}
            />
        </div>
    );
};

export default CallOut;
