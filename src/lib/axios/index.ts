import baseAxios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const axios = baseAxios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axios
