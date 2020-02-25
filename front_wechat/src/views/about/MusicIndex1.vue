<template>
    <div id="music-index">
        <div class="m-user">
            <div class="user-flex-left">
                <van-image style="width:1.5rem;height:1.5rem;margin-right:0.1rem;" round :src="this.userInfo.head_img"></van-image>
            </div>
            <div class="user-flex-right">
                <p>{{this.userInfo.nick_name}}</p>
            </div>
        </div>
        <music-player v-bind:musicList="musicList"></music-player>
        <div class="music-player">
            <audio id="myAudio" :src="this.indexPlayer.music_url"></audio>
            <div style="flex:2;">
                <van-image style="position: absolute;left: 0.1rem;bottom: 0.1rem;width:1rem;height:1rem;" round fit="cover" :src="this.indexPlayer.singer_img_url"></van-image>
            </div>
            <div style="flex:6;">
                <p class="specel-text common-text">{{`${this.indexPlayer.music_name}-${this.indexPlayer.singer}`}}</p>
            </div>
            <div style="flex:3;">
                <p style="width:1.875rem" class="common-text">
                    <i :style="btnStyle" class="iconfont icon-shangyiqu01" @click="handleSong(1)"></i>
                </p>
            </div>
            <div style="flex:2;">
                <p style="width:1.25rem" class="common-text">
                    <i :style="ztFlag" class="iconfont icon-zanting" @click="handleSong(2)"></i>
                    <i :style="bfFlag" class="iconfont icon-bofang" @click="handleSong(3)"></i>
                </p>
            </div>
            <div style="flex:3;">
                <p style="width:1.875rem" class="common-text">
                    <i :style="btnStyle" class="iconfont icon-xiayiqu01" @click="handleSong(4)"></i>
                </p>
            </div>
            <!-- <van-row gutter="4">
                <van-col span="6">

                </van-col>
                <van-col span="6">
                    
                </van-col>
                <van-col span="6">

                </van-col>
                <van-col span="6">

                </van-col>
            </van-row> -->
        </div>
        <van-tabbar v-model="active" @change="onChange">
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
    import wx from 'weixin-jsapi'
    import {Col, Row} from 'vant'
    import {getUserInfo} from '@/utils/cache'
    import user from '@/request/api/user';
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
                active: 0,// 0:推荐,1:排行榜,2:喜欢
                playerState: false,
                indexPlayer: {
                    id: '',
                    music_name: '',
                    music_url: '',
                    singer: '',
                    singer_img_url: '',
                    is_chosen: '',
                    like_sum: '',
                    comment_sum: '',
                    xh:0
                },
                musicData: {
                    tj: [],
                    phb: [],
                    like: []
                },
                musicList: [],
                likeSum: 0,
                icon: {
                    active: phb2,
                    inactive: phb1
                },
                btnStyle: 'font-size:0.7rem;color:#05bb05;',
                bfFlag: 'font-size:0.7rem;color:#05bb05;',
                ztFlag: 'font-size:0.7rem;color:#05bb05;display:none;'
            }
        },
        created() {
            this.musicData = {
                tj: [{
                        id: 1,
                        music_name: '烦恼歌',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E7%83%A6%E6%81%BC%E6%AD%8C.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/fng.jpg',
                        is_chosen: 1,
                        like_sum: 13,
                        comment_sum: 12,
                        xh:0
                    },
                    {
                        id: 2,
                        music_name: '吻别',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%90%BB%E5%88%AB.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/wenbie.jpg',
                        is_chosen: 0,
                        like_sum: 11,
                        comment_sum: 12,
                        xh:1
                    },
                    {
                        id: 3,
                        music_name: '一千个伤心的理由',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%B8%80%E5%8D%83%E4%B8%AA%E4%BC%A4%E5%BF%83%E7%9A%84%E7%90%86%E7%94%B1.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/yqgsxdly.jpg',
                        is_chosen: 0,
                        like_sum: 9,
                        comment_sum: 12,
                        xh:2
                    }],
                phb:[{
                        id: 1,
                        music_name: '烦恼歌',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E7%83%A6%E6%81%BC%E6%AD%8C.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/fng.jpg',
                        is_chosen: 1,
                        like_sum: 13,
                        comment_sum: 12,
                        xh:0
                    },
                    {
                        id: 2,
                        music_name: '吻别',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%90%BB%E5%88%AB.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/wenbie.jpg',
                        is_chosen: 0,
                        like_sum: 11,
                        comment_sum: 12,
                        xh:1
                    },
                    {
                        id: 3,
                        music_name: '一千个伤心的理由',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%B8%80%E5%8D%83%E4%B8%AA%E4%BC%A4%E5%BF%83%E7%9A%84%E7%90%86%E7%94%B1.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/yqgsxdly.jpg',
                        is_chosen: 0,
                        like_sum: 9,
                        comment_sum: 12,
                        xh:2
                    }],
                like:[{
                        id: 3,
                        music_name: '一千个伤心的理由',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%B8%80%E5%8D%83%E4%B8%AA%E4%BC%A4%E5%BF%83%E7%9A%84%E7%90%86%E7%94%B1.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/yqgsxdly.jpg',
                        is_chosen: 0,
                        like_sum: 9,
                        comment_sum: 12,
                        xh:0
                    }]
            };
            console.log("musicData ========",this.musicData);
            this.musicList = this.musicData.tj;
            console.log("初始化musicList = ", this.musicList);
            this.indexPlayer = this.musicData.tj[0];
            this.likeSum = this.musicData.like.length;
            const data = {
                url: location.href.split('#')[0]
            };
            user.getWxConfig(data)
                .then(res => {
                    console.log("jssdk验证消息", res);
                    if (res.status != 200) {
                        this.$toast.fail('验证jssdk异常');
                        return;
                    }
                    if (res.data.stateCode != 0) {
                        this.$toast.fail(res.data.message);
                        return;
                    }
                    let {appId, noncestr, signature, timestamp} = res.data.data;
                    console.log("=====",appId,noncestr,signature,timestamp)
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: appId, // 必填，公众号的唯一标识
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr: noncestr, // 必填，生成签名的随机串
                        signature: signature,// 必填，签名
                        jsApiList: ['playVoice'] // 必填，需要使用的JS接口列表
                    });
                })
                .catch(error => {
                    console.log("验证jssdk异常",error);
                    this.$toast.fail('验证jssdk异常');
                })
        },
        computed: {
            userInfo() {
                const user = getUserInfo();
                return user;
            }
        },
        mounted() {
            let _this = this;
            let $audio = document.getElementById("myAudio");//获取音乐DOM节点
            console.log($audio);
            // console.log($audio);
            $audio.addEventListener("playing", function(){
                    console.log("监听播放状态")
                    _this.$toast.clear();
                    //播放状态Doing
                    _this.bfFlag = 'font-size:0.7rem;color:#05bb05;display:none;';
                    _this.ztFlag = 'font-size:0.7rem;color:#05bb05;';
                    _this.playerState = true;
            });
            $audio.addEventListener("pause", function(){ 
                    console.log("暂停状态")
                    //暂停状态Doing
                    _this.bfFlag = 'font-size:0.7rem;color:#05bb05;';
                    _this.ztFlag = 'font-size:0.7rem;color:#05bb05;display:none;';
                    _this.playerState = false;
            });
            $audio.addEventListener("ended", function(){ 
                    _this.handleSong(4, true);
            });
        },
        methods: {
            refreshSongData() {

            },
            onChange (index) {
                switch(index) {
                    case 0:
                        this.musicList = this.musicData.tj;
                        if (!this.playerState && this.musicData.tj.length > 0) {
                            this.indexPlayer = this.musicData.tj[0];
                        }
                        break;
                    case 1:
                        this.musicList = this.musicData.phb;
                        if (!this.playerState && this.musicData.phb.length > 0) {
                            this.indexPlayer = this.musicData.phb[0];
                        }
                        break;
                    case 2:
                        this.musicList = this.musicData.like;
                        if (!this.playerState && this.musicData.like.length > 0) {
                            this.indexPlayer = this.musicData.like[0];
                        }
                        break;
                    default:
                        this.musicList = this.musicData.tj;
                        if (!this.playerState && this.musicData.tj.length > 0) {
                            this.indexPlayer = this.musicData.tj[0];
                        }
                }
            },
            handleSong(type, isFlag) {
                let myAudio = document.getElementById("myAudio");
                let xh = this.indexPlayer.xh;
                let indexMusicList = this.getIndexMusicList() || [];
                let length = indexMusicList.length;
                switch(type) {
                    case 1:
                        if (length > 1) {
                            if (xh == 0) {
                                this.indexPlayer = this.musicList[length-1];
                                this.playAudio(false);
                            } else {
                                this.indexPlayer = this.musicList[xh-1];
                                this.playAudio(false);
                            }
                        }
                        break;
                    case 2:
                        this.pauseAudio();
                        break;
                    case 3:
                        this.playAudio(true);
                        break;
                    case 4:
                        if (length > 1) {
                            if (xh == length-1) {
                                if (!isFlag) {
                                    this.indexPlayer = this.musicList[0];
                                    this.playAudio(false);
                                }
                            } else {
                                this.indexPlayer = this.musicList[xh+1];
                                this.playAudio(false);
                            }
                        }
                        break;
                    default:
                        console.log("操作类型错误 ===== ")

                }
            },
            playAudio(flag) {
                let myAudio = document.getElementById("myAudio");
                
                if (flag) {
                    wx.ready(() => {
                        myAudio.play();
                    })
                    myAudio.play();
                } else {
                    myAudio.load();
                    wx.ready(() => {
                        myAudio.play();
                    })
                }
            },
            pauseAudio() {
                let myAudio = document.getElementById("myAudio");
                myAudio.pause();
                // this.bfFlag = 'font-size:0.7rem;color:#05bb05;';
                // this.ztFlag = 'font-size:0.7rem;color:#05bb05;display:none;';
            },
            getIndexMusicList() {
                if (this.active == 0) {
                    return this.musicData.tj;
                } else if (this.active == 1) {
                    return this.musicData.phb;
                } else {
                    return this.musicData.like;
                }
            }
        },
    }
</script>

<style lang="scss">
    #music-index {
        .m-user {
            padding: 0.2rem 0;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0;
            .user-flex-left {
                flex: 1;
                text-align: right;
            }
            .user-flex-right {
                flex: 1;
                text-align: left;
                p {
                    width: 4.8rem;
                    overflow: hidden;
                    padding-left: 0.1rem;
                    font-size: 0.35rem;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            
        }
        .music-player {
            height: 1rem;
            position: fixed;
            bottom: 1.33333rem;
            left: 0;
            z-index: 1;
            display: -webkit-box;
            display: flex;
            box-sizing: content-box;
            width: 100%;
            background-color: #fff;
            text-align: center;
            font-size: 0;
            .specel-text {
                text-align: left;
                width: 3.75rem;
            }
            .common-text {
                font-size: 0.33rem;
                line-height: 1rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
</style>