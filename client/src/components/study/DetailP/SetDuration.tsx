import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CreateStudyState } from '../../../recoil/study';
import styles from 'styles/study/Create.module.scss';

const SetDuration = () => {
    const [value, setValue] = useRecoilState(CreateStudyState);

    const day = ['일', '월', '화', '수', '목', '금', '토'];
    const [today, setToday] = useState<Date>();
    const [now, setNow] = useState<Date>();
    const [month, setMonth] = useState<number>();
    const [first, setFirst] = useState<number>(0);
    const [last, setLast] = useState<number>(0);

    const [duration, setDuration] = useState<{ first: string | null; end: string | null }>({ first: null, end: null });

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
        if (!now) return;

        const { value } = e.target as HTMLButtonElement;

        if (!duration.first) {
            setDuration({ first: `${now.getFullYear()}-${now.getMonth() + 1}-${value}`, end: null });
        } else {
            if (duration.end) {
                setDuration({ first: `${now.getFullYear()}-${now.getMonth() + 1}-${value}`, end: null });
            } else setDuration({ ...duration, end: `${now.getFullYear()}-${now.getMonth() + 1}-${value}` });
        }
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

    useEffect(() => {
        if (duration.first && duration.end) {
            setValue({
                ...value,
                startDate: duration.first,
                recruitStartDate: duration.first,
                endDate: duration.end,
                recruitEndDate: duration.end,
            });
        }
    }, [duration]);

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
                                      value={index2 - first + 1 > 0 ? index2 - first + 1 : ''}
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
                                      value={
                                          last >= 7 * (index - 1) + index2 + 8 - first
                                              ? 7 * (index - 1) + index2 + 8 - first
                                              : ''
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

export default SetDuration;
