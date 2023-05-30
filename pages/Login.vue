<template>
  <div>
    <div class="login">
      <el-card>
        <h2>Login</h2>
        <el-form
          ref="form"
          class="login-form"
          :model="form"
          :rules="rules"
          @submit.native.prevent="onSubmit"
        >
          <el-form-item prop="username">
            <label class="label">Username</label>
            <el-input
              v-model="form.username"
              placeholder="Username"
              prefix-icon="fas fa-user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <label class="label">Password</label>
            <el-input
              v-model="form.password"
              placeholder="Password"
              type="password"
              prefix-icon="fas fa-lock"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              native-type="submit"
              block
            >
              Login
            </el-button>
          </el-form-item>
          Don't have an account yet? <nuxt-link to="/Register">
            Register now
          </nuxt-link>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { common } from '~/mixin/common.js'

export default {
  name: 'Login',
  mixins: [common],
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: 'Username is required',
            trigger: 'blur'
          },
          {
            min: 2,
            message: 'Username length should be at least 2 characters',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          {
            min: 5,
            message: 'Password length should be at least 5 characters',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/profile')
    }
  },
  methods: {
    async onSubmit () {
      console.log('Login onSubmit')
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.loading = true
      await axios
        .post('http://localhost:8080/api/auth/signin', this.form)
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data))
          }
          this.$store.commit('auth/loginSuccess', this.form)
          this.$message.success('Login successfull')
          this.$router.push('/profile')
        })
        .catch((error) => {
          this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          this.$store.commit('auth/loginFailure')
          this.$message.error(this.message)
        })
      this.loading = false
    },
    goPage (url) {
      if (url) {
        this.$router.push(url)
      }
    }
  }
}
</script>

<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.label {
  font-weight: 600;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
</style>
