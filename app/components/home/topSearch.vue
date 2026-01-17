<template>
    <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
            <a href="/" class="btn btn-ghost text-xl">中国兰花博览园</a>
        </div>
        <div class="flex-none w-40">
            <NuxtLink to="/search">
                <van-search  placeholder="搜索" />
            </NuxtLink>
        </div>
    </div>
</template>