import Repository, { baseUrl } from "./Repository"

export function addFaq(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(`${baseUrl}/add_faq`, payload)
            return resolve(response.data)
        } catch (error) { }
    })
}
export function getFaq(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(`${baseUrl}/get_faq`, payload)
            return resolve(response.data)
        } catch (error) { }
    })
}
export function updateFaq(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(`${baseUrl}/update_faq`, payload)
            return resolve(response.data)
        } catch (error) { }
    })
}
export function getContactUs(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(
                `${baseUrl}/get_contact_us`,
                payload
            )
            return resolve(response.data)
        } catch (error) { }
    })
}
export function updateContactUs(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(
                `${baseUrl}/update_contact_us`,
                payload
            )
            return resolve(response.data)
        } catch (error) { }
    })
}
export function getAboutUs(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(`${baseUrl}/get_about_us`, payload)
            return resolve(response.data)
        } catch (error) { }
    })
}
export function updateAboutUs(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(
                `${baseUrl}/update_about_us`,
                payload
            )
            return resolve(response.data)
        } catch (error) { }
    })
}
export function updatePrivacyPolicy(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(
                `${baseUrl}/update_privacy_policy`,
                payload
            )
            return resolve(response.data)
        } catch (error) { }
    })
}
export function getPrivacyPolicy(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(
                `${baseUrl}/get_privacy_policy`,
                payload
            )
            return resolve(response.data)
        } catch (error) { }
    })
}
export function updateReturnPolicy(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(
                `${baseUrl}/update_cancelation_policy`,
                payload
            )
            return resolve(response.data)
        } catch (error) { }
    })
}
export function getReturnPolicy(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(
                `${baseUrl}/get_cancelation_policy`,
                payload
            )
            return resolve(response.data)
        } catch (error) { }
    })
}
export function getTermAndCondition(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(
                `${baseUrl}/get_term_and_condition`,
                payload
            )
            return resolve(response.data)
        } catch (error) { }
    })
}
export function updateTermAndCondition(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Repository.post(
                `${baseUrl}/update_term_and_condition`,
                payload
            )
            return resolve(response.data)
        } catch (error) { }
    })
}