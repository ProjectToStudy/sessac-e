import Axios from './index';
import { getAccessToken } from '../utils/cookie';

export const getCategory = () => Axios.get('teams/categories?&sort=id');
export const getStudy = () => Axios.get('teams?isValid=true');
export const postLike = async (id: number) => {
    const { data } = await Axios.post(
        'teams/stats',
        { type: 'likes', teamId: id },
        { headers: { Authorization: `Bearer ${getAccessToken()}` } },
    );
    return data;
};
export const patchLike = async (id: number) => {
    const { data } = await Axios.patch(
        `teams/stats/${id}`,
        {},
        {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
        },
    );
    return data;
};
