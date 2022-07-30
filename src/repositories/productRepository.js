import Repository, { baseUrl } from "./Repository"

export function addCategory(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/add_category`, payload)

      return resolve(response.data)
    } catch (error) {}
  })
}

export function getCategory(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/get_category`, payload)

      return resolve(response.data)
    } catch (error) {}
  })
}
export function updateCategory(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/update_category`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}

export function addSize(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/add_size`, payload)

      return resolve(response.data)
    } catch (error) {}
  })
}

export function getSize(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/get_size`, payload)

      return resolve(response.data)
    } catch (error) {}
  })
}
export function updateSize(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/update_size`, payload)

      return resolve(response.data)
    } catch (error) {}
  })
}
export function addAttribute(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/add_attribute`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}

export function getAttribute(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/get_attribute`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}
export function updateAttribute(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/update_attribute`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}
export function addAttributeValue(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/add_attribute_value`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}

export function getAttributeValue(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/get_attribute_value`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}
export function updateAttributeValue(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/update_attribute_value`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}
export function addProduct(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/add_product`, payload)

      return resolve(response.data)
    } catch (error) {}
  })
}
export function getProduct(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/get_product`, payload)

      return resolve(response.data)
    } catch (error) {}
  })
}
export function updateProduct(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/update_product`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}
