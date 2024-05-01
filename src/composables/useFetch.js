import axios from 'axios'

export async function useFetch(url, params) {
  const axiosAPI = axios.create({
    baseURL: 'https://nlstar.com/api/catalog3/v1'
  })
  const { data } = await axiosAPI.get(url, { params: params })
  return data
}
