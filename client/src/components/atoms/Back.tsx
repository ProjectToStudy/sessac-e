import styles from '../../styles/Component.module.scss';

const Back = () => {
    return <button type="button" name="back" onClick={() => history.back()} className={styles.back} />;
};

export default Back;
