import Axios from './.';

export const certSend = (phone: string) => Axios.post('user/cert/test', { phone });
export const certCheck = ({ phone, certificationNumber }: { phone: string, certificationNumber: string }) =>
    Axios.post('/user/cert/check', { phone, certificationNumber });
