import Axios from './index';

export const getCategory = () => Axios.get('teams/categories?&sort=id');
export const getStudy = () => Axios.get('teams?isValid=true');
