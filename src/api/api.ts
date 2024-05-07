import { api } from './config'

const IN_DEVELOPMENT = process.env.NODE_ENV === "development";

export const MovieDBAPI = {
    getByCategory: async (category: string) => {
        try {
            const response = await api.get(`${category}/top_rated?language=en-US&page=1`);
            if(response.status === 200){
                return response.data.results;
            } else {
                return [];
            }
        } catch (error) {
            if(IN_DEVELOPMENT) console.error(error);
            return null;
        }   
    },

    search: async (category: string, term: string) => {
        try {
            const response = await api.get(`/search/${category}?language=en-US&page=1&query=${term}`);
            if(response.status === 200){
                return response.data.results;
            } else {
                return [];
            }
        } catch (error) {
            if(IN_DEVELOPMENT) console.error(error);
            return null;
        }  
    },

    details: async (category: string, id: string) => {
        try {
            const response = await api.get(`${category}/${id}?language=en-US`);
            if(response.status === 200){
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            if(IN_DEVELOPMENT) console.error(error);
            return null;
        }
    },

    getVideoTrailers: async (category:string, id: string) => {
        try {
            const response = await api.get(`${category}/${id}/videos?language=en-US`);
            if(response.status === 200){
                return response.data.results;
            } else {
                return [];
            }
        } catch (error) {
            if(IN_DEVELOPMENT) console.error(error);
            return null;
        }
    }
}