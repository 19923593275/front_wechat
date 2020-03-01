<template>
    <div id="music-index">
        <div class="m-user">
            <div class="user-flex-left">
                <van-image style="width:1.5rem;height:1.5rem;margin-right:0.1rem;" round :src="this.userInfo.head_img"></van-image>
            </div>
            <div class="user-flex-right">
                <p>{{this.userInfo.nick_name}}</p>
                <audio style="" id="myAudio" src=""></audio>
            </div>
        </div>
        <music-player v-bind:playerData="this.childData" v-on:listenChildPlayler="operaPlalerFromChild(arguments)"></music-player>
        <div class="music-player">
            <div style="flex:2;">
                <van-image style="position: absolute;left: 0.1rem;bottom: 0.1rem;width:1rem;height:1rem;" round fit="cover" :src="this.childData.indexPlayer.singer_img_url"></van-image>
            </div>
            <div style="flex:6;">
                <p class="specel-text common-text">{{`${this.childData.indexPlayer.music_name}-${this.childData.indexPlayer.singer}`}}</p>
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
    import about from '@/request/api/about';
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
                childData: {
                    active: 0,
                    indexActive: 0,
                    playerState: false,
                    indexPlayer: {
                        music_id: '',
                        music_name: '',
                        music_url: '',
                        music_lyric_url: '',
                        singer: '',
                        singer_img_url: '',
                        is_chosen: '',
                        like_sum: '',
                        comment_sum: '',
                        myEnjoy: false,
                        xh:0
                    },
                    musicList: []
                },
                musicData: {
                    like: [],
                    phb: [],
                    tj: []
                },
                likeSum: 0,
                icon: {
                    active: phb2,
                    inactive: phb1
                },
                btnStyle: 'font-size:0.7rem;color:#05bb05;',
                bfFlag: 'font-size:0.7rem;color:#05bb05;',
                ztFlag: 'font-size:0.7rem;color:#05bb05;display:none;',
                isFirst: true
            }
        },
        created() {
            

        },
        destroyed() {
            this.$toast.clear();
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
            const aboutData = {};
            about.getAllMusic(aboutData)
                .then(res => {
                    if (res.status != 200) {
                        this.$toast.fail('获取音乐失败');
                        return;
                    }
                    if (res.data.stateCode != 0) {
                        this.$toast.fail(res.data.message);
                        return;
                    }
                    this.musicData = res.data.data;
                    console.log("musicData ========",this.musicData);
                    this.childData.musicList = this.musicData.tj;
                    console.log("初始化musicList = ", this.childData.musicList);
                    this.childData.indexPlayer = this.musicData.tj[0];
                    this.likeSum = this.musicData.like.length;
                    console.log("muonted _this.childData.indexPlayer", $audio, _this.childData.indexPlayer)
                    $audio.src = _this.childData.indexPlayer.music_url;
                })
                .catch(error => {
                    console.log("获取音乐失败异常",error);
                    this.$toast.fail('获取音乐失败异常');
                })
            $audio.addEventListener("playing", function(){
                    console.log("监听播放状态")
                    _this.$toast.clear();
                    //播放状态Doing
                    _this.bfFlag = 'font-size:0.7rem;color:#05bb05;display:none;';
                    _this.ztFlag = 'font-size:0.7rem;color:#05bb05;';
                    _this.childData.playerState = true;
                    $(".music-player img").addClass('img-running').removeClass('img-paused');
            });
            $audio.addEventListener("pause", function(){ 
                    console.log("暂停状态")
                    //暂停状态Doing
                    _this.bfFlag = 'font-size:0.7rem;color:#05bb05;';
                    _this.ztFlag = 'font-size:0.7rem;color:#05bb05;display:none;';
                    _this.childData.playerState = false;
                    $(".music-player img").addClass('img-paused').removeClass('img-running');
            });
            $audio.addEventListener("ended", function(){ 
                    _this.handleSong(4, true);
            });

            // const data = {
            //     url: location.href.split('#')[0]
            // };
            // user.getWxConfig(data)
            //     .then(res => {
            //         if (res.status != 200) {
            //             this.$toast.fail('验证jssdk异常');
            //             return;
            //         }
            //         if (res.data.stateCode != 0) {
            //             this.$toast.fail(res.data.message);
            //             return;
            //         }
            //         let {appId, noncestr, signature, timestamp} = res.data.data;
            //         wx.config({
            //             debug: false,
            //             appId: appId, // 必填，公众号的唯一标识
            //             timestamp: timestamp, // 必填，生成签名的时间戳，精确到秒
            //             nonceStr: noncestr, // 必填，生成签名的随机串
            //             signature: signature, // 必填，签名
            //             jsApiList: ['scanQRCode']
            //         })
            //     })
            //     .catch(error => {
            //         console.log("验证jssdk异常",error);
            //         this.$toast.fail('验证jssdk异常');
            //     })
        },
        methods: {
            onChange (index) {
                this.childData.active = index;
                let audio = document.getElementById("myAudio");
                switch(index) {
                    case 0:
                        this.childData.musicList = this.musicData.tj;
                        if (!this.childData.playerState && this.musicData.tj.length > 0) {
                            this.childData.indexPlayer = this.musicData.tj[0];
                            this.childData.indexActive = 0;
                            audio.src = this.childData.indexPlayer.music_url;
                            setTimeout(function(){
                                audio.pause();
                            },100);
                            
                        }
                        this.isFirst = true;
                        break;
                    case 1:
                        this.childData.musicList = this.musicData.phb;
                        if (!this.childData.playerState && this.musicData.phb.length > 0) {
                            this.childData.indexPlayer = this.musicData.phb[0];
                            this.childData.indexActive = 1;
                            audio.src = this.childData.indexPlayer.music_url;
                            setTimeout(function(){
                                audio.pause();
                            },100);
                            
                        }
                        this.isFirst = false;
                        break;
                    case 2:
                        this.childData.musicList = this.musicData.like;
                        if (!this.childData.playerState && this.musicData.like.length > 0) {
                            this.childData.indexPlayer = this.musicData.like[0];
                            this.childData.indexActive = 2;
                            audio.src = this.childData.indexPlayer.music_url;
                            setTimeout(function(){
                                audio.pause();
                            },100);
                            
                        }
                        this.isFirst = false;
                        break;
                    default:
                        this.childData.musicList = this.musicData.tj;
                        if (!this.childData.playerState && this.musicData.tj.length > 0) {
                            this.childData.indexPlayer = this.musicData.tj[0];
                            this.childData.indexActive = 0;
                            audio.src = this.childData.indexPlayer.music_url;
                            setTimeout(function(){
                                audio.pause();
                            },100);
                            this.isFirst = false;
                        }
                }
            },
            handleSong(type, isFlag) {
                let myAudio = document.getElementById("myAudio");
                console.log(this.childData.indexPlayer)
                let xh = this.childData.indexPlayer.xh;
                let indexMusicList = this.getIndexMusicList() || [];
                console.log("indexMusicList", indexMusicList)
                let length = indexMusicList.length;
                switch(type) {
                    case 1:
                        if (length > 1) {
                            if (xh == 0) {
                                this.childData.indexPlayer = indexMusicList[length-1];
                                myAudio.src = this.childData.indexPlayer.music_url;
                                this.playAudio(false);
                            } else {
                                this.childData.indexPlayer = indexMusicList[xh-1];
                                myAudio.src = this.childData.indexPlayer.music_url;
                                this.playAudio(false);
                            }
                        }
                        break;
                    case 2:
                        this.pauseAudio();
                        break;
                    case 3:
                        this.playAudioBtn();
                        break;
                    case 4:
                        if (length > 1) {
                            if (xh == length-1) {
                                if (!isFlag) {
                                    this.childData.indexPlayer = indexMusicList[0];
                                    myAudio.src = this.childData.indexPlayer.music_url;
                                    this.playAudio(false);
                                }
                            } else {
                                this.childData.indexPlayer = indexMusicList[xh+1];
                                myAudio.src = this.childData.indexPlayer.music_url;
                                this.playAudio(false);
                            }
                        }
                        break;
                    default:
                        console.log("操作类型错误 ===== ")

                }
            },
            playAudioBtn() {
                let myAudio = document.getElementById("myAudio");
                if(this.isFirst) {
                    this.$toast.loading({
                        message: '加载中...',
                        forbidClick: true,
                        overlay: true,
                        duration: 0
                    })
                }
                if (this.isFirst) {
                    myAudio.load();
                    this.isFirst = false;
                    myAudio.oncanplaythrough = function() {
                        myAudio.play();
                    }
                } else {
                    myAudio.play();
                    this.isFirst = false;
                }
            },
            playAudio(flag) {
                let myAudio = document.getElementById("myAudio");
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    overlay: true,
                    duration: 0
                })
                if (flag) {
                    if (this.isFirst) {
                        this.isFirst = false;
                        myAudio.load();
                        myAudio.oncanplaythrough = function() {
                            myAudio.play();
                        }
                    } else {
                        this.isFirst = false;
                        myAudio.play();
                    }
                    
                } else {
                    this.isFirst = false;
                    myAudio.load();
                    myAudio.oncanplaythrough = function() {
                        myAudio.play();
                    }
                }
            },
            pauseAudio() {
                let myAudio = document.getElementById("myAudio");
                myAudio.pause();
                // this.bfFlag = 'font-size:0.7rem;color:#05bb05;';
                // this.ztFlag = 'font-size:0.7rem;color:#05bb05;display:none;';
            },
            getIndexMusicList() {
                if (this.childData.indexActive == 0) {
                    return this.musicData.tj;
                } else if (this.childData.indexActive == 1) {
                    return this.musicData.phb;
                } else {
                    return this.musicData.like;
                }
            },
            getActiveMusicList() {
                if (this.active == 0) {
                    return this.musicData.tj;
                } else if (this.active == 1) {
                    return this.musicData.phb;
                } else {
                    return this.musicData.like;
                }
            },
            operaPlalerFromChild(data) {
                console.log("子组件传回来的data", data);
                let type =data[0];
                let music = data[1];
                let xh = music.xh;
                let state = this.childData.playerState;
                switch(type) {
                    case 1://播放音乐
                        if (this.active == this.childData.indexActive) {
                            if (xh == this.childData.indexPlayer.xh) {
                                if (state) {
                                    this.pauseAudio();
                                } else {
                                    // this.isFirst = true;
                                    this.playAudioBtn();
                                }
                            } else {
                                this.childPlayer(true,xh);
                            }
                        } else {
                            this.childPlayer(false,xh);
                        }
                        break;
                    case 2://取消喜欢
                        let cancelData = {
                            musicId: music.music_id
                        }
                        about.cancelEnjoyMusic(cancelData)
                            .then(res => {
                                if (res.status != 200) {
                                    this.$toast.fail('取消喜欢音乐失败');
                                    return;
                                }
                                if (res.data.stateCode != 0) {
                                    this.$toast.fail(res.data.message);
                                    return;
                                }
                                this.refreshSongData(2, music);
                            })
                            .catch(error => {
                                console.log("取消喜欢音乐异常",error);
                                this.$toast.fail('取消喜欢音乐异常');
                            })
                        break;
                    case 3://添加喜欢
                        let data = {
                            musicId: music.music_id
                        }
                        about.addEnjoyMusic(data)
                            .then(res => {
                                if (res.status != 200) {
                                    this.$toast.fail('添加喜欢音乐失败');
                                    return;
                                }
                                if (res.data.stateCode != 0) {
                                    this.$toast.fail(res.data.message);
                                    return;
                                }
                                this.refreshSongData(1, music);
                            })
                            .catch(error => {
                                console.log("添加喜欢音乐异常",error);
                                this.$toast.fail('添加喜欢音乐异常');
                            })
                        break;
                    default:
                        console.log("操作类型错误")
                }
                
            },
            childPlayer(flag, xh) {
                let myAudio = document.getElementById("myAudio");
                let activeMusicList = this.getActiveMusicList() || [];
                let indexMusicList = this.getIndexMusicList() || [];
                if (flag) {
                    this.childData.indexPlayer = indexMusicList[xh];
                } else {
                    this.childData.indexActive = this.active;
                    this.childData.indexPlayer = activeMusicList[xh];
                }
                myAudio.src = this.childData.indexPlayer.music_url;
                this.playAudio(false);
            },
            refreshSongData(type, music) {
                if (type == 1) {//添加
                    let tjxh = this.getMusicXh('tj', music.music_id);
                    if (tjxh !== "") {
                        this.musicData.tj[tjxh].myEnjoy = true;
                    }
                    let phbxh = this.getMusicXh('phb', music.music_id);
                    this.musicData.phb[phbxh].myEnjoy = true;
                    let length = this.musicData.like.length;
                    let likeMusic = Object.assign({}, music);
                    likeMusic.xh = length;
                    this.musicData.like.push(likeMusic);
                    this.likeSum = this.musicData.like.length;
                } else {//移除
                    let tjxh = this.getMusicXh('tj', music.music_id);
                    if (tjxh !== "") {
                        this.musicData.tj[tjxh].myEnjoy = false;
                    }
                    let phbxh = this.getMusicXh('phb', music.music_id);
                    this.musicData.phb[phbxh].myEnjoy = false;
                    let likexh = this.getMusicXh('like', music.music_id);
                    let newLike = Object.assign([], this.musicData.like);
                    newLike.splice(likexh, 1);
                    console.log(newLike.length);
                    for(let j=0; j < newLike.length; j++) {
                        newLike[j].xh=j;
                    }
                    console.log(newLike);
                    this.musicData.like = newLike;
                    this.likeSum = this.musicData.like.length;
                }
                if (this.active == 0){
                    this.childData.musicList = this.musicData.tj;
                } else if (this.active == 1) {
                    this.childData.musicList = this.musicData.phb;
                } else {
                    this.childData.musicList = this.musicData.like;
                    if(this.active == this.childData.indexActive) {
                        if (music.music_id == this.childData.indexPlayer.music_id) {
                            if (this.childData.musicList.length > 0) {
                                this.childData.indexPlayer = this.childData.musicList[0];
                            } else {
                                this.childData.indexPlayer = this.musicData.tj[0];
                            }
                            let myAudio = document.getElementById("myAudio")
                            myAudio.src = this.childData.indexPlayer.music_url;
                            this.isFirst = true;
                            setTimeout(function(){
                                myAudio.pause();
                            },100);
                        }
                    }
                }
            },
            getMusicXh(model, id){
                let list = this.musicData[model];
                let xh = "";
                for(let i=0;i<list.length;i++) {
                    let indexMusic = list[i];
                    if(id == indexMusic.music_id) {
                        xh = indexMusic.xh;
                        return xh;
                    }
                }
                return xh;
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
            .singer-img {
                position: absolute;
                left: 0.1rem;
                bottom: 0.1rem;
                width:1rem;
                height:1rem;
            }
            .img-running {
                animation: singerRotate 5s linear 0s infinite normal running;
            }
            .img-paused {
                animation: singerRotate 5s linear 0s infinite normal paused;
            }
            @keyframes singerRotate {
                from {transform: rotate(0deg);}
                to {transform: rotate(360deg);}
            }
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