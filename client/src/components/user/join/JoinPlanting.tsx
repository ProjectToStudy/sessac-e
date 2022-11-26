import React from 'react';
import List from './components/List';
import { Button } from '../../atoms';
import * as Icon from '../../../assets';
import styles from '../../../styles/JoinPlanting.module.scss';

interface JoinPlantingComponentProps {
    screenState: number;
    isActive: boolean;
    selected: string[];
    onNextClick: (state: number) => void;
    onItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
    onOmissionClick: () => void;
}
interface HomeScreenProps {
    onNextClick: JoinPlantingComponentProps['onNextClick'];
    onOmissionClick?: JoinPlantingComponentProps['onOmissionClick'];
}
interface SelectScreenProps {
    category: string;
    isActive: JoinPlantingComponentProps['isActive']
    selected: JoinPlantingComponentProps['selected'];
    onNextClick: JoinPlantingComponentProps['onNextClick'];
    onItemClick: JoinPlantingComponentProps['onItemClick'];
    onOmissionClick: JoinPlantingComponentProps['onOmissionClick'];
}

const HomeScreen = ({ onNextClick, onOmissionClick }: HomeScreenProps) => {
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
                <button type="button" onClick={onOmissionClick} className={styles.omission}>생략하고 둘러보기</button>
            </div>
        </div>
    );
};

const SelectScreen = ({ category, isActive, selected, onNextClick, onItemClick, onOmissionClick }: SelectScreenProps) => {
    const jobList = [{ icon: <Icon.Bag />, name: '학생' }, { icon: <Icon.Pencil />, name: '예술직종' }, { icon: <Icon.Office />, name: '일반사무직' }, { icon: <Icon.IT />, name: 'IT직종' },
        { icon: <Icon.Profession />, name: '전문직' }, { icon: <Icon.Freshman />, name: '취업준비' }, { icon: <Icon.People />, name: '크리에이터' }, { icon: <Icon.ETC />, name: '기타' }, { icon: <Icon.Edu />, name: '교육직' }];
    const purposeList = [{ icon: <Icon.Freshman />, name: '취업준비' }, { icon: <Icon.Award />, name: '자격증' }, { icon: <Icon.Pencil />, name: '취업준비' }, { icon: <Icon.Cap />, name: '학업' },
        { icon: <Icon.Info />, name: '정보공유' }, { icon: <Icon.Crescent />, name: '해커톤' }, { icon: <Icon.People />, name: '동기부여' }, { icon: <Icon.ETC />, name: '기타' }];

    return (
        <div className={styles.content}>
            <div className={styles.select}>
                <div className={styles.s_title_area}>
                    <span>좋은 씨앗을 심기 위해</span>
                    <span>새싹님에 대해 알려주세요.</span>
                    {category === '직업' ? <Icon.Seed className={styles.icon} /> : <Icon.Sprout className={styles.icon} />}
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
                <button type="button" onClick={onOmissionClick} className={styles.omission}>생략하고 둘러보기</button>
            </div>
        </div>
    );
};

const EndScreen = ({ onNextClick }: HomeScreenProps) => {
    return (
        <div className={styles.content}>
            <div className={styles.end}>
                <img src="/images/sprout.svg" alt="sprout" />
                <span>
                새싹님을 위한
                <br />
                좋은 씨앗이 준비 되었어요.
            </span>
            </div>
            <div className={styles.auth_area}>
                <Button props={{ text: '시작하기', onClick: () => onNextClick(4), isActive: true }} />
            </div>
        </div>
    );
};

const JoinPlantingComponent = ({ screenState, isActive, selected, onNextClick, onItemClick, onOmissionClick }: JoinPlantingComponentProps) => {
    return (
        <div id="component" className={styles.component}>
            {screenState === 1 && <HomeScreen onNextClick={onNextClick} onOmissionClick={onOmissionClick} />}
            {(screenState === 2 || screenState === 3) && (
                <SelectScreen
                    category={screenState === 2 ? '직업' : '이용 목적'}
                    isActive={isActive}
                    selected={selected}
                    onNextClick={onNextClick}
                    onItemClick={onItemClick}
                    onOmissionClick={onOmissionClick}
                />
            )}
            {screenState === 4 && <EndScreen onNextClick={onNextClick} />}
        </div>
    );
};

export default JoinPlantingComponent;
