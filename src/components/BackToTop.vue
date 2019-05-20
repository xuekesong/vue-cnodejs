<template>
  <div class="iconfont icon-top" v-show="show" @click="goTop">&#xe611;</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      scrollTop: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scrollTop > 100) {
        this.show = true;
      } else {
        this.show = false;
      }
    })
  },
  methods: {
    goTop() {
      let _this = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-_this.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop = _this.scrollTop + ispeed;
        if (_this.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16)
    }
  }
}
</script>

<style lang="less" scoped>
.icon-top{
  position: fixed;
  right: 10px;
  bottom: 80px;
  font-size: 50px;
  z-index: 9999;
  color: #42b983;
}
</style>
