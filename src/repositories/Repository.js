import axios from "axios"
const baseDomain = "http://localhost:4000/api"
const imageDomain = "http://localhost:4000"
const authorization_prefix = "Bearer "
import { useEffect } from "react"

export const customHeaders = {
  Accept: "application/json",
  /* Authorization: authorization_prefix + token || undefined*/
}

export const baseUrl = `${baseDomain}`
export const imageUrl = `${imageDomain}`

export default axios.create({
  baseUrl,
  headers: customHeaders,
})

export const serializeQuery = query => {
  try {
    return Object.keys(query)
      .map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join("&")
  } catch {}
}
