<template>
  <section class="nav-list" :class="{'show': showMenu}">
    <user-info></user-info>
    <section class="nav-list__ul">
      <router-link class="icon-quanbu iconfont nav-list__ul--item" :to="{'name':'list',query:{tab:'all'}}">全部</router-link>
      <router-link class="icon-hao iconfont nav-list__ul--item" :to="{'name':'list',query:{tab:'good'}}">精华</router-link>
      <router-link class="icon-fenxiang iconfont nav-list__ul--item" :to="{'name':'list',query:{tab:'share'}}">分享</router-link>
      <router-link class="icon-wenda iconfont nav-list__ul--item" :to="{'name':'list',query:{tab:'ask'}}">问答</router-link>
      <router-link class="icon-zhaopin iconfont nav-list__ul--item" :to="{'name':'list',query:{tab:'job'}}">招聘</router-link>
      <router-link class="icon-xiaoxi iconfont nav-list__ul--item line" :to="{'name':'message'}">消息</router-link>
      <router-link class="icon-about iconfont nav-list__ul--item" :to="{'name':'about'}">关于</router-link>
    </section>
  </section>
</template>

<script>
import UserInfo from '@/components/UserInfo'
export default {
  props: ['showMenu'],
  data() {
    return {

    }
  },
  components: {
    UserInfo
  }
}
</script>

<style scoped>
@import url('../assets/css/menu.min.css');
</style>
