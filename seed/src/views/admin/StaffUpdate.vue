<template>
	<div>
		<el-page-header @back="back" content="修改前台人员信息" style="font-weight: bolder;line-height: 70px;">
		</el-page-header>
		 <el-form
		   ref="staffform"
		   label-width="100px"
		 >
		   <el-form-item label="ID" prop="id">
		     <el-input v-model="id" readonly></el-input>
		   </el-form-item>
		   <el-form-item label="工号" prop="username">
		     <el-input v-model="jobnum"></el-input>
		   </el-form-item>
		   
		   <el-form-item label="密码" prop="pass">
		     <el-input v-model="pass"></el-input>
		   </el-form-item>
		   <el-form-item>
		     <el-button type="primary" @click="submitForm">立即修改</el-button>
		   </el-form-item>
		 </el-form>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
	  inject: ['reload'],
	  name: "StaffUpdate",
	  data() {
	    return {
			id: "",
		    jobnum: "",
		    pass: "",
	    };
	  },
	  // 计算属性选项
	  // computed: {
	  //   	client(){
	  //   	     if(this.data.client){
	  //   	       return this.data.client
	  //   	     }else{
	  //   	       return []
	  //   	     }
	  //   	   },
	  // },
	  
	 async created() {      
		  // let ids  = sessionStorage.getItem('data')
		  // this.$route.params.id = JSON.parse(ids)
	  // 获取当前页面路由参数id
	  const { id } = this.$route.params.id
		console.log('created:',this.$route.params)
	  let res=await axios.get('/api/staff/update',{params:{id: this.$route.params.id}}).then(res => {
       this.data = res.data
	   this.id = this.$route.params.id
	   this.jobnum = res.data[0].jobnum
	   this.pass = res.data[0].pass
	  }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
	    methods: {
			submitForm() {
			  let data = {
			          id :this.id,
			          jobnum: this.jobnum,
			          pass: this.pass,
			        }
			        this.axios.get('/api/staff/updatelist', {
			          params: data
			        }).then((res) => {
			           var code = res.data.statusCode
			           var msg = res.data.msg
			           if( code == 200) {
			               console.log(res.data)
			               this.$alert(msg,{
			                 dangerouslyUseHTMLString: true
			            }).then(() => {
			                this.reload()
			            });
			            
			            }else {
			              
			              this.$alert( msg,{
			                dangerouslyUseHTMLString: true 
			            }).then(() => {
			            confirm:this.$router.push({
	                        name: "staff-detail",
	                        params: {
	                        id: this.id,
	                        },
	                      });
			            });
			            }
			          
			        })
			      },
			
			back(){
				this.$router.push('/index/staffdata')
			},
		},
		
		
	    
	}
</script>

<style scoped>
	.el-form {
		margin-left: 70px;
	}
	::v-deep .el-form-item {width: 60%;}
</style>
