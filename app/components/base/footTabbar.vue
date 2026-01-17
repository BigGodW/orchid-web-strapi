<template>
    <div class="fixed bottom-0 left-0 w-full z-40">
        <van-tabbar v-model="active" @change="onChange">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="flower-o">兰花</van-tabbar-item>
            <van-tabbar-item icon="newspaper-o">新闻</van-tabbar-item>
            <van-tabbar-item icon="friends-o">我们</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script setup>
    const active = ref(0)
    const router = useRouter()
    const onChange = (index) => {
        switch (index) {
            case 0:
                router.push('/')
                break
            case 1:
                router.push('/orchids')
                break
            case 2:
                router.push('/news')
                break
            case 3:
                router.push('/about')
                break
        }
    }
const route = useRoute()
onMounted(() => {
    switch (route.path) {
        case '/':
            active.value = 0
            break
        case '/orchids':
            active.value = 1
            break
        case '/news':
            active.value = 2
            break
        case '/about':
            active.value = 3
            break
    }
})
</script>