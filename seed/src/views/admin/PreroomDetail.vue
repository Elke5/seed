<template>
	<div>
		<el-page-header @back="back" content="订房具体信息" style="font-weight: bolder;line-height: 70px;">
		</el-page-header>
		 <el-descriptions
		 style="width: 65vw"
		 class="margin-top" 
		 :column="1" border
		 v-for="(idlist) in preroom">
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
		        ID
		      </template>
			  {{idlist.id}}
		    </el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
			    预订号
			  </template>
			  {{idlist.ordernum}}
			</el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
			    预订账号
			  </template>
			  {{idlist.account}}
			</el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
			    姓名
			  </template>
			  {{idlist.name}}
			</el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
			    联系电话
			  </template>
			  {{idlist.phone}}
			</el-descriptions-item>
		    <el-descriptions-item>
		      <template slot="label">
		        房间类型
		      </template>
		      {{idlist.type}}
		    </el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
			    早餐
			  </template>
			  {{idlist.breakfast}}
			</el-descriptions-item>
		    <el-descriptions-item>
		      <template slot="label">
		        房间数量
		      </template>
		     {{idlist.roomnum}}
		    </el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
			    入住时间
			  </template>
			  {{idlist.intime}}
			</el-descriptions-item>
		    <el-descriptions-item>
		      <template slot="label">
		        预计到店
		      </template>
			  {{idlist.arrtime}}
		    </el-descriptions-item>
		    <el-descriptions-item>
		      <template slot="label">
		        预订时间
		      </template>
		      {{idlist.pretime}}
		    </el-descriptions-item>
			<el-descriptions-item>
			  <template slot="label">
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
	  name: "PreroomDetail",
	  // 局部注册组件
		
	  data() {
	    return {
		  data:{},
		  id:'',
		  labelStyle: { 'width': '130px' }
	    };
	  },
	  // 计算属性选项
	  computed: {
	    	 preroom(){
	    	      if(this.data.preroom){
	    	        return this.data.preroom
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
	  let res=await axios.get('/api/preroom/id',{params:{id: this.$route.params.id}}).then(res => {
	    this.data = res.data
	  }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
	    methods: {
			edit() {
				this.$router.push({
				  name: "preroom-update",
				  params: {
				    id: this.$route.params.id,
				  },
				  })
			},
			back(){
				this.$router.push({
				  name: "preroom-data",
				  })
			},
		},
		
		
	    
	}
</script>

<style>
</style>
