import axios, { AxiosError } from "axios"

export const api = axios.create({
  // withCredentials: true,
  baseURL: "https://api.themoviedb.org/3",
  headers: { 
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_MOVIESDB_API_ACCESS_TOKEN}` 
  }
})

// defining a custom error handler for all APIs
const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error)
  }

  return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})