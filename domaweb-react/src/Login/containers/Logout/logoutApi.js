import request from '../../../utils/api/request_super';
import post from '../../../utils/api/post_super';

export const logout = () => post('logout');
