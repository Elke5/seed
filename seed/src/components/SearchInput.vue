<template>
	<div class="search">
    <!-- 创建双向数据绑定-->
    <el-input v-model="value" placeholder="请输入搜索内容" @keydown.native.enter="handleSearch" prefix-icon="el-icon-search"></el-input>
    <el-button type="primary" @click="handleSearch">
      <slot name="text">默认</slot>
    </el-button>
  </div>
</template>

<script>
export default {
	data() {
		return {
      value: ""
    }
	},
	methods: {
    handleSearch() {
      // 触发自定义事件
			this.$emit("onSearch", this.value)
		}
	}
}
</script>

<style scoped lang="less">
.search {
  padding-bottom: 10px;
  display: flex;
  width: 400px;

  button {
    margin-left: 10px;
  }
}
</style>