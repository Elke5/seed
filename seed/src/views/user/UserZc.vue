<template>
	<div>
		<div class="center">
		<el-form
		:model="ruleForm" 
		:rules="rules" 
		ref="ruleForm" 
		class="demo-ruleForm"
		label-width="auto"
		>
		<h1>用户注册</h1>
		  <el-form-item label="用户名:" prop="username">
		    <el-input v-model="ruleForm.username" placeholder="请输入用户名">
				<i class="el-icon-close"></i>
			</el-input>
		  </el-form-item>
		  <el-form-item label="手机号码:" prop="phone">
		    <el-input v-model="ruleForm.phone" placeholder="请输入手机号码">
		  		<i class="el-icon-phone"></i>
		  	</el-input>
		  </el-form-item>
		   <el-form-item label="密码:" prop="pass">
		      <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
		    </el-form-item>
			<el-form-item label="确认密码:" prop="checkpass">
			   <el-input type="password" v-model="ruleForm.checkpass" autocomplete="off" placeholder="请再次输入密码"></el-input>
			 </el-form-item>
		  <el-form-item>
		      <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
		      <el-button @click="resetForm('ruleForm')">重置</el-button>
			  <router-link :to="{name: 'login'}">
				  <el-link type="primary" :underline="false">去登录</el-link>
			  </router-link>
		    </el-form-item>
		</el-form>
		</div>
	</div>
</template>

<script>
    import axios from 'axios';
	import VueAxios from 'vue-axios'
	// import { Dialog } from 'vant';
	 export default {
	    data() {
			var validatePass = (rule, value, callback) => {
			        if (value === '') {
			         callback(new Error('请输入密码'));
			        }else {
                     if (this.ruleForm.checkPass !== '') {
                     this.$refs.ruleForm.validateField('checkPass');
                    }
                     callback();
                    }
			     };
		    var validatePass2 = (rule, value, callback) => {
		            if (value === '') {
		              callback(new Error('请再次输入密码'));
		            } else if (value !== this.ruleForm.pass) {
		              callback(new Error('两次输入密码不一致!'));
		            } else {
		              callback();
		            }
		          };
	      return {
	        ruleForm: {
	          username: '',
			  phone: '',
			  pass: '',
			  checkpass: '',
	        },
	        rules: {
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 8, message: '长度在 3 到 8 个字', trigger: 'blur' }
          ],
	          phone: [
	            { required: true, message: '请输入手机号码', trigger: 'blur' },
	            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确',trigger: 'blur'},
	          ],
			   pass: [
			    { required: true, validator: validatePass, trigger: 'blur' }
			  ],
			  checkpass: [{ required: true, validator: validatePass2, trigger: "blur" }],
			},
		  };
		},
	 methods: {
		       //提交按钮绑定事件
		submitForm(formName) {
		  this.$refs[formName].validate((valid) => {
		    if (valid) {
			   let data = {
		          userName: this.ruleForm.username,
				  Phone:this.ruleForm.phone,
		          userPassword: this.ruleForm.pass
		        }
		        //通过axios把数据传递给服务端，记得装axios依赖
		       this.axios.get('/api/client/add', {
		          params: data
		        }).then((res) => {
		        var code = res.data.statusCode
		                 var msg = res.data.msg
		                 if( code == 200) {
		                  //  console.log(res.data)
		                    var ses = window.sessionStorage
		                    var d = JSON.stringify(res.data.name)
		                    ses.setItem('data',d)
		                    this.$alert(msg,{
		                         dangerouslyUseHTMLString: true
		                    }).then(() => {
		                       this.$router.push('/login')
		                    });
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
		                   
		                 
		                  }
						  else {
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
				}else {
				    console.log('error submit!!');
				    return false;
				    }
			});		
	  },
		  
	
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
		    // 重置验证码
	    },
		 // mounted: function (){
		 
		 // this.$options.methods.submitForm(this)
		 
		 // }
	}
</script>

<style scope>
::v-deep .el-form-item .el-input{
		width: 80%;
		}
	.center {
		width: 600px;
		height: 400px;
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
	.el-form {
		padding: 30px 2px 10px 5px;
	}
	.el-link {
		font-size: 110%;
		margin-left: 85px;
	}
</style>
