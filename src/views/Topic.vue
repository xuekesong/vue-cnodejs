<template>
  <div>
    <nav-head page-type="主题" :show-menu="showMenu" :need-add="true" :fix-head="true"></nav-head>

    <div class="topic" v-if="topic.title">
      <h2 class="topic-title" v-text="topic.title"></h2>
      <div class="topic-author">
        <img class="topic-author__avatar" :src="topic.author.avatar_url" >
        <div class="topic-author__col">
          <span>{{ topic.author.loginname }}</span>
          <time>发布于：{{topic.create_at | getLastTimeStr(true)}}</time>
        </div>
        <div class="topic-author__browse">
          <span class="tag"
            :class="getTabInfo(topic.tab, topic.good, topic.top, true)"
            v-text="getTabInfo(topic.tab, topic.good, topic.top, false)">
          </span>
          <span class="name">{{topic.visit_count}}次浏览</span>
        </div>
      </div>

      <section class='markdown-body topic-content' v-html="topic.content"></section>

      <h3 class="topic-reply">
        <strong>{{topic.reply_count}}</strong> 回复
      </h3>

      <ul class="reply-list">
        <li v-for="item in topic.replies">
          <div class="user">
            <router-link :to="{name:'user',params:{loginname:item.author.loginname}}">
              <img class="head" :src="item.author.avatar_url"/>
            </router-link>
            <div class="info">
              <span class="cl">
                <span class="name" v-text="item.author.loginname"></span>
                <span class="name mt10">
                  <span></span>
                  发布于:{{item.create_at | getLastTimeStr(true)}}</span>
              </span>
              <span class="cr">
                <span class="iconfont icon"
                  @click="upReply(item)">&#xe608;</span>
                {{item.ups.length}}
                <span class="iconfont icon" @click="addReply(item.id)">&#xe609;</span>
              </span>
            </div>
          </div>
          <div class="reply_content" v-html="item.content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import navHead from '@/components/Header.vue'
import { getLastTimeStr, getTabInfo } from '@/libs/utils.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showMenu: false,
      topic: {},
      topicId: '',
      noData: false,//话题是否存在
      curReplyId: ''
    }
  },
  filters: {
    getLastTimeStr(time, isFromNow) {
      return getLastTimeStr(time, isFromNow);
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  mounted() {
    var _this = this;

    // 获取url传的tab参数
    this.topicId = this.$route.params.id;

    //获取数据
    this.$http.get('https://cnodejs.org/api/v1/topic/' + this.topicId).then((res) => {
      if (res && res.data.data) {
        _this.topic = res.data.data;
      } else {
        _this.noData = true;
      }
    })
  },
  methods: {
    getTabInfo(tab, good = false, top, isClass) {
      return getTabInfo(tab, good, top, isClass);
    },
    upReply(item) {
      if (!this.userInfo.userId) {
        this.$router.push({
          name: 'login',
          params: {
            redirect: encodeURIComponent(this.$route.path)
          }
        })
      } else {
        this.$http.post('https://cnodejs.org/api/v1/reply/' + item.id + '/ups', {
          accesstoken: this.userInfo.token
        }).then(res => {
          
        })
      }
    },
    addReply(id) {
      this.curReplyId = id;
      if (!this.userInfo.userId) {
        this.$router.push({
          name: 'login',
          params: {
            redirect: encodeURIComponent(this.$route.path)
          }
        })
      }
    }
  },
  components: {
    navHead
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/topic.min.css');
</style>
