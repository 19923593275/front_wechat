<template>
    <div id="ongo">
        <van-image width="100%" :src="img"></van-image>
    </div>
</template>

<script>
    import {getUserInfo} from '@/utils/cache'
    export default {
        data () {
            return {
                img: require('../assets/img/ongo/ongo.gif')
            }
        },
        computed: {
            userInfo() {
                return getUserInfo();
            }
        }
    }
</script>

<style lang="scss">
    #ongo {
        width: 100%;
        height: 15rem;
        display: flex;
        align-items: center;
        background-color: #fff;
    }
</style>