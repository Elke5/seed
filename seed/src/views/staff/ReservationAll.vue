<template>
	<div>
		<h3>订位信息</h3>
		<el-card class="message-card">
		<el-descriptions
		class="margin-top" 
		:column="2"
		v-for="(idlist) in reservation">
		   <el-descriptions-item>
		     <template slot="label">
		      <span class="headline">ID</span>
		     </template>
					  {{idlist.id}}
		   </el-descriptions-item>
		   <el-descriptions-item>
		     <template slot="label">
		      <span class="headline">预订号</span>
		     </template>
		   		      {{idlist.ordernum}}
		   </el-descriptions-item>
		   <el-descriptions-item>
		     <template slot="label">
		       <span class="headline">预订账号</span>
		     </template>
		   		      {{idlist.account}}
		   </el-descriptions-item>
					<el-descriptions-item>
					  <template slot="label">
					   <span class="headline">姓名</span>
					  </template>
					  {{idlist.name}}
					</el-descriptions-item>
					<el-descriptions-item>
					  <template slot="label">
					    <span class="headline">联系电话</span>
					  </template>
					  {{idlist.phone}}
					</el-descriptions-item>
		   <el-descriptions-item>
		     <template slot="label">
		      <span class="headline">餐厅类型</span>
		     </template>
		     {{idlist.type}}
		   </el-descriptions-item>
		   <el-descriptions-item>
		     <template slot="label">
		      <span class="headline">就餐人数</span>
		     </template>
		    {{idlist.seatnum}}
		   </el-descriptions-item>
		   <el-descriptions-item>
		     <template slot="label">
		      <span class="headline">就餐时间</span>
		     </template>
					  {{idlist.arrtime}}
		   </el-descriptions-item>
		   <el-descriptions-item>
		     <template slot="label">
		       <span class="headline">预订时间</span>
		     </template>
		   			  {{idlist.pretime}}
		   </el-descriptions-item>
					<el-descriptions-item>
					  <template slot="label">
					   <span class="headline">顾客备注</span>
					  </template>
					  {{idlist.other}}
					</el-descriptions-item>
		 </el-descriptions>
		 </el-card>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
	  name: "ReservationDetail",
	  // 局部注册组件
		
	  data() {
	    return {
		  data:{},
		  id:'',
	    };
	  },
	  // 计算属性选项
	  computed: {
	    	 reservation(){
	    	      if(this.data.reservation){
	    	        return this.data.reservation
	    	      }else{
	    	        return []
	    	      }
	    	    },
	  },
	  
	 async created() {
		  // let ids  = sessionStorage.getItem('data')
		  // this.$route.params.id = JSON.parse(ids)
	  // 获取当前页面路由参数id
	  const id = this.$route.params.id
		console.log('created:',this.$route.params)
	  let res=await axios.get('/api/reservation/id',{params:{id: this.$route.params.id}}).then(res => {
	    this.data = res.data
	  }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
}
</script>

<style scoped>
	.message-card {
	  width: 780px;
	}
	.headline {
			  font-size: 15px;
			  font-weight: bold;
			  margin-right: 2px;
	}
</style>
