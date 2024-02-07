import axios from 'axios'
import { formToObj, getToken } from '../helpers/common'
import { redirect } from 'react-router-dom'


export async function createReview(request) {
    const data = await formToObj(request)
    return await axios.post('/api/reviews/', data, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}


export async function deleteReview(id) {
    await axios.delete(`/api/reviews/${id}/`, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return redirect('/trails')
}