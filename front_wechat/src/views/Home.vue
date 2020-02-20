<template>
  <div class="home">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" style="width:100%;height:225px;"/>
      </van-swipe-item>
    </van-swipe>
    <van-button @click="addLogSatus">addLogSatus</van-button>
    <van-button @click="getLogStatus">logStatus</van-button>
  </div>
</template>

<script>
import { Button, Swipe, SwipeItem } from 'vant';
export default {
  name: 'home',
  data () {
    return {
      images: [
        require('../assets/home/home-baner-1.jpg'),
        require('../assets/home/home-baner-2.jpg'),
        require('../assets/home/home-baner-3.jpg')
      ],
      age: 0
    }
  },
  components: {
  },
  created() {
    // this.$api.user.userLogin({})
    //   .then(res => {
    //     console.log(res);
    //   }).catch(error => {
    //     console.log("submitLoginForm error", error);
    //   })
  },
  methods: {
    getLogStatus() {
      alert(Number(this.$store.getters.loginStatus));
      console.log(this.$store.state.user.userInfo)
    },
    addLogSatus() {
      this.age++;
      this.$store.dispatch('user/setLoginStatus', this.age);
    }
  },
}
</script>
