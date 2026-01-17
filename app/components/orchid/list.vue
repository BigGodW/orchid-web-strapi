<template>
    <div>
        <div class="relative">
            <div class="sticky top-16 z-30">
                <van-tabs v-model:active="active" @click-tab="changeOrchids" class="">
                    <van-tab title="推荐"></van-tab>
                    <van-tab v-for="item in orchidcategory" :title="item.name" :key="item.documentId">
                    </van-tab>
                </van-tabs>
            </div>
            <div class="flex">
                <div class=" relative">
                    <div class="sticky top-24">
                        <van-sidebar v-model="typeActive" @change="changeType">
                            <van-sidebar-item title="所有" />
                            <van-sidebar-item v-for="type in orchidTypes" :title="type.name" :key="type.documentId" />
                        </van-sidebar>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mx-1">
                    <orchid-item v-for="orchid in orchids" :orchid="orchid" class="m-2 relative"></orchid-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { find } = useStrapi()
const active = ref(0)
const typeActive = ref(0)
// 使用 onMounted 或其他生命周期钩子来获取数据
const orchidcategory = ref([])
const orchids = ref([])
const orchidTypes = ref([])
// 获取兰花分类
const fetchCategories = async () => {
    try {
        const { data } = await find('orchid-categories', { sort: 'order:asc' })
        orchidcategory.value = data
        console.log('分类数据成功')
    } catch (error) {
        console.error('获取分类失败:', error)
    }
}
// 获取兰花类型
const getOrchidTypes = async () => {
    try {
        const { data } = await find('orchid-types', { sort: "order:asc" })
        orchidTypes.value = data
        console.log(orchidTypes.value)
    }
    catch (error) {
        console.log('获取兰花类型失败')
    }
}
// 类型切换
const changeType = (e)=>{
    console.log(e)
}
// 获取兰花列表
const fetchOrchids = async (filters = {}) => {
    try {
        const { find } = useStrapi()
        const { data } = await find('orchids', {
            sort: 'createdAt:desc',
            pagination: { pageSize: 10 },
            fields: ['name', 'description'],
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
            },
            ...filters
        })
        orchids.value = data
        console.log('兰花数据成功:')
    } catch (error) {
        console.error('获取兰花失败:', error)
    }
}
// 初始化数据
onMounted(async () => {
})
await fetchCategories()
await fetchOrchids() // 默认获取推荐/全部
await getOrchidTypes()
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