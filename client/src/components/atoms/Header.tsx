import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Component.module.scss';

interface Props {
    props: {
        title: string;
        isSearch: boolean;
        isComplete?: boolean;
    }
}

const Header = ({ props }: Props) => {
    const navigate = useNavigate();

    const onBackClick = () => navigate(-1);

    const { title, isSearch, isComplete } = props;

    return (
        <div className={styles.header}>
            <div className={styles.header_inner}>
                <button type="button" name="back" onClick={onBackClick} />
                <h3>{title}</h3>
                {isSearch && <button type="button" name="search" />}
                {(!isSearch && !isComplete) && <div aria-hidden /> }
                {isComplete && <button type="button" name="complete">완료</button> }
            </div>
        </div>
    )
};

export default Header;
