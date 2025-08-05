import axios, { AxiosResponse } from "axios"


const tmdbAccessToken = process.env.TMDB_READ_ACCESS_TOKEN

/** do nothing */
const handleSuccess = (response: AxiosResponse<any, any>) => {
    return response
}

const handleFailure = (error: any) => {
    return Promise.reject(error)
}

const axiosTmdb = axios.create({
    headers: { Authorization: `Bearer ${tmdbAccessToken}` }
})
axiosTmdb.interceptors.response.use(handleSuccess, handleFailure)

export { axiosTmdb }