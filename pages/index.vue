<template>
  <div>
    <div>Home</div>
    <button @click="goLogin">
      goLogin
    </button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    // TODO: 로그인 안되있으면 login 페이지로 이동, 로그인 되어있으면
  },
  methods: {
    goLogin () {
      this.$router.push('/Login')
    }
  }
}
</script>
