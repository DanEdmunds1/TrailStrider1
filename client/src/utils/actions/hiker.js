import axios from "axios"
import { formToObj, getToken } from "../helpers/common"
import { redirect } from "react-router-dom"

export async function createHiker(request) {
    const data = await formToObj(request)
    return await axios.post('/api/hikers/', data, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export async function deleteHiker(id) {
    await axios.delete(`/api/hikers/${id}/`, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return redirect('/profile')
}
