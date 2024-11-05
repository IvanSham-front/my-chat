import axios from 'axios';
import { globalRouter } from '../globalRouter';

const HOST = String(process.env.API_URL) + process.env.API_PREFIX;

const $axios = axios.create({
	baseURL: HOST,
	withCredentials: true,
});

$axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		console.log(globalRouter);
		if (!!error.response && error.response.status === 401) {
			globalRouter.router?.push('/login');
		}
		return Promise.reject(error);
	}
);

export default $axios;
