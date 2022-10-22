import styles from '../../../styles/Modal.module.scss';

const ErrorModal = () => {
    return (
        <div className={styles.background}>
            <div className={styles.error}>
                <div className={styles.desc_area}>
                    <img src="/images/alert.svg" alt="alert" />
                    <div className={styles.desc}>
                        <span>시스템 에러가 발생하였습니다.</span>
                        <span>잠시 후 다시 시도해주세요.</span>
                    </div>
                </div>
                <button type="button" className={styles.button}>
                    확인
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;
