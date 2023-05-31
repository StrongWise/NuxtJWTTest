// default state
export const state = () => ({ status: { loggedIn: false }, user: null })

export const actions = {
  // localStorage 에 저장된 유저 인증 정보 로드
  loadAuthFromLocalStorage ({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'))
    const initialState = user
      ? { status: { loggedIn: true }, user }
      : { status: { loggedIn: false }, user: null }
    commit('setInitialState', initialState)
  }
}

export const mutations = {
  setInitialState (state, initialState) {
    state.status.loggedIn = initialState.status.loggedIn
    state.user = initialState.user
  },
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
