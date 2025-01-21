import axios, { isAxiosError } from 'axios';
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
		if (!!error.response && error.response.status === 401) {
			console.error('Unauthorized');
			globalRouter.router?.push('/login');
		}
		return Promise.reject(error);
	}
);

export const handleAxiosError = (error: unknown) => {
	if (isAxiosError(error)) {
		console.error('Error message: ', error.message);
		return error.message;
	} else {
		console.error('Unexpected error: ', error);
		return 'An unexpected error occurred';
	}
};

export default $axios;
