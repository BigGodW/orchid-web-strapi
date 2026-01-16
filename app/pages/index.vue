<template>
    <div>
        <HomeTopSearch></HomeTopSearch>
        <HomeMyswipe></HomeMyswipe>
      <div>
        <h1 class=" bg-red-100">测试接口</h1>
        <div>
          <div aria-label="status" class="status status-primary"></div>
          <div aria-label="status" class="status status-secondary"></div>
          <div aria-label="status" class="status status-accent"></div>
          <div aria-label="status" class="status status-neutral"></div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  const query = gql`
    query{
    orchids {
      name
      documentId
    }
    }
  `
  //const {data} = await useAsyncQuery(query)
  
//   const {find} = useStrapi()
//   const response = await find('orchids',{fields:['id','name'],pagination:{
//     pageSize:10
//   }})
  </script>