<template>
	<div>
		<el-page-header @back="back" content="前台人员具体信息" style="font-weight: bolder;line-height: 70px;">
		</el-page-header>
		 <el-descriptions
		 style="width: 35vw"
		 class="margin-top" 
		 :column="1" border
		 v-for="(idlist) in staff">
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
		        <span class="descriptiontitle">ID</span>
		      </template>
			  {{idlist.id}}
		    </el-descriptions-item>
		    <el-descriptions-item>
		      <template slot="label">
		        <i class="el-icon-user"></i>
		        工号
		      </template>
		      {{idlist.jobnum}}
		    </el-descriptions-item>
		    
		    <el-descriptions-item>
		      <template slot="label">
		        <i class="el-icon-lock"></i>
		        密码
		      </template>
			  {{idlist.pass}}
		    </el-descriptions-item>
		  </el-descriptions>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
	  name: "ClientDetail",
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
	    	 staff(){
	    	      if(this.data.staff){
	    	        return this.data.staff
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
	  let res=await axios.get('/api/staff/id',{params:{id: this.$route.params.id}}).then(res => {
	    this.data = res.data
	  }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
	    methods: {
			edit() {
				this.$router.push({
				  name: "staff-update",
				  params:{
					  id: this.$route.params.id
				  }
				  })
			},
			back(){
				this.$router.push({
				  name: "staff-data",
				  })
			},
		},
	}
</script>

<style scoped>
</style>
