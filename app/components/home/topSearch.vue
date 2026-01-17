<template>
    <div class="navbar bg-base-100 shadow-sm sticky top-0 z-30">
        <div class="flex-1">
            <a href="/">
                <img src="/img/lanhua.jpg" alt="">
            </a>
        </div>
        <div class="flex-none w-24">
            <NuxtLink to="/search">
                <van-search  placeholder="搜索" />
            </NuxtLink>
        </div>
    </div>
</template>