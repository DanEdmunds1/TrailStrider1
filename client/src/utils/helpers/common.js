const tokenName = 'trailstrider'

export async function formToObj(request) {
    const formData = await request.formData()
    return Object.fromEntries(formData.entries())
}

export function setToken(token) {
    localStorage.setItem(tokenName, token)
}

export function getToken() {
    return localStorage.getItem(tokenName)
}

export function removeToken() {
    localStorage.removeItem(tokenName)
}

export function activeUser() {
    const token = getToken()
    if (!token) return null
 
    const b64 = token.split('.')[1]
    const payload = JSON.parse(atob(b64))
    console.log(payload)

    const now = Date.now() / 1000
    const exp = payload.exp

    if (exp > now) {
        return payload
    } else {
        removeToken()
    }

}