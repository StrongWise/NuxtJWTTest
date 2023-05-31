<template>
  <div class="profile">
    <el-card>
      <h3>
        <strong>Username:</strong>
        {{ currentUser?.username }}
      </h3>
      <p>
        <strong>Token:</strong>
        {{ currentUser?.accessToken.substring(0, 20) }} ... {{ currentUser?.accessToken.substr(currentUser?.accessToken.length - 20) }}
      </p>
      <p>
        <strong>Id:</strong>
        {{ currentUser?.id }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ currentUser?.email }}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="role in currentUser?.roles" :key="role">
          {{ role }}
          <el-button class="login-button" @click="getContent(role)">
            getContent
          </el-button>
        </li>
      </ul>

      <el-button
        class="login-button"
        type="primary"
        native-type="submit"
        @click="logoutBtn"
      >
        logout
      </el-button>

      <el-button
        class="login-button"
        type="primary"
        native-type="submit"
        @click="clearBtn"
      >
        clear
      </el-button>
      <ul>
        <li v-for="content in contents" :key="content">
          {{ content }}
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import { common } from '~/mixin/common.js'

export default {
  name: 'Profile',
  mixins: [common],
  data () {
    return {
      contents: []
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth?.user
    }
  },
  mounted () {
    if (!this.currentUser) { // 유저 정보가 없으면 로그인화면으로 이동
      this.$router.push('/login')
    }
  },
  methods: {
    logoutBtn () {
      localStorage.removeItem('user')
      window.location.reload()
    },
    clearBtn () {
      this.contents = []
    },
    async getContent (role) {
      const url = this.setRole(role)
      await axios
        .get('http://localhost:8080/api/board/' + url, { headers: this.authHeader() })
        .then((response) => {
          this.contents.push(response.data)
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
    setRole (role) {
      if (role === 'ROLE_USER') {
        return 'user'
      } else if (role === 'ROLE_MODERATOR') {
        return 'mod'
      } else if (role === 'ROLE_ADMIN') {
        return 'admin'
      } else {
        return 'all'
      }
    }
  }
}
</script>

<style scoped>
.profile {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
