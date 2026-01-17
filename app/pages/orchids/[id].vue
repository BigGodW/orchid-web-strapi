<template>
    <div>
        <van-nav-bar :title="orchid?.name" left-arrow @click-left="onClickLeft" />
        <div>
            <van-swipe class="my-swipe" v-if="orchid?.images" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="item in orchid.images" class="">
                    <img class=" aspect-square object-cover" :src="'https://strapi-api.orchids.com.cn' + item.url"
                        alt="">
                </van-swipe-item>
            </van-swipe>
            <div class=" *:m-1 *:p-1">
                <h2><span>品名:</span>{{ orchid?.name }}</h2>
                <p><span>描述:</span>{{ orchid?.description }}</p>    
                <p><span>特点:</span>{{ orchid?.characteristics }}</p>
                <p><span>历史:</span>{{ orchid?.history }}</p>
                <p><span>产地:</span>{{ orchid?.origin }}</p>
                <p><span>分类:</span>{{ orchid?.orchid_category?.name }}</p>
                <p>
                    <span>类型:</span>
                    <van-tag class="ml-1" type="warning" v-for="type in orchid?.orchid_types" :key="type.id">{{ type.name }}</van-tag>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

const { findOne } = useStrapi()
const orchid = ref(null)
const fetchOrchid = async () => {
    try {
        const { data } = await findOne('orchids', id, {
            populate: {
                images: {
                    fields: ['url']
                },
                orchid_category: {
                    fields: ['name']
                },
                orchid_types: {
                    fields: ['name']
                }
            }
        })
        orchid.value = data
        console.log('兰花详情:', orchid.value)
    } catch (error) {
        console.error('获取兰花详情失败:', error)
    }
}
onMounted(() => {
    fetchOrchid()
})

</script>