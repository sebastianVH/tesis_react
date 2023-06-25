import API from './api.service'

async function login({ userName, password }) {
    return API.call({ uri: 'session', method: 'POST', body: { userName, password } })
}

export {
    login
}