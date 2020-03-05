<template>
    <div id="music-comment">
        <div class="com-hearder">
            <i style="font-size: 1rem;color:#fff;position: absolute;left: 0.19rem;" class="iconfont icon-down" @click="closeRegion($event)"></i>
            <p class="music-name">{{comMusic.music_name}}</p>
            <p class="music-singer">{{comMusic.singer}}</p>
            <p class="comment-title">期待你的神评<span @click="openConmentDialog">发表评论</span></p>
        </div>
        <van-dialog v-model="show" title="期待你的神评" confirm-button-text="提交" show-cancel-button :beforeClose="beforeClose">
            <van-field class="comment-info" v-model="commentContent" :error-message="errMsg" rows="4" type="textarea" maxlength="200"
            placeholder="请开始你的评论" show-word-limit />
        </van-dialog>
        <div id="content" :style="cstyle">
            <!-- <div id="content-scroll" :style="scrollStyle"> :style="scrollStyle"-->
                <van-pull-refresh id="realContent" v-model="refreshing" @refresh="onRefresh">
                    <van-list v-model="loading" :finished="finished" :finished-text="finishText" offset="10" @load="onLoad(false)">
                        <div class="item-packge" v-for="item in commentData.list" :key="item.comment_id">
                            <van-row gutter="6">
                                <van-col span="4">
                                    <van-image style="width:1rem;height:1rem;" round fit="cover" :src="item.head_img"></van-image>
                                </van-col>
                                <van-col span="16">
                                    <p class="item-name">{{item.nick_name}}</p>
                                    <p class="item-time">{{item.create_date}}</p>
                                </van-col>
                                <van-col span="4"></van-col>
                            </van-row>
                            <van-row gutter="6">
                                <van-col span="4">
                                </van-col>
                                <van-col span="20">
                                    <p class="item-content">{{item.content}}</p>
                                </van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-pull-refresh>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
    import about from '@/request/api/about';
    import {Col, Row, Field, Toast, PullRefresh, List} from 'vant';
    export default {
        name: 'music-comment',
        props: {
            comMusic: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                refreshing: false,
                loading: false,
                finished: false,
                finishText: '没有更多了...',
                commentData: {
                    list: [],
                    totalPage: 1,
                    indexPage: 0,
                    pageSize: 5
                },
                cstyle: '',
                scrollStyle: '',
                show: false,
                commentContent: '',
                errMsg: ''
            }
        },
        created() {
            this.renderResize(true);
        },
        mounted() {
            window.addEventListener("resize", this.renderResize(true), false);
        },
        watch: {
            comMusic: {
                handler(newValue, oldValue) {
                    this.renderResize(false);
                    if (newValue.music_id == "") {
                        return;
                    } else if (oldValue && newValue.music_id == oldValue.music_id) {
                        return;
                    }
                    this.loading = true;
                    this.finished = false;
                    this.onLoad(true);
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            renderResize(flag) {
                let cl = document.documentElement.clientWidth / 10;
                let height = document.documentElement.clientHeight - (cl * 2.1);
                if (flag) {
                    this.cstyle = `width:100%;height:${height}px`;
                }
                
                // let realHeight = $("#realContent").height();
                // if (realHeight > height || this.finished || this.commentData.list.length < 1) {
                //     this.scrollStyle = 'width:100%;';
                // } else {
                //     this.scrollStyle = `width:100%;height:${height+1}px;`;
                // }
                // let scrHeight = $("#content-scroll").height();
                // if (scrHeight != height && !this.finished && this.commentData.list.length > 0) {
                //     let realHeight = $("#realContent").height();
                //     let zzHeight = realHeight > height ? height : realHeight -10;
                //     this.scrollStyle = `max-height:${height}px;height:${zzHeight}px;overflow: scroll;`;
                // }
            },
            closeRegion(e) {
                if (e && e.stopPropagation) {
                     //因此它支持W3C的stopPropagation()方法 
                    e.stopPropagation();
                } else {
                    //否则，我们需要使用IE的方式来取消事件冒泡 
                    window.event.cancelBubble = true; 
                }
                this.$emit('lisenCloseRegion', 1);
            },
            onRefresh() {
                console.log("onRefresh=============")
                // 清空列表数据
                this.finished = false;
                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.finishText = '没有更多了...';
                this.onLoad(true);
            },
            onLoad(flag) {
                console.log("onLoad=============" + flag)
                if (this.refreshing || flag) {
                    this.commentData.list = [];
                    this.refreshing = false;
                    this.commentData.indexPage = 0;
                }
                let pageQuery = {
                    pageSize: this.commentData.pageSize,
                    indexPage: this.commentData.indexPage + 1,
                    musicId: this.comMusic.music_id
                }
                about.findPageQueryMusicComment(pageQuery)
                    .then(res => {
                        if (res.status != 200) {
                            this.$toast.fail('评论音乐失败');
                            return;
                        }
                        if (res.data.stateCode != 0) {
                            this.$toast.fail(res.data.message);
                            return;
                        }
                        let data = res.data.data;
                        this.commentData.list = this.commentData.list.concat(data.list);
                        this.commentData.indexPage = data.indexPage;
                        this.commentData.totalPage = data.totalPage;
                        // setTimeout(() => {
                        //     this.renderResize(false);
                        // },100);
                        this.loading = false;
                        if (data.indexPage == data.totalPage) {
                            this.finished = true;
                            if (this.commentData.list < 1) {
                                this.finishText = '还没有人评论,赶紧抢个沙发吧!';
                            } else {
                                this.finishText = '没有更多了...';
                            }
                        }
                    })
                    .catch(error => {
                        console.log("查询音乐评论失败异常",error);
                        this.$toast.fail('查询音乐评论失败异常');
                    })
            },
            openConmentDialog() {
                this.show = true;
            },
            beforeClose(action, done) {
                if(action === 'confirm') {
                    if (this.commentContent == "" || this.commentContent.length < 15) {
                        this.errMsg = '评论内容不能为空并且不能小于15个字';
                        return;
                    } else {
                        this.errMsg = '';
                    }
                    console.log("评论 === " + this.commentContent);
                    let comMusicData = {
                        musicId: this.comMusic.music_id,
                        content: this.commentContent
                    }
                    about.addMusicComment(comMusicData)
                        .then(res => {
                            if (res.status != 200) {
                                this.$toast.fail('评论音乐失败');
                                done();
                                return;
                            }
                            if (res.data.stateCode != 0) {
                                this.$toast.fail(res.data.message);
                                done();
                                return;
                            }
                            this.commentContent = '';
                            this.onRefresh();
                            done();
                        })
                        .catch(error => {
                            console.log("评论音乐失败异常",error);
                            this.$toast.fail('评论音乐失败异常');
                        })
                } else if(action === 'cancel') {
                    this.commentContent = '';
                    done(); //关闭
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    #music-comment {
        width: 100%;
        height: 100%;
        .com-hearder {
            height: 2.1rem;
            position: relative;
        }
        .music-name {
            font-size: 0.5rem;
            color: #fff;
            line-height: 0.7rem;
            padding: 0.1rem 0;
        }
        .music-singer {
            font-size: 0.35rem;
            color: #fff;
        }
        .comment-title {
            width: 100%;
            font-size: 0.3rem;
            color: #fff;
            text-align: left;
            padding: 0.3rem 0.2rem 0;
            span {
                font-size: 0.3rem;
                color: #fff;
                float: right;
            }
        }
        .comment-info {
            padding: 0.1rem;
        }
        #content {
            background: #fff;
            overflow: scroll;
            #realContent {
                .item-packge {
                    padding: 0.3rem 0.2rem 0;
                    width: 100%;
                    font-size: 0;
                    .item-name {
                        font-size: 0.33rem;
                        text-align: left;
                        color: gray;
                    }
                    .item-time {
                        font-size: 0.25rem;
                        text-align: left;
                        color: gray;
                        line-height: 0.67rem;
                    }
                    .item-content {
                        font-size: 0.35rem;
                        text-align: left;
                        word-wrap: break-word;
                        word-break: break-all;
                    }
                }
            }
        }
    }

</style>