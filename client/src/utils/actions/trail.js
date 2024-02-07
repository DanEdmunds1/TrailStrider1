import axios from "axios"
import { formToObj, getToken } from "../helpers/common"

export async function createTrail(request) {
    const data = await formToObj(request)
    return await axios.post('/api/trails/', data, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export async function editTrail(request, id) {
    const data = await formToObj(request)
    return await axios.put(`/api/trails/${id}/`, data, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export async function deleteTrail(id) {
    const response = await axios.delete(`/api/trails/${id}/`, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return response
}