<template>
  <div id="app">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1重庆周星星" /> -->
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
    console.log(this.$route);
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

html, body, div, applet, object, iframe, span,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dd, dt, ol, ul, li,
fieldset, label, form, legend,
table, caption, tbody, thead, tfoot, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input{
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-weight: normal;
  box-sizing: border-box;
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
