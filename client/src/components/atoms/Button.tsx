import styles from '../../styles/Component.module.scss';

interface ButtonProps {
    props: {
        text: string;
        isActive?: boolean;
        secondary?: boolean;
        onClick?: () => void;
    };
}

const Button = ({ props }: ButtonProps) => {
    const { text, isActive, secondary, onClick } = props;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isActive ? !isActive : false}
            className={`
                ${styles.button} 
                ${secondary ? styles.secondary_btn : styles.primary_btn} 
                ${isActive && styles.active}
            `}
        >
            {text}
        </button>
    );
};

export default Button;
