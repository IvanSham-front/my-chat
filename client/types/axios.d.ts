import 'axios';

declare module 'axios' {
    interface AxiosInstance {
        getQuery: ( url: string, params: { [key: string]: string  }) => string;
    }
}