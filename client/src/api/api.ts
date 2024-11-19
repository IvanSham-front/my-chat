import axios from 'axios';
import { globalRouter } from '../globalRouter';


export interface ErrorResponse {
	message: string;
}

export interface ApiResponse<T> {
	data: T;
}

// @ts-expect-error
const HOST = String(import.meta.env.VITE_API_URL) + import.meta.env.VITE_API_PREFIX;

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
