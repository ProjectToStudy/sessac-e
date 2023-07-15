import React from 'react';
import styles from 'styles/study/Create.module.scss';

const Authentication = () => {
    return (
        <div className={styles.authentication}>
            <span className={styles.title}>스터디 인증방법</span>
            <span className={styles.desc}>스터디 인증 방법이 이런 형태로 추가됩니다.</span>
            <span className={styles.desc}>사진촬영, 메세지보내기 등 다양한 인증방법을 추가해보세요</span>
        </div>
    );
};

export default Authentication;
