// import axios from 'axios'

export const state = () => ({
  loggedIn: false,
  user: null
})

export const actions = {
  login ({ state }) {
    console.log('auth.login.state > ', state)
    // await axios
    //   .post('http://localhost:8080/api/auth/signin', {
    //     username: state.user.username,
    //     password: state.user.password
    //   })
    //   .then((response) => {
    //     if (response.data.accessToken) {
    //       localStorage.setItem('user', JSON.stringify(response.data))
    //     }

    //     return response.data
    //   })
    // const res = { data: 10 }
    // state.counter = res.data
    // return res.data
  },
  logout ({ state }) {
    console.log('auth.logout.state > ', state)
    localStorage.removeItem('user')
  },
  register ({ state }) {
    console.log('auth.register.state > ', state)
    // await axios
    //   .post('http://localhost:9090/api/auth/signin', {
    //     username: state.user.username,
    //     password: state.user.password
    //   })
    //   .then((response) => {
    //     if (response.data.accessToken) {
    //       localStorage.setItem('user', JSON.stringify(response.data))
    //     }

    //     return response.data
    //   })
    // const res = { data: 10 }
    // state.counter = res.data
    // return res.data
  }
}
