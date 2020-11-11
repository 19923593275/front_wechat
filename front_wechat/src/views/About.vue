<template>
  <div class="about">
    <div class="my-head">
      <van-row gutter="6">
        <van-col span="6">
          <van-image round width="1.5rem" height="1.5rem" :src="this.userInfo.head_img"></van-image>
        </van-col>
        <van-col span="12" class="nick">
          <div style="padding:0.15rem 0;">
            <span class="nick-name">{{this.userInfo.nick_name}}</span>
          </div>
          <div style="padding:0.1rem 0;">
            <span class="nick-level">等级</span>
          </div>
        </van-col>
        <van-col span="6">
          <span class="qian-dao">签到</span>
        </van-col>
      </van-row>
    </div>
    <div class="my-info">
      <van-row>
        <van-col span="6">
          <card v-bind:card="card1" @click.native="jumpUrl('music-index')"></card>
        </van-col>
        <van-col span="6">
          <card v-bind:card="card2" @click.native="jumpUrl('music-index')"></card>
        </van-col>
        <van-col span="6">
          <card v-bind:card="card3"></card>
        </van-col>
        <van-col span="6">
          <card v-bind:card="card4"></card>
        </van-col>
      </van-row>
    </div>
    <div class="my-game" >
      <van-image @click="jumpUrl('game')" scale-down width="9.4rem" :src="gameBanner"></van-image>
    </div>
    <div class="my-function">
      <van-row style="padding-top:0;">
        <van-col span="12">
          <i class="iconfont icon-phone"></i><span>手机号码</span>
        </van-col>
        <van-col span="12">
          <p v-if="this.isPhone">已绑定{{this.userInfo.user_tel}}</p>
          <p v-else @click="jumpUrl('bind-phone')">前往绑定手机号码</p>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="12">
          <i class="iconfont icon-bangzhu"></i><span>帮助中心</span>
        </van-col>
        <van-col span="12">
          <p><i class="iconfont icon-next" @click="jumpUrl('help')"></i></p>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="12">
          <i class="iconfont icon-fankui"></i><span>问题反馈</span>
        </van-col>
        <van-col span="12">
          <p><i class="iconfont icon-next" @click="jumpUrl('face-back')"></i></p>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="12">
          <i class="iconfont icon-fuwu"></i><span>服务协议</span>
        </van-col>
        <van-col span="12">
          <p><i class="iconfont icon-next" @click="jumpUrl('service')"></i></p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import {Row, Col} from 'vant'
import {getUserInfo} from '@/utils/cache'
import Card from '@/components/Card'
export default {
  name: 'about',
  components: {
    'card': Card
  },
  data () {
    return {
      card1: {
        isZdy: false,
        name: '音乐',
        imgStyle: 'width: 1rem;height: 1rem;padding: 0.06rem;margin-bottom: -0.09rem;',
        imgUrl: require('../assets/home/home-baner-1.jpg'),
        class: 'icon-yanchu',
        iconStyle: 'font-size:1rem;color:#0dbb0b;'
      },
      card2: {
        isZdy: false,
        name: '留言',
        imgStyle: '',
        imgUrl: '',
        class: 'icon-pinglun',
        iconStyle: 'font-size:1rem;color:#f5b41d;'
      },
      card3: {
        isZdy: false,
        name: '社区',
        imgStyle: '',
        imgUrl: '',
        class: 'icon-shequ',
        iconStyle: 'font-size:1rem;color:#17c4fb;'
      },
      card4: {
        isZdy: false,
        name: '点赞',
        imgStyle: '',
        imgUrl: '',
        class: 'icon-dianzan',
        iconStyle: 'font-size:1rem;color:#fb3232;'
      },
      gameBanner: require('../assets/img/about/my-game-banner.jpg'),
      isPhone:false
    }
  },
  computed: {
    userInfo() {
      const user = getUserInfo();
      if (user.user_tel != 0 && user.user_tel != null) {
        this.isPhone = true;
      }
      return user;
    }
  },
  methods: {
    jumpUrl(url) {
      console.log("url == " + url)
      if(url == 'face-back' && !this.isPhone) {
        this.$toast.fail('请先绑定手机号码');
        return;
      } else if (url == 'game' && !this.isPhone) {
        this.$toast.fail('绑定手机后才能参与游戏!');
        return;
      }
      this.$router.push(`/${url}`);
    }
  }
}
</script>
<style lang="scss">
  .about {
    margin: 0.3rem;
    .my-head{
      padding: 0.5rem 0;
      .nick {
        text-align: left;
        div{
          font-size: 0;
        }
        .nick-name {
          text-align: left;
          font-size: 0.4rem;
        }
        .nick-level {
          font-size: 0.3rem;
          color: #c3c3c3;
        }
      }
      .qian-dao {
        font-size: 0.4rem;
      }
    }
    .my-info{
      box-shadow: 1px 1px 4px #c3c3c3;
      padding: 0.1rem;
    }
    .my-game {
      padding: 0.2rem 0;

    }
    .my-function{
      padding: 0.1rem 0;
      .van-row {
        padding-top: 0.5rem;
        .van-col {
          display: flex;
          align-items: center;
          i {
            font-weight: 600;
            font-size: 0.5rem;
          }
          span {
            font-size: 0.35rem;
            font-weight: 600;
            padding: 0 0.15rem;
          }
          p {
            font-size: 0.3rem;
            font-weight: 600;
            width: 100%;
            text-align: right;
          }
        }
      }
      
    }
  }
</style>

