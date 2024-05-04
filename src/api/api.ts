import { api } from './config'

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
            console.error(error);
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
            console.error(error);
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
            console.error(error);
        }
    },

    getVideo: async (category:string, id: string) => {
        try {
            const response = await api.get(`${category}/${id}/videos?language=en-US`);
            if(response.status === 200){
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    }
}