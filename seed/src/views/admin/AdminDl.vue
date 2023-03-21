<template>
	<div class="bj">
		<h1>seed hotel后台管理系统</h1>
		<div class="center">
		<el-form 
		:model="ruleForm" 
		:rules="rules" 
		ref="ruleForm" 
		class="demo-ruleForm"
		label-width="auto">
		  <el-form-item label="账号:" prop="name">
		    <el-input v-model="ruleForm.name" placeholder="请输入管理员账号">
				<i class="el-icon-close"></i>
			</el-input>
		  </el-form-item>
		   <el-form-item label="密码:" prop="pwd">
		      <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" placeholder="请输入密码"></el-input>
		    </el-form-item>
			<el-col :span="22">
		  <el-form-item>
		      <el-button type="primary" @click="submitForm()">立即登录</el-button>
		      <el-button @click="resetForm('ruleForm')">重置</el-button>
		    </el-form-item>
			</el-col>
		</el-form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import VueAxios from 'vue-axios'
	export default {
	   data() {
				var validatePass = (rule, value, callback) => {
				       if (value === '') {
				         callback(new Error('请输入密码'));
				       }
				     };
	     return {
	       ruleForm: {
	         name: '',
			 pwd: '',
				},  
		   rules: {
			   name:  { required: true, message: '请输入管理员账号 ', trigger: 'blur' }, 
			   pwd: [
			     { required: true, validator: validatePass, trigger: 'blur' }
			   ],
		   },
	     };
		},
		methods: {
          submitForm() {
		       //定义一个date对象存输入框获取到的用户名和密码
		        let data = {
		          userName: this.ruleForm.name,
		          userPassword: this.ruleForm.pwd
		        }
		        //通过axios把数据传递给服务端，记得装axios依赖
		       this.axios.get('/api/login/getadmin', {
		          params: data
		        }).then((res) => {
		        var code = res.data.statusCode
		                 var msg = res.data.msg
		                 if( code == 200) {
		                  //  console.log(res.data)
		                    var ses = window.sessionStorage
		                    var d = JSON.stringify(res.data.name)
		                    ses.setItem('data',d)
		                    this.$router.push('/index/clientdata')
		                    // this.$router.go(-1)
		                    // this.role = res.data.role
		                    // if(this.role==1){
		                    //   confirm:this.$router.push('/user/userdl')
		                    // }else if(this.role==2){
		                    //   confirm:this.$router.push('/personal')
		                    // }
		                    // else if(this.role==3){
		                    //   confirm:this.$router.push('/user/usersy')
		                    // }
		                   
		                    
		                  }else {
							  this.$alert(msg, {
							            dangerouslyUseHTMLString: true
							          });
		                  //   Dialog.alert({
		                  //   message: msg,
		                  // }).then(() => {
		                  // // on close
		                  // });
		                  }
		                
		              })
		        },
			resetForm(formName) {
			  this.$refs[formName].resetFields();
			},
		},
    }
</script>

<style scoped>
	.bj {
		margin-top: -1.9rem;
		width: 100vw;
		height: 655px;
		background-image: url(@/assets/adminlogin.jpg);
		
	}
	h1 {
		color: white;
		font-size: 45px;
		padding-top: 3.5vw;
		text-align: center;
	}
	/* ::v-deep .el-form-item .el-input{
		width: 100%;
		} */
	.center {
		width: 500px;
		height: 300px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	    position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* .el-form {
		padding: 45px 2px 10px 0px;
	} */
</style>
