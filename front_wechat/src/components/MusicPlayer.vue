<template>
    <div id="player" :style="pstyle">
        <div v-for="(item,index) in this.musicList" :key="item.xh" :class="index < 2  ? 'item1' : 'item2'">
            <van-row gutter="2">
                <van-col span="10">
                    <van-image width="1.791rem" height="1.791rem" fit="cover" :src="item.singer_img_url"/>
                </van-col>
                <van-col span="14">
                    <div class="author-div">
                        <div class="first-div">
                            <p class="song-name">{{`${index+1}.`}}{{item.music_name}} - {{item.singer}}</p>
                        </div>
                        <div class="second-div">
                            <van-row>
                                <van-col span="4">

                                </van-col>
                                <van-col span="6">
                                    <i class="iconfont icon-pinglun"></i>
                                </van-col>
                                <van-col span="4">

                                </van-col>
                                <van-col span="6">
                                    <i style="color:red;" class="iconfont icon-xihuanlike"></i>
                                </van-col>
                                <van-col span="4">
                                    
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
        <div class="song-clear"></div>
    </div>
</template>

<script>
    import {Col, Row} from 'vant'
    export default {
        name: 'music-player',
        props: {
            musicList: {
                type: Array,
                required: false
            }
        },
        data () {
            return {
                pstyle: '',
                // list: [
                //     {
                //         id: 1,
                //         music_name: '烦恼歌',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/fng.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:0
                //     },
                //     {
                //         id: 2,
                //         music_name: '吻别',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/wenbie.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:1
                //     },
                //     {
                //         id: 3,
                //         music_name: '一千个伤心的理由',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/yqgsxdly.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:2
                //     },
                //     {
                //         id: 1,
                //         music_name: '烦恼歌',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/fng.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:3
                //     },
                //     {
                //         id: 2,
                //         music_name: '吻别',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/wenbie.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:4
                //     },
                //     {
                //         id: 3,
                //         music_name: '一千个伤心的理由',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/yqgsxdly.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:5
                //     },
                //     {
                //         id: 1,
                //         music_name: '烦恼歌',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/fng.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:6
                //     },
                //     {
                //         id: 2,
                //         music_name: '吻别',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/wenbie.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:7
                //     },
                //     {
                //         id: 3,
                //         music_name: '一千个伤心的理由',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/yqgsxdly.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:8
                //     },
                //     {
                //         id: 1,
                //         music_name: '烦恼歌',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/fng.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:9
                //     },
                //     {
                //         id: 2,
                //         music_name: '吻别',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/wenbie.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:10
                //     },
                //     {
                //         id: 3,
                //         music_name: '一千个伤心的理由',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/yqgsxdly.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:11
                //     },
                //     {
                //         id: 1,
                //         music_name: '烦恼歌',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/fng.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:12
                //     },
                //     {
                //         id: 2,
                //         music_name: '吻别',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/wenbie.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:13
                //     },
                //     {
                //         id: 3,
                //         music_name: '一千个伤心的理由',
                //         music_url: '',
                //         singer: '张学友',
                //         singer_img_url: 'http://zxx9527.cn/wechat/static/img/yqgsxdly.jpg',
                //         is_chosen: 1,
                //         like_sum: 2,
                //         comment_sum: 12,
                //         xh:14
                //     }
                // ]
            }
        },
        created() {
            let cl = document.documentElement.clientWidth / 10;
            let height1 = document.documentElement.clientHeight - (cl * 4.23333);
            let height2 = 2.191 * cl;
            this.pstyle = height1 - height2 > 0 ? `height:${height1}px` : '';
        },
        mounted() {
            console.log("子组件的数据 ======== ", this.musicList)
            window.addEventListener("resize", this.renderResize, false);
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.renderResize, false);
        },
        methods: {
            renderResize() {
                let cl = document.documentElement.clientWidth / 10;
                let height1 = document.documentElement.clientHeight - (cl * 4.23333);
                let height2 = 2.191 * cl;
                this.pstyle = height1 - height2 > 0 ? `height:${height1}px` : '';
            }
        },
    }
</script>

<style lang="scss" scoped>
    #player {
        overflow: scroll;
        padding: 0.2rem 0;
        .item1 {
            width: 4.7rem;
            margin-left: 0.2rem;
            padding: 0.2rem;
            background-color: #fff;
            float: left;
            font-size: 0;
            box-shadow: 0px 0px 3px;
            border-radius: 2px;
        }
        .item2 {
            width: 4.7rem;
            margin: 0.2rem 0 0 0.2rem;
            padding: 0.2rem;
            background-color: #fff;
            float: left;
            font-size: 0;
            box-shadow: 0px 0px 3px;
            border-radius: 2px;
        }
        .author-div {
            width: 100%;
            height: 1.791rem;
            overflow: hidden;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            .first-div {
                width: 100%;
                height: 1rem;
                overflow: hidden;
                .song-name {
                    font-size: 0.32rem;
                    margin-top: 0.1rem;
                }
            }
            .second-div {
                width: 100%;
                height: 0.791rem;
                i {
                    font-size: 0.5rem;
                }
            }
        }
        .song-clear {
            clear: both;
        }
    }
</style>