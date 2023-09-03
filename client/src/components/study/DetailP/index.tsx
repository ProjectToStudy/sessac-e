import React, { useState } from 'react';
import CallOut from './CallOut';
import Authentication from './Authentication';
import SetDuration from './SetDuration';
import Approval from './Approval';
import SetNumber from './SetNumber';
import styles from 'styles/study/Create.module.scss';
import { createStudyAPI } from '../../../api/study';
import { useRecoilValue } from 'recoil';
import { CreateStudyState } from '../../../recoil/study';

const screenList = ['콜아웃', '인증방법', '스터디 기간 설정', '승인 방법', '인원 설정'];

const DetailP = () => {
    const value = useRecoilValue(CreateStudyState);
    const [page, setPage] = useState(0);

    const postStudy = createStudyAPI(value);

    const createStudy = async () => {
        try {
            const data = postStudy.mutateAsync();
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextPage = () => {
        if (page < 4) setPage((page) => page + 1);
        else createStudy();
    };
    const handlePrevPage = (index: number) => setPage(index);

    return (
        <div className={styles.detail}>
            {screenList.map(
                (item, index) =>
                    page >= index && (
                        <div key={index} className={`${styles.title_area} ${page > index ? styles.line : ''}`}>
                            <p className={styles.title}>{item}</p>
                            {page > index && (
                                <button type="button" name="arrow" onClick={() => handlePrevPage(index)} />
                            )}
                        </div>
                    ),
            )}

            {page === 0 && <CallOut />}
            {page === 1 && <Authentication />}
            {page === 2 && <SetDuration />}
            {page === 3 && <Approval />}
            {page === 4 && <SetNumber />}

            <div className={styles.btn_area}>
                <button type="button" name="next" onClick={handleNextPage} className={styles.next_btn}>
                    다음으로
                </button>
                <button type="button" name="omission" className={styles.omission}>
                    생략하기
                </button>
            </div>
        </div>
    );
};

export default DetailP;