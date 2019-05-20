<template>
  <div class="header-page">
    <div class="header-page__cover" v-if="show&&fixHead" @click="showMenu"></div>
    <header class="header-page__nav" :class="{'show': show&&fixHead, 'fix-header': fixHead, 'no-fix': !fixHead}">
      <div class="header-page__nav--toolbar" v-if="fixHead" @click="openMenu"></div>
      <span class="header-page__nav--title" v-text="pageType"></span>
      <router-link to="/add">
        <i class="iconfont header-page__nav--addicon" v-if="needAdd" v-show="!messageCount || messageCount <= 0">&#xe60f;</i>
      </router-link>
    </header>
    <nav-menu :show-menu="show" v-if="fixHead"></nav-menu>
  </div>
</template>

<script>
import navMenu from './Menu.vue'
export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    fixHead: Boolean,
    pageType: String,
    messageCount: Number,
    needAdd: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showMenu() {
      this.show = !this.show;
      document.body.style = 'overflow: hidden;';
    },
    openMenu() {
      this.show = !this.show;
      document.body.style = 'overflow: auto;';
    }
  },
  components: {
    navMenu
  }
}
</script>

<style scoped>
@import url('../assets/css/header.min.css');
</style>
