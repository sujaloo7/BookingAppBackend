import Repository, { baseUrl } from "./Repository"
// import { isAuth } from "~/helper/auth"
import axios from "axios"
import { reject } from "lodash"
let cancelToken

export function getAdminProfile(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("base", baseUrl)
      const response = await Repository.post(`${baseUrl}/admin_profile`)

      return resolve(response.data)
    } catch (error) {}
  })
}

export function updateAdminProfile(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(payload, "payload")
      const response = await Repository.post(
        `${baseUrl}/edit_admin_profile`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}

export function getUserList(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(`${baseUrl}/user_list`, payload)

      return resolve(response.data)
    } catch (error) {}
  })
}
export function changeUserStatus(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Repository.post(
        `${baseUrl}/change_user_status`,
        payload
      )

      return resolve(response.data)
    } catch (error) {}
  })
}
