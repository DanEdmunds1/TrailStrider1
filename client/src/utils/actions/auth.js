import axios from 'axios'
import { formToObj } from '../helpers/common'

export async function registerUser(request) {
    const data = await formToObj(request)
    return await axios.post('/api/auth/register/', data, {
        validateStatus: () => true
    })
}

export async function loginUser(request) {
    const data = await formToObj(request)
    return await axios.post('/api/auth/login/', data, {
        validateStatus: () => true
    })
}