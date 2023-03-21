<template>
	<div>
		<el-page-header @back="back" content="餐厅具体信息" style="font-weight: bolder;line-height: 70px;">
		</el-page-header>
		 <el-descriptions
		 style="width: 71vw"
		 class="margin-top" 
		 :column="1" border
		 v-for="(idlist) in canteen">
		    <template slot="extra">
		      <el-button
		      type="primary" 
		      size="medium" 
		      @click="edit()">
		      <i class="el-icon-edit">编辑</i>
		      </el-button>
		    </template>
		    <el-descriptions-item :labelStyle='labelStyle'>
		      <template slot="label">
		        <i class="el-icon-coordinate"></i>
		        ID
		      </template>
			  {{idlist.id}}
		    </el-descriptions-item>
		    <el-descriptions-item>
		      <template slot="label">
		        <i class="el-icon-info"></i>
		        类型
		      </template>
		      {{idlist.type}}
		    </el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
			    <i class="el-icon-tickets"></i>
			    介绍
			  </template>
			  {{idlist.content}}
			</el-descriptions-item>
		  </el-descriptions>

	</div>
</template>

<script>
	import axios from 'axios'
	export default {
	  name: "CanteenDetail",
	  // 局部注册组件
		
	  data() {
	    return {
		  data:{},
		  id:'',
		  labelStyle: { 'width': '100px' }
	    };
	  },
	  // 计算属性选项
	  computed: {
	    	 canteen(){
	    	      if(this.data.canteen){
	    	        return this.data.canteen
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
	  let res=await axios.get('/api/canteen/id',{params:{id: this.$route.params.id}}).then(res => {
	    this.data = res.data
	  }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
	    methods: {
			edit() {
				this.$router.push({
				  name: "canteen-update",
				  params: {
				    id: this.$route.params.id,
				  },
				  })
			},
			back(){
				this.$router.push({
				  name: "canteen-data",
				  })
			},
		},
		
		
	    
	}
</script>

<style>
</style>
