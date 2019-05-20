<template>
  <div>
    <nav-head page-type="登录"></nav-head>
    <div class="login-form">
      <div class="login-form__label">
        <input type="text" class="login-form__label--txt" placeholder="Access Token" v-model="token" maxlength="36">
      </div>
      <button class="login-form__btn" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import navHead from '@/components/Header.vue'
export default {
  data() {
    return {
      token: '',
      flag: false
    }
  },
  methods: {
    login() {
      var _this = this;
      if (this.token == '') {
        alert('令牌格式错误，应为36位UUID字符串');
        return false;
      }
      if (this.flag == true) {
        return false;
      }
      this.flag = true;
      this.$http.post('https://cnodejs.org/api/v1/accesstoken', {
        accesstoken: this.token
      }).then(res => {
        if (res.data.data) {
          let user = {
            loginname: res.data.data.loginname,
            avatar_url: res.data.data.avatar_url,
            userId: res.data.data.id,
            token: _this.token
          };
        }

        _this.$store.dispatch('setUserInfo', user);
        _this.$router.push({
          path: decodeURIComponent(_this.$route.query.redirect || '/')
        })
      }).catch(error => {
        console.log(error);
      })
    }
  },
  components: {
    navHead
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/login.min.css');
</style>
