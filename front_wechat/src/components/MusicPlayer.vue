<template>
    <div id="player">
        <div v-for="(item,index) in list" :key="item.id" :class="index < 1  ? 'item1' : (index % 2 == 0 ? 'item3' : 'item2')">
            <van-row gutter="2">
                <van-col span="10">
                    <van-image width="1.791rem" height="1.791rem" fit="cover" :src="item.singer_img_url"/>
                </van-col>
                <van-col span="14">
                    <div class="author-div">
                        <div class="first-div">
                            <p class="song-name">{{item.music_name}} - {{item.singer}}</p>
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
        data () {
            return {
                index:0,
                indexMusic: {
                    id: 1,
                    music_name: '用余生去爱',
                    music_url: '',
                    singer: '张学友',
                    singer_img_url: '',
                    is_chosen: 1,
                    like_sum: 2,
                    comment_sum: 12
                },
                list: [
                    {
                        id: 1,
                        music_name: '烦恼歌',
                        music_url: '',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/fng.jpg',
                        is_chosen: 1,
                        like_sum: 2,
                        comment_sum: 12
                    },
                    {
                        id: 2,
                        music_name: '吻别',
                        music_url: '',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/wenbie.jpg',
                        is_chosen: 1,
                        like_sum: 2,
                        comment_sum: 12
                    },
                    {
                        id: 3,
                        music_name: '一千个伤心的理由',
                        music_url: '',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/yqgsxdly.jpg',
                        is_chosen: 1,
                        like_sum: 2,
                        comment_sum: 12
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    #player {
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
            margin-left: 0.2rem;
            padding: 0.2rem;
            background-color: #fff;
            float: left;
            font-size: 0;
            box-shadow: 0px 0px 3px;
            border-radius: 2px;
        }
        .item3 {
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