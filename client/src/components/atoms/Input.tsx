import React from 'react';
import styles from '../../styles/Component.module.scss';

interface InputProps {
    props: {
        type: string;
        name: string;
        maxLength?: number;
        placeholder: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    error?: string | null;
    explanation?: string;
}

const Input = ({ props, error, explanation }: InputProps) => {
    return (
        <div className={styles.input_area}>
            <input {...props} />
            {explanation !== null && error === '' && <span className={styles.explanation}>{explanation}</span>}
            {error !== null && <span className={styles.error}>{error}</span>}
        </div>
    );
};

export default Input;
