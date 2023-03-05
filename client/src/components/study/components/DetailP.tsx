import React, { useEffect, useState } from 'react';
import styles from '../../../styles/study/Create.module.scss';

const CallOut = () => {
    return (
        <div className={styles.callout}>
            <div className={styles.example}>
                <span>이런 형태로 내용을 추가 할 수 있어요!</span>
                <span>이곳에 내용을 추가하게 되면</span>
                <span>내용이 강조되어 보일 수 있어요</span>
                <span>참여조건, 사전숙지사항 등을 강조해보세요.</span>
            </div>
            <input type="text" placeholder="제목을 입력해주세요." className={styles.title_input} />
        </div>
    );
};

const Authentication = () => {
    return (
        <div className={styles.authentication}>
            <p>스터디 인증방법</p>
        </div>
    );
};

const SetDuration = () => {
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    const [today, setToday] = useState<Date>();
    const [now, setNow] = useState<Date>();
    const [month, setMonth] = useState<number>();
    const [first, setFirst] = useState<number>(0);
    const [last, setLast] = useState<number>(0);

    // const [duration, setDuration] = useState<{ first: Date | null; end: Date | null }>({ first: null, end: null });

    const handleMonth = (type: string) => {
        if (!now) return;
        if (type === 'prev') setNow(new Date(now.getFullYear(), now.getMonth() - 1, 1));
        else if (type === 'next') setNow(new Date(now.getFullYear(), now.getMonth() + 1, 1));
    };

    const makeCalendar = () => {
        if (!now) return;
        const firstDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        setFirst(firstDate.getDay());
        setLast(lastDate.getDate());
    };

    const getDuration = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.target);
        // if (!now) return;
        // if (!duration.first) setDuration({ first: new Date(now.getFullYear(), now.getMonth(), day), end: null });
        // else setDuration({ ...duration, end: new Date(now.getFullYear(), now.getMonth(), day) });
    };

    useEffect(() => {
        setToday(new Date());
    }, []);

    useEffect(() => {
        if (today) setNow(today);
    }, [today]);

    useEffect(() => {
        if (now) setMonth(now.getMonth() + 1);
    }, [now]);

    useEffect(() => {
        if (month) makeCalendar();
    }, [month]);

    if (!today || !now || !month) return <></>;

    return (
        <div className={styles.duration}>
            <div className={styles.calendar}>
                <div className={styles.month}>
                    <button type="button" name="prev" onClick={() => handleMonth('prev')} />
                    <p>{month}월</p>
                    <button type="button" name="next" onClick={() => handleMonth('next')} />
                </div>
                <div className={styles.day}>
                    {day.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className={styles.week}>
                        {index === 0
                            ? [...Array(7)].map((_, index2) => (
                                  <button
                                      key={index2}
                                      disabled={
                                          (month === today.getMonth() + 1 && index2 - first + 1 < today.getDate()) ||
                                          month <= today.getMonth()
                                      }
                                  >
                                      {index2 - first + 1 > 0 ? index2 - first + 1 : ''}
                                  </button>
                              ))
                            : [...Array(7)].map((_, index2) => (
                                  <button
                                      key={index2}
                                      disabled={
                                          (month === today.getMonth() + 1 &&
                                              7 * (index - 1) + index2 + 8 - first < today.getDate()) ||
                                          month <= today.getMonth()
                                      }
                                      onClick={getDuration}
                                  >
                                      {last >= 7 * (index - 1) + index2 + 8 - first
                                          ? 7 * (index - 1) + index2 + 8 - first
                                          : ''}
                                  </button>
                              ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const DetailP = () => {
    const [page, setPage] = useState(0);

    const handleNextPage = () => setPage((page) => page + 1);
    const handlePrevPage = (index: number) => setPage(index);

    return (
        <div className={styles.detail}>
            <div className={`${styles.title_area} ${page > 0 ? styles.line : ''}`}>
                <p className={styles.title}>콜아웃</p>
                {page > 0 && <button type="button" name="arrow" onClick={() => handlePrevPage(0)} />}
            </div>
            {page > 0 && (
                <div className={`${styles.title_area} ${page > 1 ? styles.line : ''}`}>
                    <p className={styles.title}>인증방법</p>
                    {page > 1 && <button type="button" name="arrow" onClick={() => handlePrevPage(1)} />}
                </div>
            )}
            {page > 1 && (
                <div className={`${styles.title_area} ${page > 2 ? styles.line : ''}`}>
                    <p className={styles.title}>스터디 기간 설정</p>
                    {page > 2 && <button type="button" name="arrow" onClick={() => handlePrevPage(2)} />}
                </div>
            )}
            {page === 0 && <CallOut />}
            {page === 1 && <Authentication />}
            {page === 2 && <SetDuration />}
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
