import axios, { type AxiosInstance } from 'axios'

if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined in the environment variables.')
}

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
