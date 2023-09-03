import Axios from './index';
import { useMutation } from 'react-query';
import { getAccessToken } from '../utils/cookie';
import { CreateStudyTypes } from '../recoil/study';

export const getCategory = () => Axios.get('teams/categories?&sort=id');
export const getStudy = (category?: string, limit?: number) =>
    Axios.get(
        `teams?isValid=true${category !== undefined ? `&category=${category}` : ''}${
            limit !== undefined ? `&limit=${limit}` : ''
        }`,
    );

const postStudy = async (createStudyData: CreateStudyTypes) => {
    const formData = new FormData();

    Array.from(createStudyData.image).forEach((el) => {
        formData.append('image', el);
    });

    for (const [k, v] of Object.entries(createStudyData)) {
        if (k !== 'image') {
            formData.append(k, v);
        }
    }

    const { data } = await Axios.post('/teams', formData, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
    return data;
};

export const createStudyAPI = (data: CreateStudyTypes) => {
    return useMutation(() => postStudy(data));
};

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
