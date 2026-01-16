<template>
    <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
            <a href="/" class="btn btn-ghost text-xl">中国兰花博览园</a>
        </div>
        <div class="flex gap-2">
            <NuxtLink to="/search">
                <input type="text" placeholder="搜索" class="input input-bordered w-24 md:w-auto" />
            </NuxtLink>
        </div>
    </div>
</template>