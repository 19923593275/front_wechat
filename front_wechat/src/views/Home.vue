<template>
  <div class="home">
    <van-button type="default">默认按钮</van-button>
    <van-swipe :autoplay="3000">

      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Button, Swipe, SwipeItem } from 'vant';
export default {
  name: 'home',
  data () {
    return {
      images: [
        '../assets/home/home-baner-1.jpg',
        '../assets/home/home-baner-1.jpg'
      ]
    }
  },
  components: {
  }
}
</script>
