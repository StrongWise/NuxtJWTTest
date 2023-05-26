import axios from 'axios'
const API_URL = 'http://localhost:8080/api/auth'
const user = process.client ? JSON.parse(localStorage.getItem('user')) : null
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const state = () => (initialState)

export const actions = {
  login ({ commit }, user) {
    console.log('auth.login.commit > ', commit)
    console.log('auth.login. user > ', user)
    axios
      .post(API_URL + '/signin', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        console.log('response.data.accessToken > ')
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
      .then(
        (user) => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        (error) => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
  },
  logout ({ commit }) {
    console.log('auth.logout.commit > ', commit)
    localStorage.removeItem('user')
  },
  register ({ commit }, user) {
    console.log('auth.register.commit > ', commit)
    console.log('auth.register.user > ', user)
    return axios
      .post(API_URL + '/signup', {
        username: user.username,
        email: user.email,
        password: user.password
      }).then(
        (response) => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
  }
}

export const mutations = {
  loginSuccess (state, user) {
    state.status.loggedIn = true
    state.user = user
  },
  loginFailure (state) {
    state.status.loggedIn = false
    state.user = null
  },
  logout (state) {
    state.status.loggedIn = false
    state.user = null
  },
  registerSuccess (state) {
    state.status.loggedIn = false
  },
  registerFailure (state) {
    state.status.loggedIn = false
  }
}
