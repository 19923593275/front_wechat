<template>
    <div class="card">
        <!-- <van-image v-if="card.isZdy" :width="this.card.width + 'rem'" :height="this.card.height + 'rem'" :src="this.card.imgUrl"></van-image> -->
        <img v-if="card.isZdy" :style="card.imgStyle" :src="this.card.imgUrl"/>
        <i v-else :style="card.iconStyle" :class="'iconfont ' + card.class"></i>
        <p>{{this.card.name}}</p>
    </div>
</template>

<script>
    import {getUserInfo} from '@/utils/cache'
    export default {
        name: 'card',
        props: {
            card: {
                type: Object,
                required: true
            }
        },
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss">
    .card {
        padding: 0.03rem;
        text-align: center;
        p {
            font-size: 0.33rem;
            margin-top: -0.1rem;
            font-weight: 600;
        }
    }
</style>