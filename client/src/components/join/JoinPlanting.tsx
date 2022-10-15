import React from 'react';
import { Link } from 'react-router-dom';
import List from './components/List';
import { Button } from '../atoms';
import { Seed, Sprout, Student } from '../../assets/';
import styles from '../../styles/JoinPlanting.module.scss';

interface JoinPlantingComponentProps {
    screenState: number;
    isActive: boolean;
    selected: string[];
    onNextClick: (state: number) => void;
    onItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}
interface HomeScreenProps {
    onNextClick: JoinPlantingComponentProps['onNextClick'];
}
interface SelectScreenProps {
    category: string;
    isActive: JoinPlantingComponentProps['isActive']
    selected: JoinPlantingComponentProps['selected'];
    onNextClick: JoinPlantingComponentProps['onNextClick'];
    onItemClick: JoinPlantingComponentProps['onItemClick'];
}

const HomeScreen = ({ onNextClick }: HomeScreenProps) => {
    return (
        <div className={styles.content}>
            <div className={styles.home}>
                <img src="/images/firecracker.svg" alt="congrats" />
                <span>
                    무럭무럭 성장하기 위해
                    <br />
                    씨앗을 심으러 가볼까요?
                </span>
            </div>
            <div className={styles.auth_area}>
                <Button props={{ text: '회원가입', onClick: () => onNextClick(1), isActive: true }} />
                <Link to="/">생략하고 둘러보기</Link>
            </div>
        </div>
    );
};

const SelectScreen = ({ category, isActive, selected, onNextClick, onItemClick, }: SelectScreenProps) => {
    const jobList = [{ icon: <Student />, name: '학생' }, { icon: <Student />, name: '예술직종' }, { icon: <Student />, name: '일반사무직' }, { icon: <Student />, name: 'IT직종' },
        { icon: <Student />, name: '전문직' }, { icon: <Student />, name: '취업준비' }, { icon: <Student />, name: '크리에이터' }, { icon: <Student />, name: '기타' }];
    const purposeList = [{ icon: <Student />, name: '취업준비' }, { icon: <Student />, name: '학생' }, { icon: <Student />, name: '학생' }, { icon: <Student />, name: '학생' },
        { icon: <Student />, name: '학생' }, { icon: <Student />, name: '학생' }, { icon: <Student />, name: '학생' }, { icon: <Student />, name: '학생' }];

    return (
        <div className={styles.content}>
            <div className={styles.select}>
                <div className={styles.s_title_area}>
                    <span>좋은 씨앗을 심기 위해</span>
                    <span>새싹님에 대해 알려주세요.</span>
                    {category === '직업' ? <Seed className={styles.icon} /> : <Sprout className={styles.icon} />}
                </div>
                <div className={styles.s_select_area}>
                    <div className={styles.s_subtitle_area}>
                        <span>새싹E님의 {category}은 어떻게 되나요?</span>
                        <span>중복선택 할 수 있어요!</span>
                    </div>
                    <List
                        category={category === '직업' ? 'job' : 'purpose'}
                        list={category === '직업' ? jobList : purposeList}
                        selected={selected}
                        onItemClick={onItemClick}
                    />
                </div>
            </div>
            <div className={styles.auth_area}>
                <Button props={{ text: '다음으로', isActive, onClick: () => onNextClick(category === '직업' ? 2 : 3) }} />
                <Link to="/">생략하고 둘러보기</Link>
            </div>
        </div>
    );
};

const JoinPlantingComponent = ({ screenState, isActive, selected, onNextClick, onItemClick }: JoinPlantingComponentProps) => {
    return (
        <div id="component" className={styles.component}>
            {screenState === 1 && <HomeScreen onNextClick={onNextClick} />}
            {(screenState === 2 || screenState === 3) && (
                <SelectScreen
                    category={screenState === 2 ? '직업' : '이용 목적'}
                    isActive={isActive}
                    selected={selected}
                    onNextClick={onNextClick}
                    onItemClick={onItemClick}
                />
            )}
        </div>
    );
};

export default JoinPlantingComponent;
