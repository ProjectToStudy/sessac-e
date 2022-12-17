import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Component.module.scss';

interface Props {
    title: string;
}

const Header = ({ title }: Props) => {
    const navigate = useNavigate();

    const onBackClick = () => navigate(-1);

    return (
        <div className={styles.header}>
            <div className={styles.header_inner}>
                <button type="button" name="back" onClick={onBackClick} />
                <h3>{title}</h3>
                <button type="button" name="search" />
            </div>
        </div>
    )
};

export default Header;
