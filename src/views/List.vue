<template>
  <div>
    <nav-head :fix-head="true" :need-add="true" :page-type="getTitleStr(searchKey.tab)"></nav-head>

    <section class="list-content" ref="listBox" >
      <ul class="list-content__ul">
        <router-link :to="{name:'topic',params:{id:item.id}}" class="list-content__ul--li" tag="li" v-for="item in topics" :key="item.id">
          <h3 class="list-content__ul--li--title" v-text="item.title" :class="getTabInfo(item.tab, item.good, item.top,true)" :title="getTabInfo(item.tab, item.good, item.top, false)"></h3>
          <div class="list-content__ul--li--intro">
            <img class="list-content__ul--li--intro--img" :src="item.author.avatar_url" >
            <div class="list-content__ul--li--intro--content">
              <div>
                <span class="name">{{item.author.loginname}}</span>
                <span class="status" v-if="item.reply_count > 0">
                  <b>{{item.reply_count}}</b>
                  /{{item.visit_count}}
                </span>
              </div>
              <div>
                <time>{{item.create_at | getLastTimeStr(true)}}</time>
                <time>{{item.last_reply_at | getLastTimeStr(true)}}</time>
              </div>
            </div>
            
          </div>
        </router-link>
      </ul>
    </section>

    <nav-top></nav-top>
  </div>
</template>

<script>
import navHead from '@/components/Header.vue'
import navTop from '@/components/BackToTop.vue'
import {getLastTimeStr, getTabInfo, throttle} from '@/libs/utils.js'
export default {
  filters: {
    getLastTimeStr(time, isFromNow) {
      return getLastTimeStr(time, isFromNow);
    }
  },
  data() {
    return {
      searchKey: {
        page: 1,
        limit: 20,
        tab: 'all',
        mdrender: true
      },
      topics: [],
      scroll: true
    }
  },
  mounted() {
    this.getTopics();

    //滚动加载
    window.addEventListener('scroll', throttle(this.getScrollData, 300, 1000))
  },
  methods: {
    getTitleStr(tab) {
      let str = '';
      switch (tab) {
        case 'share':
          str = '分享';
          break;
        case 'ask':
          str = '问答';
          break;
        case 'job':
          str = '招聘';
          break;
        case 'good':
          str = '精华';
          break;
        default:
          str = '全部';
          break;
      }
      return str;
    },
    getTabInfo(tab, good, top, isClass) { // 获取不同tab的样式或者标题
        return getTabInfo(tab, good, top, isClass);
    },
    getTopics() {//获取数据
      var _this = this;
      let params = this.changeObjStyle(this.searchKey);
      this.$http.get('https://cnodejs.org/api/v1/topics?' + params).then(res => {
        _this.scroll = true;
        if (res && res.data.data) {
          res.data.data.forEach((topic) => {
            _this.topics.push(topic)
          })
        }
      })
    },
    changeObjStyle(obj) {
      let str = [];
      for (let item in obj) {
        str.push(item + '=' +obj[item]);
      }
      return str.join('&');
    },
    getScrollData() {
      if (this.$refs.listBox && this.scroll) {
        let totalHeight = parseInt(window.innerHeight) + parseInt(this.$refs.listBox.scrollTop);
        if (this.$refs.listBox.scrollTop <= totalHeight + 500) {
          this.scroll = false;
          this.searchKey.page += 1;
          this.getTopics();
        }
      }
    }
  },
  components: {
    navHead,
    navTop
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/list.min.css');
</style>

