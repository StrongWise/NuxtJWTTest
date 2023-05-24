<template>
  <div>
    <div>Home</div>
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
    async loginCheck () {
      await
      this.$router.push('/Login')
    }
  }
}
</script>
