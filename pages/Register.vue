<template>
  <div>
    <div class="register">
      <el-card>
        <h2>Register</h2>
        <el-form
          ref="form"
          class="register-form"
          :model="model"
          :rules="rules"
          @submit.native.prevent="signUp()"
        >
          <el-form-item prop="username">
            <label class="label">Username</label>
            <el-input
              v-model="model.username"
              placeholder="Username"
              type="text"
              name="username"
              autocomplete="off"
              prefix-icon="fas fa-user"
            />
          </el-form-item>
          <el-form-item prop="email">
            <label class="label">Email</label>
            <el-input
              v-model="model.email"
              placeholder="Email"
              type="text"
              name="email"
              autocomplete="off"
              prefix-icon="fas fa-lock"
            />
          </el-form-item>
          <el-form-item prop="password">
            <label class="label">Password</label>
            <el-input
              v-model="model.password"
              placeholder="Password"
              :type="fieldTypes.password"
              autocomplete="off"
              name="password"
              prefix-icon="fas fa-lock"
              @focus="handleType"
              @blur="handleType"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="register-button"
              type="primary"
              native-type="submit"
              block
            >
              Sign Up
            </el-button>
          </el-form-item>
          <!-- <a class="forgot-password" href="https://oxfordinformatics.com/">Forgot password ?</a> -->
          Already have an account? <nuxt-link to="/Login">
            Sign in
          </nuxt-link>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
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
      fieldTypes: {
        password: 'text'
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: 'Username is required!', trigger: 'blur' },
          { min: 3, message: 'Must be at least 3 characters!', trigger: 'blur' },
          { max: 20, message: 'Must be maximum 20 characters!', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Email is required!', trigger: 'blur' },
          { type: 'email', message: 'Email is invalid!', trigger: ['blur', 'change'] },
          { max: 20, message: 'Must be maximum 50 characters!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'assword is required!', trigger: 'blur' },
          { min: 6, message: 'Must be at least 6 characters!', trigger: 'blur' },
          { min: 40, message: 'Must be maximum 40 characters!', trigger: 'blur' }
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
    async register () {
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
    async signUp () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.loading = true
      await this.register()
      this.loading = false
      if (
        this.model.username === this.validCredentials.username &&
        this.model.password === this.validCredentials.password
      ) {
        this.$message.success('register successfull')
      } else {
        this.$message.error('Username or password is invalid')
      }
    },
    handleType (event) {
      const { srcElement, type } = event
      const { name, value } = srcElement

      console.log('type > ', type)
      console.log('name > ', name)
      console.log('value > ', value)
      if (type === 'blur' && !value) {
        this.fieldTypes[name] = 'text'
      } else {
        this.fieldTypes[name] = 'password'
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
.register {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.label {
  font-weight: 600;
}

.register-button {
  width: 100%;
  margin-top: 40px;
}
.register-form {
  width: 290px;
}
</style>
