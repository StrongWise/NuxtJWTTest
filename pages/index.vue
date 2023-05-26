<template>
  <div>
    <div class="home">
      <el-card>
        <h2>HOME</h2>
        <el-button
          class="login-button"
          type="primary"
          native-type="submit"
          @click="loginBtn"
        >
          Login
        </el-button>
        <el-button
          class="logout-button"
          type="primary"
          native-type="submit"
          @click="logoutBtn"
        >
          LogOut
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  mounted () {
    this.loginCheck()
  },
  methods: {
    currentUser () {
      return this.$store.state.auth.user
    },
    async loginCheck () {
      // await this.$router.push('/home')
    },
    loginBtn () {
      console.log('this.$store.state.auth.user > ', this.$store.state.auth.user)
      console.log('this.$store.state.auth.status.loggedIn > ', this.$store.state.auth.status.loggedIn)

      this.$router.push('/login')
    },
    logoutBtn () {
      console.log('this.$store.state.auth.user > ', this.$store.state.auth.user)
      console.log('this.$store.state.auth.status.loggedIn > ', this.$store.state.auth.status.loggedIn)

      this.$store.dispatch('auth/logout')
      // this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-button .logout-button {
  width: 100%;
  margin-top: 40px;
}
</style>
