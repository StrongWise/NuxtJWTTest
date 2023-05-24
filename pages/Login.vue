<template>
  <div>
    <div class="login">
      <el-card>
        <h2>Login</h2>
        <el-form
          ref="form"
          class="login-form"
          :model="model"
          :rules="rules"
          @submit.native.prevent="loginSubmit"
        >
          <el-form-item prop="username">
            <label class="label">Username</label>
            <el-input v-model="model.username" placeholder="Username" prefix-icon="fas fa-user" />
          </el-form-item>
          <el-form-item prop="password">
            <label class="label">Password</label>
            <el-input
              v-model="model.password"
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
          <!-- <a class="forgot-password" href="https://oxfordinformatics.com/">Forgot password ?</a> -->
          <!-- <el-button class="login-button" native-type="submit" block @click="test()">
            test
          </el-button> -->
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
export default {
  name: 'Login',
  data () {
    return {
      validCredentials: {
        username: 'lightscope',
        password: 'lightscope'
      },
      model: {
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
            min: 4,
            message: 'Username length should be at least 5 characters',
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
  created () {
  },
  methods: {
    async test () {
      const data = {
        username: this.username,
        password: this.password
      }
      await axios.post('http://localhost:8080/api/auth/signin', data)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async login () {
      console.log(this.username, this.password)
      const url = 'http://localhost:8080/users'
      const data = {
        username: this.username,
        password: this.password
      }
      await axios.post(url, data)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async loginSubmit () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.loading = true
      await this.login()
      this.loading = false
      if (
        this.model.username === this.validCredentials.username &&
        this.model.password === this.validCredentials.password
      ) {
        this.$message.success('Login successfull')
      } else {
        this.$message.error('Username or password is invalid')
      }
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
