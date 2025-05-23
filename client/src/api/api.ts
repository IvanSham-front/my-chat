import axios, { isAxiosError } from 'axios';
import { globalRouter } from '../globalRouter';

export interface ErrorResponse {
	message: string;
}

export interface ApiResponse<T> {
	data: T
}

// @ts-expect-error
const HOST = String( import.meta.env.VITE_API_URL ) + import.meta.env.VITE_API_PREFIX;

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
			globalRouter.router?.push('/signin');
		}
		return Promise.reject(error);
	}
);

export function handleAxiosError (error: unknown) {

	if (isAxiosError(error)) {

		console.error('Error message: ', error.message);
		return error.message;

	} else if (error instanceof Error) {

		console.error('Custom error:', error.message);
		return error.message;

 	 } else {

		console.error('Unexpected error: ', error);
		return 'An unexpected error occurred';

	}

};

$axios.getQuery = ( url: string = '', params: { [ key: string ]: string } = {} ) => {

	const query = new URLSearchParams( params );
	return [ url, query.toString() ].join( '?' );

};

export default $axios;
