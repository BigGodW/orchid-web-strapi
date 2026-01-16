<template>
  <van-swipe class="my-swipe" v-if="data?.carousels" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in data.carousels" class="">
      <img class="" :src="'https://strapi-api.orchids.com.cn'+item.img.url" alt="">
      <!-- <h1>{{ item.title }}</h1> -->
    </van-swipe-item>
    
  </van-swipe>
</template>
<script setup>
const images = ref([])

const query = gql`
    query ExampleQuery {
  carousels {
    img {
      url
    }
    title
  }
}
  `
const { data } = await useAsyncQuery(query)

</script>