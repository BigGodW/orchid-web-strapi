<template>
    <NuxtLink :to="'/orchid/' + orchid.documentId" class="m-1">
        <div>
            <img class="w-full aspect-square rounded-lg  object-cover overflow-hidden"
                :src="'https://strapi-api.orchids.com.cn' + orchid.images[0].url" alt="">
        </div>
        <h2 class="line-clamp-1  my-1">
            <span class=" bg-blue-400 ml-1 p-1 rounded-md text-white text-[12px]  font-bold">{{
                orchid.orchid_category?.name }}</span>
            <span class="ml-1 text-[14px] p-1">{{ orchid.name }}</span>
        </h2>
        <div class=" absolute top-1 right-1" v-if="orchid.orchid_types">
            <van-tag class="ml-1" type="warning" v-for="type in orchid.orchid_types" :key="type.id">{{ type.name
                }}</van-tag>
        </div>
        <p class="text-sm line-clamp-2">{{ orchid.description }}</p>


    </NuxtLink>
</template>
<script setup>
const props = defineProps(["orchid"])


</script>