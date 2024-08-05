<template>
    <div class="all" @click="num++">
        <h1>吴梦如是sabihaha</h1>
        <h2>{{ num }}</h2>
        <img src="../src/assets/vue.svg" alt="">
    </div>
</template>

<script setup>
import {ref} from 'vue'
import './JC/index.jc'
let num=ref(1)
</script>

<style scoped lang="scss">
.all{
    background: pink;
    h2{
        color: aqua;
    }
}
</style>