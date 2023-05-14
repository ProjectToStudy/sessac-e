import { useState } from 'react';
import { patchLike, postLike } from '../../api/study';
import styles from '../../styles/Component.module.scss';

const LikeBtn = ({ id, likes }: { id: number; likes: number[] }) => {
    const [isLike, setIsLike] = useState(likes.includes(id));

    const onLikeClick = async () => {
        try {
            const data = !isLike ? await postLike(id) : await patchLike(id);
            if (data.code === 200000) setIsLike((isLike) => !isLike);
        } catch (e) {
            console.log(e);
        }
    };

    return <button type="button" name={isLike ? 'hate' : 'like'} onClick={onLikeClick} className={styles.like_btn} />;
};

export default LikeBtn;
