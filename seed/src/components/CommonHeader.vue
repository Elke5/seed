<template>
	<div class="header">
	  <h1>{{ title }}</h1>
	  <el-button
			v-if="showRightBtn"
	    type="primary"
	    @click="$router.push({ name: 'courses-create' })"
	  >
	    创建课程
	  </el-button>
	</div>
</template>
<script>
export default {
	name: "CommonHeader",
  // 接受自定义属性
	props: {
		title: {
			type: String,
			default: "标题"
		},
		showRightBtn: {
			type: Boolean,
			default: true
		}
	}
}
</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>