<template>
    <div class="box row justify-center align-center">
        <el-select
            v-model="data.type"
            class="col-6"
            placeholder="请选择分支类型"
            clearable
        >
            <el-option label="feature" value="feature" />
            <el-option label="bugfix" value="bugfix" />
            <el-option label="support" value="support" />
        </el-select>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <el-input
            ref="name"
            v-model="data.name"
            class="col-18"
            placeholder="分支名称"
        ></el-input>
    </div>
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from 'vue'
import { ElInput, ElMessage, ElOption, ElSelect } from 'element-plus'

interface DataType {
    type: string
    name: string
}

const name = ref()
const data: DataType = reactive({
    type: 'feature',
    name: ''
})

const submit = (): Promise<DataType> => {
    return new Promise((resolve, reject) => {
        if (!data.type || !data.name) {
            ElMessage({
                message: '请填写分支类型和名称',
                type: 'warning'
            })
            reject(new Error('请填写分支类型和名称'))
            return
        }
        resolve(toRaw(data))
    })
}

onMounted(() => {
    name.value.focus()
})

defineExpose({
    data,
    submit
})
</script>

<style lang="less">
.box {
    padding: 50px 0;
    .el-input {
        width: 180px;
    }
}
</style>
