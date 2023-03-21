<template>
	<div>
		<el-page-header @back="back" content="修改客户信息" style="font-weight: bolder;line-height: 70px;">
		</el-page-header>
		 <el-form
		   ref="clientform"
		   label-width="100px"
		 >
		   <el-form-item label="ID" prop="id">
		     <el-input v-model="id" readonly></el-input>
		   </el-form-item>
		   <el-form-item label="用户名" prop="username">
		     <el-input v-model="username"></el-input>
		   </el-form-item>
		   <el-form-item label="账号" prop="account">
		     <el-input v-model="account"></el-input>
		   </el-form-item>
		   <el-form-item label="密码" prop="pass">
		     <el-input v-model="pass"></el-input>
		   </el-form-item>
		   <el-form-item label="出生日期" prop="age">
		     <el-date-picker
		           v-model="birth"
		           type="date"
		           placeholder="选择日期"
		     	   value-format="yyyy-MM-dd">
		     </el-date-picker>
		   </el-form-item>
		   <el-form-item label="性别" prop="sex">
		       <el-select v-model="sex" placeholder="请选择性别">
		         <el-option label="男" value="男"></el-option>
		         <el-option label="女" value="女"></el-option>
		       </el-select>
		     </el-form-item>
		   <el-form-item label="备注" prop="other">
		     <el-input v-model="other"></el-input>
		   </el-form-item>
		  <!-- <el-form-item label="浏览次数" prop="view_count">
		     <el-input v-model="student.view_count" readonly></el-input>
		   </el-form-item> -->
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
	  name: "ClientUpdate",
	  data() {
	    return {
			id: "",
		    username: "",
		    account: "",
		    pass: "",
			birth: "",
		    sex: "",
		    other: "",
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
	  let res=await axios.get('/api/client/update',{params:{id: this.$route.params.id}}).then(res => {
       this.data = res.data
	   this.id = this.$route.params.id
	   this.username = res.data[0].username
	   this.account = res.data[0].account
	   this.pass = res.data[0].pass
	   this.birth = res.data[0].birth
	   this.sex = res.data[0].sex
	   this.other = res.data[0].other
	  }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
	    methods: {
			submitForm() {
			  let data = {
			          id :this.id,
			          userName: this.username,
			          account: this.account,
			          pass: this.pass,
			          birth: this.birth,
			          sex:this.sex,
			          other:this.other
			        }
			        this.axios.get('/api/client/updatelist', {
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
	                        name: "client-detail",
	                        params: {
	                        id: this.id,
	                        },
	                      });
			            });
			            }
			          
			        })
			      },
			
			back(){
				this.$router.push('/index/clientdata')
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
