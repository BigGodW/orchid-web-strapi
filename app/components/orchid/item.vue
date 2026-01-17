<template>
    <NuxtLink :to="'/orchid/'+ documentId" class="m-1">
        {{ name, cover, orchidclass, orchidcategory, documentId }}
    </NuxtLink>
</template>
<script setup>
const props = defineProps(['name','cover','orchidclass','orchidcategory','documentId'])


</script>