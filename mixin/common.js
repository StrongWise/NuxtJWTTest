export const common = {
  methods: {
    /**
     * 인증정보가 필요한 api에 header 추가하는 method
     */
    authHeader () {
      const user = JSON.parse(localStorage.getItem('user'))

      if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken } // for Spring Boot back-end
      } else {
        return {}
      }
    }
  }
}
