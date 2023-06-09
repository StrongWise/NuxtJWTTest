<template>
  <div>
    <div class="register">
      <el-card>
        <h2>Register</h2>
        <el-form
          ref="form"
          class="register-form"
          :model="form"
          :rules="rules"
          @submit.native.prevent="onSubmit"
        >
          <el-form-item prop="username">
            <label class="label">Username</label>
            <el-input
              v-model="form.username"
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
              v-model="form.email"
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
              v-model="form.password"
              placeholder="Password"
              :type="fieldTypes.password"
              autocomplete="off"
              name="password"
              prefix-icon="fas fa-lock"
              @focus="handleType"
              @blur="handleType"
            />
          </el-form-item>

          <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
            <el-checkbox v-for="item in roles" :key="item.id" :label="item" />
          </el-checkbox-group>
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
import { common } from '~/mixin/common.js'

export default {
  name: 'Register',
  mixins: [common],
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        role: []
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
          { required: true, message: 'Password is required!', trigger: 'blur' },
          { min: 6, message: 'Must be at least 6 characters!', trigger: 'blur' },
          { max: 40, message: 'Must be maximum 40 characters!', trigger: 'blur' }
        ]
      },
      roles: ['user', 'admin', 'mod'],
      checkedRoles: []
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  mounted () {
    if (this.loggedIn) { // 로그인 되어있으면 프로필로 이동
      this.$router.push('/profile')
    }
  },
  methods: {
    async onSubmit () {
      console.log('Register onSubmit')

      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.loading = true
      await axios
        .post('http://localhost:8080/api/auth/signup', this.form)
        .then((response) => {
          console.log('/signup response > ', response)
          this.$store.commit('auth/registerSuccess')
          this.$message.success(response.data.message)
          this.$router.push('/login')
        })
        .catch((error) => {
          this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          this.$store.commit('auth/registerFailure')
          this.$message.error(this.message)
          this.loading = false
        })
    },
    handleCheckedRolesChange (val) {
      this.form.role = val
    },
    handleType (event) {
      const { srcElement, type } = event
      const { name, value } = srcElement

      if (type === 'blur' && !value) {
        this.fieldTypes[name] = 'text'
      } else {
        this.fieldTypes[name] = 'password'
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
