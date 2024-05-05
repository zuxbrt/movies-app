import axios from "axios"

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { 
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_MOVIESDB_API_ACCESS_TOKEN}` 
  }
})