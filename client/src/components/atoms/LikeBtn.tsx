import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { updateUser } from '../../modules/userInfo';
import { patchLike, postLike } from '../../api/study';
import styles from '../../styles/Component.module.scss';

const LikeBtn = ({ id }: { id: number }) => {
    const dispatch = useDispatch();
    const { user }: any = useSelector((state: RootState) => state.userInfo);
    const likes = user?.likes;

    const onLikeClick = async () => {
        try {
            const data = !likes?.includes(id) ? await postLike(id) : await patchLike(id);

            if (data.code === 200000) {
                if (!likes.includes(id)) {
                    const value = [...likes];
                    value.push(id);
                    dispatch(
                        updateUser({
                            key: 'likes',
                            value,
                        }),
                    );
                } else {
                    dispatch(
                        updateUser({
                            key: 'likes',
                            value: likes.filter((like: number) => like !== id),
                        }),
                    );
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <button
            type="button"
            name={likes?.includes(id) ? 'hate' : 'like'}
            onClick={onLikeClick}
            className={styles.like_btn}
        />
    );
};

export default LikeBtn;
