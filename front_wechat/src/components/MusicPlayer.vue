<template>
    <div id="player" :style="pstyle">
        <div v-show="this.playerData.musicList.length<1">
            <p class="music-none">你还没有喜欢的歌曲,在排行榜或推荐点亮小红心添加到喜欢吧!</p>
        </div>
        <div v-for="(item,index) in this.playerData.musicList" :key="item.xh" :class="index < 2  ? 'item1' : 'item2'" :id="`music${item.music_id}`" @click="slectMusic($event, 1, item)">
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
                                    <!-- <i class="iconfont icon-pinglun"></i> -->
                                    <van-icon style="margin:0;" class-prefix="my-icon" name="pinglun" :info="item.comment_sum" />
                                </van-col>
                                <van-col span="4">

                                </van-col>
                                <van-col span="6">
                                    <i v-if="item.myEnjoy" style="color:red;" class="iconfont icon-xihuanlike" @click="slectMusic($event, 2, item)"></i>
                                    <i v-else class="iconfont icon-xihuan" @click="slectMusic($event, 3, item)"></i>
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
            playerData: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                pstyle: ''
            }
        },
        created() {
            let cl = document.documentElement.clientWidth / 10;
            let height1 = document.documentElement.clientHeight - (cl * 4.23333);
            let height2 = 2.191 * cl;
            this.pstyle = height1 - height2 > 0 ? `height:${height1}px` : '';
        },
        mounted() {
            console.log("子组件的数据 ======== ", this.playerData)
            window.addEventListener("resize", this.renderResize, false);
            let {active, indexActive, playerState, indexPlayer, musicList} = this.playerData;
            if (active == indexActive) {
                $('#music' + indexPlayer.music_id).addClass('select-music').siblings('div').removeClass('select-music');
            }else {
                $('#music' + indexPlayer.music_id).removeClass('select-music').siblings('div').removeClass('select-music');
            }
        },
        watch: {
            playerData: {
                handler(newValue, oldValue) {
                    console.log(newValue);
                    setTimeout(()=> {
                        let {active, indexActive, playerState, indexPlayer, musicList} = newValue;
                        if (active == indexActive) {
                            $('#music' + indexPlayer.music_id).addClass('select-music').siblings('div').removeClass('select-music');
                        }else {
                            $('#music' + indexPlayer.music_id).removeClass('select-music').siblings('div').removeClass('select-music');
                        }
                    },100);
                },
                immediate: true,
                deep: true
            }
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
            },
            slectMusic(e, type, music) {
                if (e && e.stopPropagation) {
                     //因此它支持W3C的stopPropagation()方法 
                    e.stopPropagation();
                } else {
                    //否则，我们需要使用IE的方式来取消事件冒泡 
                    window.event.cancelBubble = true; 
                }
                console.log("点击播放 =====", type, music.music_id, music.xh);
                if (type ==1) {
                    $('#music' + music.music_id).addClass('select-music').siblings('div').removeClass('select-music');
                }
                this.$emit("listenChildPlayler", type, music);
            }
        },
    }
</script>

<style lang="scss" scoped>
    #player {
        overflow: scroll;
        padding: 0.2rem 0;
        .music-none {
            font-size: 0.35rem;
            padding: 2rem 1rem;
            text-indent: 0.7rem;
        }
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
        .select-music {
            animation: musicBorder 2s linear 0s infinite alternate;
        }
        @keyframes musicBorder {
            from {box-shadow: 0px 0px 4px rgb(253, 187, 187);}
            to {box-shadow: 0px 0px 8px red;}
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
                height: 1.1rem;
                overflow: hidden;
                .song-name {
                    font-size: 0.32rem;
                    margin-top: 0.1rem;
                }
            }
            .second-div {
                width: 100%;
                height: 0.691rem;
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