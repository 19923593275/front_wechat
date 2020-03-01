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
                        music_id: 2,
                        music_name: '左右为难',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%B7%A6%E5%8F%B3%E4%B8%BA%E9%9A%BE.mp3',
                        singer: '张学友/郑中基',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/zywn.jpg',
                        is_chosen: 1,
                        like_sum: 98,
                        comment_sum: 12,
                        xh:0
                    },
                    {
                        music_id: 3,
                        music_name: '世界这么大还是遇见你',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%B8%96%E7%95%8C%E8%BF%99%E4%B9%88%E5%A4%A7%E8%BF%98%E6%98%AF%E9%81%87%E8%A7%81%E4%BD%A0.mp3',
                        singer: '程响',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/sjzmdhsyjn.jpg',
                        is_chosen: 1,
                        like_sum: 97,
                        comment_sum: 12,
                        xh:1
                    },
                    {
                        music_id: 4,
                        music_name: '你是如此难以忘记(电台版)',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%BD%A0%E6%98%AF%E5%A6%82%E6%AD%A4%E9%9A%BE%E4%BB%A5%E5%BF%98%E8%AE%B0.mp3',
                        singer: '张智霖',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/nsrcnywj.jpg',
                        is_chosen: 1,
                        like_sum: 96,
                        comment_sum: 12,
                        xh:2
                    },
                    {
                        music_id: 5,
                        music_name: '夜曲',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%A4%9C%E6%9B%B2.mp3',
                        singer: '周杰伦',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/yq.jpg',
                        is_chosen: 1,
                        like_sum: 95,
                        comment_sum: 12,
                        xh:3
                    },
                    {
                        music_id: 6,
                        music_name: '红色高跟鞋',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E7%BA%A2%E8%89%B2%E9%AB%98%E8%B7%9F%E9%9E%8B.mp3',
                        singer: '蔡健雅',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/hsggx.jpg',
                        is_chosen: 1,
                        like_sum: 94,
                        comment_sum: 12,
                        xh:4
                    },
                    {
                        music_id: 8,
                        music_name: '情人知己',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E6%83%85%E4%BA%BA%E7%9F%A5%E5%B7%B1.mp3',
                        singer: '叶倩文',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/qrzj.jpg',
                        is_chosen: 1,
                        like_sum: 92,
                        comment_sum: 12,
                        xh:5
                    },
                    {
                        music_id: 9,
                        music_name: 'そばにいるね',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E3%81%9D%E3%81%B0%E3%81%AB%E3%81%84%E3%82%8B%E3%81%AD.mp3',
                        singer: '青山黛玛',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/lzwsb.jpg',
                        is_chosen: 1,
                        like_sum: 91,
                        comment_sum: 12,
                        xh:6
                    },
                    {
                        music_id: 17,
                        music_name: '걱정말아요 그대',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%EA%B1%B1%EC%A0%95%EB%A7%90%EC%95%84%EC%9A%94%20%EA%B7%B8%EB%8C%80.mp3',
                        singer: '野菊花',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/nbydx.png',
                        is_chosen: 1,
                        like_sum: 83,
                        comment_sum: 12,
                        xh:7
                    }],
                phb:[{
                        music_id: 1,
                        music_name: '一千个伤心的理由',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%B8%80%E5%8D%83%E4%B8%AA%E4%BC%A4%E5%BF%83%E7%9A%84%E7%90%86%E7%94%B1.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/yqgsxdly.jpg',
                        is_chosen: 1,
                        like_sum: 99,
                        comment_sum: 12,
                        xh:0
                    },
                    {
                        music_id: 2,
                        music_name: '左右为难',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%B7%A6%E5%8F%B3%E4%B8%BA%E9%9A%BE.mp3',
                        singer: '张学友/郑中基',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/zywn.jpg',
                        is_chosen: 1,
                        like_sum: 98,
                        comment_sum: 12,
                        xh:1
                    },
                    {
                        music_id: 3,
                        music_name: '世界这么大还是遇见你',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%B8%96%E7%95%8C%E8%BF%99%E4%B9%88%E5%A4%A7%E8%BF%98%E6%98%AF%E9%81%87%E8%A7%81%E4%BD%A0.mp3',
                        singer: '程响',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/sjzmdhsyjn.jpg',
                        is_chosen: 1,
                        like_sum: 97,
                        comment_sum: 12,
                        xh:2
                    },
                    {
                        music_id: 4,
                        music_name: '你是如此难以忘记(电台版)',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%BD%A0%E6%98%AF%E5%A6%82%E6%AD%A4%E9%9A%BE%E4%BB%A5%E5%BF%98%E8%AE%B0.mp3',
                        singer: '张智霖',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/nsrcnywj.jpg',
                        is_chosen: 1,
                        like_sum: 96,
                        comment_sum: 12,
                        xh:3
                    },
                    {
                        music_id: 5,
                        music_name: '夜曲',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%A4%9C%E6%9B%B2.mp3',
                        singer: '周杰伦',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/yq.jpg',
                        is_chosen: 1,
                        like_sum: 95,
                        comment_sum: 12,
                        xh:4
                    },
                    {
                        music_id: 6,
                        music_name: '红色高跟鞋',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E7%BA%A2%E8%89%B2%E9%AB%98%E8%B7%9F%E9%9E%8B.mp3',
                        singer: '蔡健雅',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/hsggx.jpg',
                        is_chosen: 1,
                        like_sum: 94,
                        comment_sum: 12,
                        xh:5
                    },
                    {
                        music_id: 7,
                        music_name: '当年情',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%BD%93%E5%B9%B4%E6%83%85.mp3',
                        singer: '张国荣',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/dnq.jpg',
                        is_chosen: 1,
                        like_sum: 93,
                        comment_sum: 12,
                        xh:6
                    },
                    {
                        music_id: 8,
                        music_name: '情人知己',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E6%83%85%E4%BA%BA%E7%9F%A5%E5%B7%B1.mp3',
                        singer: '叶倩文',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/qrzj.jpg',
                        is_chosen: 1,
                        like_sum: 92,
                        comment_sum: 12,
                        xh:7
                    },
                    {
                        music_id: 9,
                        music_name: 'そばにいるね',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E3%81%9D%E3%81%B0%E3%81%AB%E3%81%84%E3%82%8B%E3%81%AD.mp3',
                        singer: '青山黛玛',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/lzwsb.jpg',
                        is_chosen: 1,
                        like_sum: 91,
                        comment_sum: 12,
                        xh:8
                    },
                    {
                        music_id: 10,
                        music_name: '我的秘密',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E6%88%91%E7%9A%84%E7%A7%98%E5%AF%86.mp3',
                        singer: '邓紫棋',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/wdmm.png',
                        is_chosen: 1,
                        like_sum: 90,
                        comment_sum: 12,
                        xh:9
                    },
                    {
                        music_id: 11,
                        music_name: '谁伴我闯荡',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E8%B0%81%E4%BC%B4%E6%88%91%E9%97%AF%E8%8D%A1.mp3',
                        singer: 'Beyond',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/sbwcd.jpg',
                        is_chosen: 1,
                        like_sum: 89,
                        comment_sum: 12,
                        xh:10
                    },
                    {
                        music_id: 12,
                        music_name: '世界が終るまでは…',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%B8%96%E7%95%8C%E3%81%8C%E7%B5%82%E3%82%8B%E3%81%BE%E3%81%A7%E3%81%AF%E2%80%A6.mp3',
                        singer: '上杉升（WANDS）',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/zdsjzj.jpg',
                        is_chosen: 1,
                        like_sum: 88,
                        comment_sum: 12,
                        xh:11
                    },
                    {
                        music_id: 13,
                        music_name: '那些你很冒险的梦',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E9%82%A3%E4%BA%9B%E4%BD%A0%E5%BE%88%E5%86%92%E9%99%A9%E7%9A%84%E6%A2%A6.mp3',
                        singer: '林俊杰',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/nxnhmxdm.jpg',
                        is_chosen: 1,
                        like_sum: 87,
                        comment_sum: 12,
                        xh:12
                    },
                    {
                        music_id: 14,
                        music_name: 'Timber',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/Timber.mp3',
                        singer: 'Ke$ha',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/timber.jpg',
                        is_chosen: 1,
                        like_sum: 86,
                        comment_sum: 12,
                        xh:13
                    },
                    {
                        music_id: 15,
                        music_name: '烦恼歌',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E7%83%A6%E6%81%BC%E6%AD%8C.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/fng.jpg',
                        is_chosen: 1,
                        like_sum: 85,
                        comment_sum: 12,
                        xh:14
                    },
                    {
                        music_id: 16,
                        music_name: '吻别',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%90%BB%E5%88%AB.mp3',
                        singer: '张学友',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/wenbie.jpg',
                        is_chosen: 1,
                        like_sum: 84,
                        comment_sum: 12,
                        xh:15
                    },
                    {
                        music_id: 17,
                        music_name: '걱정말아요 그대',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%EA%B1%B1%EC%A0%95%EB%A7%90%EC%95%84%EC%9A%94%20%EA%B7%B8%EB%8C%80.mp3',
                        singer: '野菊花',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/nbydx.png',
                        is_chosen: 1,
                        like_sum: 83,
                        comment_sum: 12,
                        xh:16
                    }],
                like:[{
                        music_id: 2,
                        music_name: '左右为难',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%B7%A6%E5%8F%B3%E4%B8%BA%E9%9A%BE.mp3',
                        singer: '张学友/郑中基',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/zywn.jpg',
                        is_chosen: 1,
                        like_sum: 98,
                        comment_sum: 12,
                        xh:0
                    },
                    {
                        music_id: 3,
                        music_name: '世界这么大还是遇见你',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%B8%96%E7%95%8C%E8%BF%99%E4%B9%88%E5%A4%A7%E8%BF%98%E6%98%AF%E9%81%87%E8%A7%81%E4%BD%A0.mp3',
                        singer: '程响',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/sjzmdhsyjn.jpg',
                        is_chosen: 1,
                        like_sum: 97,
                        comment_sum: 12,
                        xh:1
                    },
                    {
                        music_id: 4,
                        music_name: '你是如此难以忘记(电台版)',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E4%BD%A0%E6%98%AF%E5%A6%82%E6%AD%A4%E9%9A%BE%E4%BB%A5%E5%BF%98%E8%AE%B0.mp3',
                        singer: '张智霖',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/nsrcnywj.jpg',
                        is_chosen: 1,
                        like_sum: 96,
                        comment_sum: 12,
                        xh:2
                    },
                    {
                        music_id: 5,
                        music_name: '夜曲',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E5%A4%9C%E6%9B%B2.mp3',
                        singer: '周杰伦',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/yq.jpg',
                        is_chosen: 1,
                        like_sum: 95,
                        comment_sum: 12,
                        xh:3
                    },
                    {
                        music_id: 8,
                        music_name: '情人知己',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E6%83%85%E4%BA%BA%E7%9F%A5%E5%B7%B1.mp3',
                        singer: '叶倩文',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/qrzj.jpg',
                        is_chosen: 1,
                        like_sum: 92,
                        comment_sum: 12,
                        xh:4
                    },
                    {
                        music_id: 9,
                        music_name: 'そばにいるね',
                        music_url: 'http://www.zxx9527.cn/wechat/static/songs/%E3%81%9D%E3%81%B0%E3%81%AB%E3%81%84%E3%82%8B%E3%81%AD.mp3',
                        singer: '青山黛玛',
                        singer_img_url: 'http://zxx9527.cn/wechat/static/img/songs/lzwsb.jpg',
                        is_chosen: 1,
                        like_sum: 91,
                        comment_sum: 12,
                        xh:5
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