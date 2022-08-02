import Repository, { baseUrl } from "./Repository"

export function addState(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/add_state`, payload)

      return resolve(response.data)
    } catch (error) { }
  })
}

export function getState(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/get_state`, payload)

      return resolve(response.data)
    } catch (error) { }
  })
}
export function updateState(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/update_state`,
        payload
      )

      return resolve(response.data)
    } catch (error) { }
  })
}

export function addCity(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/add_city`, payload)

      return resolve(response.data)
    } catch (error) { }
  })
}

export function getCity(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/get_city`, payload)

      return resolve(response.data)
    } catch (error) { }
  })
}
export function updateCity(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/update_city`,
        payload
      )

      return resolve(response.data)
    } catch (error) { }
  })
}