<template>
    <div>
        <van-nav-bar title="搜索" left-arrow @click-left="onClickLeft" />
        <van-search v-model="searchKey" placeholder="请输入搜索关键词" @search="onSearch" />
        <div class="m-3">
            <h1 class="my-1">相关推荐：</h1>
            <div>
                <div v-for="item in searchHotKey" :key="item" class="badge badge-dash badge-accent badge-md" @click="searchHot(item)">{{ item }}</div>
            </div>
        </div>
        <!-- 搜索结果显示 -->
        <div v-if="pending" class="text-center p-4">搜索中...</div>
        <div v-else-if="error" class="text-center p-4 text-red-500">搜索出错: {{ error.message }}</div>
        <div v-else-if="searchList.length > 0" class="p-3">
            <h2 class="mb-2">搜索结果：</h2>
            <div v-for="item in searchList" :key="item.name" class="border-b py-2">
                <nuxt-link :to="`/orchid/${item.documentId}`">
                    <h3>{{ item.name }}</h3>
                </nuxt-link>
            </div>
        </div>
        <van-empty v-else-if="hasSearched && searchList.length === 0" description="暂无搜索结果" />
        <div v-else class="p-3 text-gray-400">输入关键词开始搜索</div>
    </div>
</template>

<script setup>
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

const query = gql`
query Orchids($filters: OrchidFiltersInput) {
  orchids(filters: $filters) {
    name
  }
}
`
const searchKey = ref('')
const searchList = ref([])
const hasSearched = ref(false) // 标记是否已执行过搜索

// 使用 useAsyncQuery - 修正参数传递
const { execute, data, pending, error } = useAsyncQuery(query,
    { filters: {} }, // 初始参数
    { lazy: true }
)

const onSearch1 = async () => {
    if (!searchKey.value.trim()) {
        searchList.value = []
        hasSearched.value = false
        return
    }

    try {
        console.log('搜索关键词:', searchKey.value)

        // 方法1：直接传递变量（推荐）
        await execute(query, {
            filters: {
                name: {
                    contains: searchKey.value
                }
            }
        })

        // 或者方法2：如果上面不行，尝试这种方式
        // await execute({
        //     filters: {
        //         name: {
        //             contains: searchKey.value
        //         }
        //     }
        // })

        console.log('原始响应:', data.value)

        // 修正数据赋值路径
        if (data.value?.orchids) {
            searchList.value = data.value.orchids
            console.log('搜索结果:', searchList.value)
        } else if (data.value?.data?.orchids) {
            // 有些 GraphQL 客户端包装在 data 字段里
            searchList.value = data.value.data.orchids
            console.log('搜索结果(data):', searchList.value)
        } else {
            searchList.value = []
            console.log('未找到 orchids 数据，完整响应:', data.value)
        }

        hasSearched.value = true

    } catch (err) {
        console.error('搜索失败:', err)
        searchList.value = []
        hasSearched.value = true
    }
}
const onSearch = async () => {
    const { find } = useStrapi()
    const response = await find('orchids', {
        fields: ['id', 'name'], 
        pagination: {
            pageSize: 10
        },
        filters: {
            name: {
                $contains: searchKey.value
            }
        },
        populate: '*'
    })
    console.log('搜索响应:', response)
    if (response && response.data) {
        searchList.value = response.data
    } else {
        searchList.value = []
    }
}
const searchHotKey = ref(['春兰', '西蜀', '兰展', '新闻', '兰花品种', '兰花养护'])
// 点击相关推荐进行搜索
const searchHot = (keyword) => {
    searchKey.value = keyword
    onSearch()
}
</script>