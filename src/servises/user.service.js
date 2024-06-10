import { showErrorMsg } from './event-bus.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'auth/'


export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getEmptyCredentials
}


async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) return _setLoggedinUser(user)
    } catch (err) {
        console.log('Had issues in login', err)
        showErrorMsg('Cannot login')
        throw err
    }
}


async function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    try {
        const registeredUser = await httpService.post(BASE_URL + 'signup', user)
        if (registeredUser) return _setLoggedinUser(registeredUser)
    } catch (err) {
        console.log('Had issues in signup', err)
        showErrorMsg('Cannot sign up')
    }
}


async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log('Had issues in logout', err)
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}





