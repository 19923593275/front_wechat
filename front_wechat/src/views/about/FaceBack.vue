<template>
    <div id="face-back">
        <div class="title">
            <label class="start">*</label>
            <label class="qustion">您的问题和建议</label>
        </div>
        <van-field class="back-info" v-model="message" @input="checkBack()" rows="6" autosize type="textarea" maxlength="150"
            placeholder="您的问题和建议是" show-word-limit />
        <div class="lx-way">
            <label class="start">*</label>
            <label class="qustion">您的联系方式</label>
            <label class="phone">{{this.userInfo.user_tel}}</label>
        </div>
        <div class="submit-btn">
            <van-button round block :disabled="backBtn" type="primary" @click="submitBack">提交</van-button>
        </div>
    </div>
</template>

<script>
    import {Field, Toast} from 'vant';
    import {getUserInfo} from '@/utils/cache'
    export default {
        name: 'face-back',
        data () {
            return {
                message: '',
                backBtn: true
            }
        },
        computed: {
            userInfo() {
                return getUserInfo();
            }
        },
        methods: {
            checkBack() {
                if (this.userInfo.user_tel != "" && this.message.length > 10) {
                    this.backBtn = false;
                } else {
                    this.backBtn = true;
                }
            },
            submitBack() {
                console.log("face-back = " + this.message + ",phone = " + this.userInfo.user_tel);
                Toast.loading('提交成功...');
                setTimeout(() => {  
                    Toast.clear();
                    this.$router.replace('/about');
                }, 1000);
            }
        }
    }
</script>

<style lang="scss">
    #face-back {
        .title {
            padding: 0.2rem 0.1rem;
            font-size: 0;
            text-align: left;
        }
        .back-info {
            padding: 0.1rem;
            background: #f7f7f7;
        }
        .start {
            font-size: 0.35rem;
            color: red;
            vertical-align: bottom;
        }
        .qustion {
            font-size: 0.35rem;
            padding: 0 0.1rem;
        }
        .lx-way {
            font-size: 0;
            background: #f7f7f7;
            padding: 0.2rem;
            text-align: left;
            margin-top: 0.2rem;
            .phone {
                font-size: 0.35rem;
            }
        }
        .submit-btn {
            padding: 0.2rem 0.1rem;
            font-size: 0;
        }
    }
</style>