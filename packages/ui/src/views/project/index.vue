<template>
    <div id="project">
        <div class="head">
            <div class="title">
                <!-- <div class="left link"><span class="iconfont icon-left" title="收藏"></span> 返回控制台</div> -->
                <h1>项目管理器</h1>
                <!-- <div class="right"><span class="iconfont icon-warning-circle-fill" title="关于"></span></div> -->
            </div>
            <div class="menu">
                <router-link to="/project/list">
                    <span class="iconfont icon-database-fill" /> 项目
                </router-link>
                <router-link to="/project/add">
                    <span class="iconfont icon-plus-square-fill" /> 导入
                </router-link>
            </div>
        </div>
        <router-view class="routerView" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'Project'
}
</script>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
if (route.name === 'project') router.replace('/project/list')
</script>
