import Axios from './.';
import { getCookie } from '../utils/cookie';

export const certSend = (phone: string) => Axios.post('user/cert/test', { phone });
export const certCheck = ({ phone, certificationNumber }: { phone: string, certificationNumber: string }) =>
    Axios.post('/user/cert/check', { phone: phone.replaceAll(' ', ''), certificationNumber });

export const login = (phone: string) => Axios.post('/user/login', { phone }, { withCredentials: true });
export const join = (phone: string) => Axios.post('/user/join', { phone });
export const update = ({ career, purpose, etc }: { career: string[], purpose: string[], etc: string }) =>
    Axios.patch('/user', { data: { career, purpose, etc } }, { headers: { Authorization: `Bearer ${getCookie('at')}` } });
