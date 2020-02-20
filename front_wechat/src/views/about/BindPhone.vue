<template>
    <div class="bind-phone">
        <span class="bind-title">请绑定您的手机号码</span>
        <van-cell-group class="form-field">
            <van-field v-model="phone" type="digit" clearable @blur="phoneValidator(phone)" name="phone" label="手机号" placeholder="请输入手机号码" :error-message="phoneErrMsg"></van-field>
        </van-cell-group>
        <van-cell-group class="form-field">
            <van-field v-model="valicode" type="digit" maxlength="6" center clearable @blur="codeValidator(valicode)" name="code" label="验证码" placeholder="请输入验证码" :error-message="codeErrMsg">
                <van-button slot="button" size="small" type="primary" :disabled="codeDisabled" @click="sendCode">{{codeMsg}}</van-button>
            </van-field>
        </van-cell-group>
        <div class="form-submit">
            <van-button round block :disabled="this.formDisabled" type="info" native-type="submit" @click="sumbitForm">提交</van-button>
        </div>
    </div>
</template>

<script>
    import {Field, Cell, CellGroup, Toast} from 'vant';
    import user from '@/request/api/user';
    import {saveUserInfo, getUserInfo} from '@/utils/cache'
    export default {
        name: 'bind-phone',
        data () {
            return {
                phone: '',
                phoneErrMsg: '',
                valicode: '',
                codeErrMsg: '',
                codeMsg: '发送验证码',
                codeDisabled: true,
                formDisabled: true,
                updateBtn: true
            }
        },
        methods: {
            phoneValidator(val) {
                console.log("手机号" + val)
                const isPhone = /1\d{10}/.test(val);
                console.log("手机号验证" + isPhone);
                if (isPhone) {
                    this.codeDisabled = false;
                    this.phoneErrMsg = '';
                    if (/\d{6}/.test(this.valicode)) {
                        this.formDisabled = false;
                        this.codeErrMsg = '';
                    } else {
                        this.formDisabled = true;
                        this.codeErrMsg = '验证码格式错误';
                    }
                } else {
                    this.phoneErrMsg = '手机号码格式错误';
                    this.codeDisabled = true;
                    this.formDisabled = true;
                }
                return isPhone;
            },
            // 校验函数返回 Promise 来实现异步校验
            codeValidator(val) {
                console.log("验证码" + val)
                return new Promise(resolve => {
                    Toast.loading('验证中...');
                    setTimeout(() => {  
                        Toast.clear();
                        const isCode = /\d{6}/.test(val);
                        if (isCode) {
                            if (this.phoneValidator(this.phone)) {
                                this.formDisabled = false;
                                this.codeErrMsg = '';
                            }
                        } else {
                            this.formDisabled = true;
                            this.codeErrMsg = '验证码格式错误';
                        }
                        resolve(isCode);
                    }, 1000);
                });
            },
            sendCode() {
                const data = {
                    serviceType: '1000'
                }
                user.sendCode(data)
                    .then(res => {
                        console.log("code返回消息",res);
                        if (res.status == 200) {
                            let {stateCode, data:code, message} = res.data;
                            if (stateCode == 0) {
                                this.$toast({
                                    type: 'text',
                                    position: 'top',
                                    message: '验证码:' + code,
                                    duration: 0
                                });
                            } else {
                                this.$toast.fail(message);
                            }
                        }
                    })
                    .catch(error => {
                        console.log("code发送异常",error);
                        this.$toast.fail('验证码异常');
                    })

            },
            updateSendBtn() {

            },
            sumbitForm() {
                console.log(this.phone,this.valicode)
                const data = {
                    serviceType: '1000',
                    phone: this.phone,
                    code: this.valicode
                }
                user.bindPhone(data)
                    .then(res => {
                        console.log("bind返回消息",res);
                        if (res.status == 200) {
                            let {stateCode, data:phoneNum, message} = res.data;
                            if (stateCode == 0) {
                                this.$toast.success("绑定成功");
                                let user = getUserInfo();
                                user.user_tel = phoneNum;
                                saveUserInfo(user);
                                this.$router.replace('/about');
                            } else {
                                this.$toast.fail(message);
                            }
                        }
                    })
                    .catch(error => {
                        console.log("code发送异常",error);
                        this.$toast.fail('绑定失败');
                    })

            }
        }
    }
</script>

<style lang="scss">
    .bind-phone {
        padding: 2rem 0.8rem 0.2rem;
        text-align: left;
        .bind-title {
            font-weight: 600;
            font-size: 0.7rem;
        }
        .form-field {
            padding-top: 2rem;
        }
        .form-submit {
            padding: 0.5rem 0;
        }
    }
</style>