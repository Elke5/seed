<template>
	<div>
		<el-page-header @back="back" content="客户具体信息" style="font-weight: bolder;margin-top: 30px;">
        </el-page-header>
		 <el-descriptions
		 style="width: 45vw"
		 class="margin-top" 
		 :column="1" border
		 v-for="(idlist) in client">
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
		        <i class="el-icon-user"></i>
		        用户名
		      </template>
		      {{idlist.username}}
		    </el-descriptions-item>
		    <el-descriptions-item>
		      <template slot="label">
		        <i class="el-icon-phone"></i>
		        账号
		      </template>
		     {{idlist.account}}
		    </el-descriptions-item>
		    <el-descriptions-item>
		      <template slot="label">
		        <i class="el-icon-lock"></i>
		        密码
		      </template>
			  {{idlist.pass}}
		    </el-descriptions-item>
		    <el-descriptions-item>
		      <template slot="label">
		        <i class="el-icon-date"></i>
		        出生日期
		      </template>
		      {{idlist.birth}}
		    </el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
			    <i class="el-icon-s-check"></i>
			    性别
			  </template>
			  {{idlist.sex}}
			</el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
			    <i class="el-icon-tickets"></i>
			    备注
			  </template>
			  {{idlist.other}}
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
	    	 client(){
	    	      if(this.data.client){
	    	        return this.data.client
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
	  let res=await axios.get('/api/client/id',{params:{id: this.$route.params.id}}).then(res => {
	    this.data = res.data
	  }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
	    methods: {
			edit() {
				this.$router.push({
				  name: "client-update",
				  params: {
				  id: this.$route.params.id,
				  },
				  })
			},
			back(){
				this.$router.go(-1)
			},
		},
		
		
	    
	}
</script>

<style>
</style>
