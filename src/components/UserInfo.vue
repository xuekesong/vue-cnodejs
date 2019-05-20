<template>
  <div class="user-info">
    <!-- 未登录 -->
    <ul class="logo-no" v-if="!userInfo.loginname">
      <li class="logo-no__li" @click="goEnter">
        <a>登录</a>
      </li>
    </ul>
    <!-- 已登录 -->
    <div class="logo-ye" v-if="userInfo.loginname" @click="goUser">
      <div class="avatar">
        <img v-if="userInfo.avatar_url" :src="userInfo.avatar_url" >
      </div>
      <div class="info">
        <p v-if="userInfo.loginname" v-text="userInfo.loginname"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({//扩展运算符
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    goEnter() {
      this.$router.push({
        name: 'logo',
        query: {
          redirect: encodeURIComponent(this.$route.path)
        }
      })
    },
    goUser() {
      this.$router.push({
        name: 'user',
        params: {
          loginname: this.userInfo.loginname
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/user-info.min.css');
</style>
