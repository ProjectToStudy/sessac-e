import styles from '../../styles/Component.module.scss';

interface ButtonProps {
    props: {
        text: string;
        isActive: boolean;
        onClick?: () => void;
    };
}

const Button = ({ props }: ButtonProps) => {
    const { text, isActive, onClick } = props;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={!isActive}
            className={`${styles.button} ${isActive && styles.active}`}
        >
            {text}
        </button>
    );
};

export default Button;
