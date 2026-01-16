<template>
    <div>
        <van-nav-bar title="搜索" left-arrow @click-left="onClickLeft" />
        <van-search v-model="searchKey" placeholder="请输入搜索关键词" @search="onSearch" />
        <div class="m-3">
            <h1 class="my-1">相关推荐：</h1>
            <div>
                <div class="badge badge-dash badge-accent badge-md">春兰</div>
                <div class="badge badge-dash badge-info badge-md">春剑</div>
                <div class="badge badge-dash badge-accent badge-md">新闻</div>
            </div>
        </div>
        <div v-if="searchList.length>0">
            <div v-for="item in searchList">
                <h2>{{ item.name }}</h2>
            </div>
        </div>
        <van-empty v-else description="查询结果" />
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
const onSearch = async () => {
    const { data } = await useAsyncQuery(query, {
        "filters": {
            "name": {
                "contains": searchKey.value
            }
        }
    })
    searchList.value = data.value.orchids

    console.log(searchList.value)
}


</script>