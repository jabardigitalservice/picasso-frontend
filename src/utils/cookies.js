import Cookies from 'js-cookie'

const TokenKey = 'SapaJds-Token'
const RefreshTokenKey = 'SapaJds-Refresh-Token'

export function getToken () {
    return Cookies.get(TokenKey)
}

export function getRefreshToken () {
    return Cookies.get(RefreshTokenKey)
}

export function setToken (token) {
    return Cookies.set(TokenKey, token, { expires: 3 })
}

export function setRefreshToken (token) {
    return Cookies.set(RefreshTokenKey, token, { expires: 3 })
}

export function removeToken () {
    Cookies.remove(TokenKey)
    Cookies.remove(RefreshTokenKey)
    return true
}
