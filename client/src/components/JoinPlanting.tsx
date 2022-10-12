import { Link } from 'react-router-dom';
import { Button } from './atoms/.';
import styles from '../styles/JoinPlanting.module.scss';

interface JoinPlantingComponentProps {
    screenState: number;
    onNextClick: (state: number) => void;
}
interface HomeScreenProps {
    onNextClick: JoinPlantingComponentProps['onNextClick'];
}
interface SelectScreenProps {
    category: string;
    onNextClick: JoinPlantingComponentProps['onNextClick'];
}

const HomeScreen = ({ onNextClick }: HomeScreenProps) => {
    return (
        <div className={styles.content}>
            <div className={styles.desc_area}>
                <img src="/images/firecracker.svg" alt="congrats" />
                <span>
                    무럭무럭 성장하기 위해
                    <br />
                    씨앗을 심으러 가볼까요?
                </span>
            </div>
            <div className={styles.auth_area}>
                <Button props={{ text: '회원가입', onClick: () => onNextClick(1) }} />
                <Link to="/">생략하고 둘러보기</Link>
            </div>
        </div>
    );
};

const SelectScreen = ({ category, onNextClick }: SelectScreenProps) => {
    return (
        <div className={styles.content}>
            <div>
                <div>
                    <span>좋은 씨앗을 심기 위해</span>
                    <span>새싹님에 대해 알려주세요.</span>
                </div>
                <div>
                    <div>
                        <span>새싹 E님의 {category}은 어떻게 되나요?</span>
                        <span>중복선택 할 수 있어요!</span>
                    </div>
                    <ul>
                        <li>{category === '직업' ? '학생' : '취업준비'}</li>
                        <li>{category === '직업' ? '취업준비생' : '취업준비'}</li>
                        <li>{category === '직업' ? '일반사무직' : '취업준비'}</li>
                        <li>{category === '직업' ? 'IT직종' : '취업준비'}</li>
                        <li>{category === '직업' ? '전문직' : '취업준비'}</li>
                        <li>{category === '직업' ? '이직 준비' : '취업준비'}</li>
                        <li>{category === '직업' ? '학생' : '취업준비'}</li>
                        <li>{category === '직업' ? '학생' : '취업준비'}</li>
                    </ul>
                </div>
            </div>
            <div className={styles.auth_area}>
                <Button props={{ text: '다음으로', onClick: () => onNextClick(category === '직업' ? 2 : 3) }} />
                <Link to="/">생략하고 둘러보기</Link>
            </div>
        </div>
    );
};

const JoinPlantingComponent = ({ screenState, onNextClick }: JoinPlantingComponentProps) => {
    return (
        <div id="component" className={styles.component}>
            {screenState === 1 && <HomeScreen onNextClick={onNextClick} />}
            {(screenState === 2 || screenState === 3) && (
                <SelectScreen category={screenState === 2 ? '직업' : '이용 목적'} onNextClick={onNextClick} />
            )}
        </div>
    );
};

export default JoinPlantingComponent;
