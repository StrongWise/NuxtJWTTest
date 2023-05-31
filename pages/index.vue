<template>
  <div>
    <div class="home">
      <el-card>
        <h2>HOME</h2>
        <h3 v-show="loggedIn">
          LogIn User : {{ currentUser?.username }}
        </h3>
        <el-button
          v-show="!loggedIn"
          class="login-button"
          type="primary"
          native-type="submit"
          @click="loginBtn"
        >
          Login
        </el-button>
        <el-button
          v-show="loggedIn"
          class="logout-button"
          type="primary"
          native-type="submit"
          @click="logoutBtn"
        >
          LogOut
        </el-button>
        <p>
          Don't have an account yet? <nuxt-link to="/Register">
            Register now
          </nuxt-link>
        </p>
        <div class="board">
          <p>{{ content }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      content: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    },
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  async created () {
    if (process.client) { // 브라우저(client)일 때 localStorage에 있는 유저 정보 로드
      await this.$store.dispatch('auth/loadAuthFromLocalStorage')
    }
    if (this.loggedIn) { // 로그인 되어있으면 프로필로 이동
      this.$router.push('/profile')
    }
  },
  mounted () {
    this.getAllBoardContent()
  },
  methods: {
    // 권한 필요없는 보드 컨텐츠 조회
    async getAllBoardContent () {
      await axios
        .get('http://localhost:8080/api/board/all')
        .then((response) => {
          this.content = response.data
        })
        .catch((error) => {
          this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        })
    },
    loginBtn () {
      this.$router.push('/login')
    },
    logoutBtn () {
      localStorage.removeItem('user')
      window.location.reload()
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

.board {
  color: red;
}
</style>
