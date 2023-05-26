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
          @submit.native.prevent="onSubmit"
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
          Don't have an account yet? <nuxt-link to="/Register">
            Register now
          </nuxt-link>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
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
  created () {
  },
  methods: {
    async onSubmit () {
      console.log('Login onSubmit')
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.loading = true
      await this.$store.dispatch('auth/login', this.model).then(
        () => {
          this.$message.success('Login successfull')
          this.$router.push('/')
        },
        (error) => {
          console.error(error)
          this.loading = false
          this.$message.error('Username or password is invalid')
        }
      )
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
