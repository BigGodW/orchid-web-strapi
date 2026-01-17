<template>
    <div>
        <div>
            <van-tabs v-model:active="active" @click-tab="changeOrchids">
                <van-tab title="推荐"></van-tab>
                <van-tab v-for="item in orchidcategory.data" :title="item.name" :key="item.documentId">
                </van-tab>
            </van-tabs>
            <div>
                <div v-for="item in orchids" :key="item.id" class="py-2 border-b">
                    <div class="font-bold">{{ item.name }}</div>
                    <div class="text-sm text-gray-600">{{ item.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const active = ref(0)

// 使用 onMounted 或其他生命周期钩子来获取数据
const orchidcategory = ref({ data: [] })
const orchids = ref([])

// 获取兰花分类
const fetchCategories = async () => {
    try {
        const { find } = useStrapi()
        const result = await find('orchid-categories', { sort: 'order:asc' })
        orchidcategory.value = result
        console.log('分类数据成功')
    } catch (error) {
        console.error('获取分类失败:', error)
    }
}

// 获取兰花列表
const fetchOrchids = async (filters = {}) => {
    try {
        const { find } = useStrapi()
        const result = await find('orchids', {
            pagination: { pageSize: 10 },
            fields: ['name', 'description'],
            ...filters
        })
        orchids.value = result.data
        console.log('兰花数据:', orchids.value)
    } catch (error) {
        console.error('获取兰花失败:', error)
    }
}

// 初始化数据
onMounted(async () => {
    await fetchCategories()
    await fetchOrchids() // 默认获取推荐/全部
})

// 切换兰花列表
const changeOrchids = async ({ title }) => {
    console.log('点击的标签:', title)
    
    if (title === '推荐') {
        // 推荐显示全部或特定排序
        await fetchOrchids()
    } else {
        const category = orchidcategory.value.data.find(item => item.name === title)
        console.log('找到的分类:', category)
        
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