import Axios from './.';

export const certSend = (phone: string) => Axios.post('user/cert/test', { phone });
export const certCheck = ({ phone, certificationNumber }: { phone: string, certificationNumber: string }) =>
    Axios.post('/user/cert/check', { phone: phone.replaceAll(' ', ''), certificationNumber });

export const login = (phone: string) => Axios.post('/user/login', { phone });
export const join = (phone: string) => Axios.post('/user/join', { phone });
