<template>
  <div id="app">
    <van-tabbar v-model="active" route @change="onChange">
      <van-tabbar-item name="home" replace to="/" :icon="this.active == 'home' ? 'wap-home' : 'home-o'">
        首页
      </van-tabbar-item>
      <van-tabbar-item name="about" replace to="/about" :icon="this.active == 'about' ? 'friends' : 'friends-o'">
        我的
      </van-tabbar-item>
    </van-tabbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: "home"
    }
  },
  comments: {

  },
  created() {
    console.log(process.env);
  },
  methods: {
    onChange(index) {
      console.log(process.env);
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
