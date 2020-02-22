<template>
    <div id="music-index">
        <div class="m-user"></div>
        <music-player></music-player>
        <div class="music-player">
            <van-row gutter="4">
                <van-col span="6">

                </van-col>
                <van-col span="6">
                    <van-image round width="1.5rem" height="1.5rem" :src="this.userInfo.head_img"></van-image>
                </van-col>
                <van-col span="6">

                </van-col>
                <van-col span="6">

                </van-col>
            </van-row>
            

        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item :icon="active == 0 ? 'fire' : 'fire-o'">推荐</van-tabbar-item>
            <van-tabbar-item>
                <span>排行榜</span>
                <img slot="icon" slot-scope="props" :src="props.active == 1 ? icon.active : icon.inactive">
            </van-tabbar-item>
            <van-tabbar-item :icon="active == 2 ? 'like' : 'like-o'" :info="likeSum">喜欢</van-tabbar-item>  
        </van-tabbar>
    </div>
</template>

<script>
    import {Col, Row} from 'vant'
    import {getUserInfo} from '@/utils/cache'
    import phb1 from '@/assets/img/music/paihangbang-o.png'
    import phb2 from '@/assets/img/music/paihangbang.png'
    import MusicPlayer from '@/components/MusicPlayer'
    export default {
        name: 'music-index',
        components: {
            'music-player': MusicPlayer
        },
        data() {
            return {
                active: 0,
                musicList: [],
                likeSum: 0,
                icon: {
                    active: phb2,
                    inactive: phb1
                }
            }
        },
        created() {
            
        },
        computed: {
            userInfo() {
                const user = getUserInfo();
                return user;
            }
        }
    }
</script>

<style lang="scss">
    #music-index {
        .m-user {
            padding: 0.2rem;
        }
        .music-player {
            position: fixed;
            bottom: 1.33333rem;
            left: 0;
            z-index: 1;
            display: -webkit-box;
            display: flex;
            box-sizing: content-box;
            width: 100%;
            padding: 0.2rem 0;
            background-color: #fff;
        }
    }
</style>