<template>
    <div class="leave-message">
        <p class="leave-header">{{ this.userInfo.nick_name }},欢迎来到留言板!</p>
    </div>
</template>

<script>
import {getUserInfo} from '@/utils/cache';
export default {
    name: 'leave-message',
    data() {
        return {
            
        }
    },
    computed: {
        userInfo() {
        const user = getUserInfo();
        if (user.user_tel != 0 && user.user_tel != null) {
            this.isPhone = true;
        }
        return user;
        }
    },
}
</script>

<style lang="sass">
    .leave-message {
        padding: 2rem 0.8rem 0.2rem;
        .leave-header {
            font-size: 0.35rem;
        }
    }
</style>