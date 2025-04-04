import $axios, { handleAxiosError } from './api';

export const filesApi = {

	getStreamUrl: ( fileId: string ) => {

		return `/files/stream/${ fileId }`;

	},
 
	downloadFile: async (fileId: string) => {

		try {

			const response = await $axios.get(`/files/download/${fileId}`, {
				responseType: 'blob',
			});
			
			return response.data;
			
		} catch (error) {

			handleAxiosError(error);
			
		}

	},
};
