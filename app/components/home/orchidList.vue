<template>
    <div>
        <div>
            <van-tabs v-model:active="active" @click-tab="changeOrchids">
                <van-tab title="推荐"></van-tab>
                <van-tab v-for="item in orchidcategory" :title="item.name" :key="item.documentId">
                </van-tab>
            </van-tabs>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mx-1">
                <div v-for="item in orchids" :key="item.id" class="m-2 relative">
                    <nuxt-link :to="'/orchids/'+item.documentId">
                        <div>
                        <img class="w-full aspect-square rounded-lg  object-cover overflow-hidden" :src="'https://strapi-api.orchids.com.cn'+item.images[0].url" alt="">
                    </div>
                    <h2 class=" flex items-center line-clamp-1 my-1">
                        <span class=" bg-blue-400 ml-1 p-1 rounded-md text-white text-[12px]  font-bold">{{ item.orchid_category?.name }}</span>
                        <span class="ml-1">{{ item.name }}</span>
                    </h2>
                    <div class=" absolute top-1 right-1" v-if="item.orchid_types">
                        <van-tag class="ml-1" type="warning" v-for="type in item.orchid_types" :key="type.id">{{ type.name }}</van-tag>
                    </div>
                    <p class="text-sm line-clamp-2">{{ item.description }}</p>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const active = ref(0)

// 使用 onMounted 或其他生命周期钩子来获取数据
const orchidcategory = ref([])
const orchids = ref([])

// 获取兰花分类
const fetchCategories = async () => {
    try {
        const { find } = useStrapi()
        const {data} = await find('orchid-categories', { sort: 'order:asc' })
        orchidcategory.value = data
        console.log('分类数据成功')
    } catch (error) {
        console.error('获取分类失败:', error)
    }
}
// 获取兰花列表
const fetchOrchids = async (filters = {}) => {
    try {
        const { find } = useStrapi()
        const {data} = await find('orchids', {
            sort: 'createdAt:desc',
            pagination: { pageSize: 6 },
            fields: ['name', 'description'],
            populate:{
                images:{
                    fields: ['url']
                },
                orchid_category:{
                    fields: ['name']
                },
                orchid_types:{
                    fields: ['name']
                }
            },
            ...filters
        })
        orchids.value = data
        console.log('兰花数据:', data)
    } catch (error) {
        console.error('获取兰花失败:', error)
    }
}
// 初始化数据
onMounted(async () => {
})
await fetchCategories()
await fetchOrchids() // 默认获取推荐/全部
// 切换兰花列表
const changeOrchids = async ({ title }) => {
    // console.log('点击的标签:', title)
    if (title === '推荐') {
        // 推荐显示全部或特定排序
        await fetchOrchids()
    } else {
        const category = orchidcategory.value.find(item => item.name === title)
        // console.log('找到的分类:', category)
        if (category) {
            await fetchOrchids({
                filters: { 
                    orchid_category: { documentId: category.documentId } 
                }
            })
        }
    }
}
</script>