import { getFormatedDate } from './dateUtil';
const homeState = process.env.CONFIG.homeState;

export const taskRedirect = () => `${homeState}/${getFormatedDate()}`;