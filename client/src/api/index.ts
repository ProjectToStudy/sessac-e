import axios from 'axios';

const Axios = axios.create();

Axios.defaults.baseURL = 'http://dev.sessac-e.site/api/v1/';

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default Axios;
