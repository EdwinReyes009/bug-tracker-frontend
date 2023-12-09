import { isExpired, decodeToken } from 'react-jwt'

export function setJWT(token) {
    localStorage.setItem('JWT_FXC', token)
}

export function getJWT() {
    if (localStorage.getItem('JWT_FXC'))
        return localStorage.getItem('JWT_FXC')

    return ''
}

export function removeJWT() {

    const shouldDelete = window.confirm('¿Estás seguro de que quieres salir de la sesión?');
    if (shouldDelete) {
    localStorage.removeItem('JWT_FXC')
    }

    
}

export function expiredJWT() {
    const expired = isExpired(getJWT())

    return expired
}

export function decodedJWT() {
    const decoded = decodeToken(getJWT())

    return decoded
}

export function decodedDataJWT() {
    const decoded = decodeToken(getJWT())
    const data = decoded.user_id

    return data
}