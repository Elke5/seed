<template>
	<div class="dl">
		<!-- <router-link :to="{ name: 'userhome' }">
		  <i class="el-icon-back">首页</i>
		</router-link> -->
		<div class="center">
		<el-form
		:model="ruleForm" 
		:rules="rules" 
		ref="ruleForm" 
		class="demo-ruleForm"
		label-width="auto"
		>
		<h1>用户登录</h1>
		  <el-form-item label="账号:" prop="name">
		    <el-input v-model="ruleForm.name" placeholder="请输入手机号码">
				<i class="el-icon-close"></i>
			</el-input>
		  </el-form-item>
		   <el-form-item label="密码:" prop="pass">
		      <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
		    </el-form-item>
			<el-col :span="13">
			<el-form-item label="验证码:" prop="code">
			   <el-input v-model="ruleForm.code" autocomplete="off" placeholder="请输入验证码"></el-input>
			 </el-form-item>
			 </el-col>
			 <el-col :span="11">
				 <div class="form-code" width="100%" @click="reCode">
					 <s-identify :identifyCode="identifyCode"></s-identify>
				 </div>
			 </el-col>
			  <el-col :span="18">
		  <el-form-item>
		      <el-button type="primary" @click="submitForm('ruleForm');save()">立即登录</el-button>
		      <el-button @click="resetForm('ruleForm')">重置</el-button>
			  <router-link :to="{name: 'user-zc'}">
				  <el-link type="primary" :underline="false">注册</el-link>
			  </router-link>
		    </el-form-item>
			</el-col>
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
                     if (this.ruleForm.code !== '') {
                     this.$refs.ruleForm.validateField('code');
                    }
                     callback();
                    }
			     };
			var validateCode = (rule, value, callback) => {
				if (value === '') {
				  callback(new Error('请输入验证码'));
				}
				else if (this.ruleForm.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
				    callback(new Error('请填写正确验证码'))
				    this.reCode()
				    return
				}else {
		              callback();
		            }

			};
	      return {
			  st: "false",
			   id: '',
	        ruleForm: {
	          name: '',
			  pass: '',
			  code: '',
	        },
			identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',//随机串内容
			   identifyCode: '',
	        rules: {
	          name: [
	            { required: true, message: '请输入手机号码', trigger: 'blur' },
	            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确',trigger: 'blur'},
	          ],
			   pass: [
			    { required: true, validator: validatePass, trigger: 'blur' }
			  ],
			  code: [{ required: true, validator: validateCode, trigger: "blur" }],
			},
		  };
		},
	 methods: {
		       //提交按钮绑定事件
		       submitForm(formName) {
			   this.$refs[formName].validate((valid) => {
			     if (valid) {
			   let data = {
		          userName: this.ruleForm.name,
		          userPassword: this.ruleForm.pass
		        }
		        //通过axios把数据传递给服务端，记得装axios依赖
		       this.axios.get('/api/login/getuser', {
		          params: data
		        }).then((res) => {
		        var code = res.data.statusCode
		                 var msg = res.data.msg
		                 if( code == 200) {
		                    var ses = window.sessionStorage
		                    var d = JSON.stringify(res.data.name)
		                    ses.setItem('data1',d)
		                    this.$router.push('/usersy/roomshow')
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
				
				 save(){
				      this.st="true";//修改登录状态为true
				      sessionStorage.setItem('s',this.st);
				      console.log(sessionStorage.s);
					  sessionStorage.setItem('account', this.ruleForm.name);
					  console.log(sessionStorage.account);
					  // sessionStorage.setItem('id', this.id);
					  // console.log(sessionStorage.id);
				    },
		  
	
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
		    // 重置验证码
		    reCode () {
		     this.identifyCode = ''
		     this.makeCode(this.identifyCodes, 4)
		    },
		    makeCode (o, l) {
		     for (let i = 0; i < l; i++) {
		      this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
		     }
		    },
		    randomNum (min, max) {
		     return Math.floor(Math.random() * (max - min) + min)
		    },
	    },
		mounted () {
		  // 初始化验证码
		  this.identifyCode = ''
		  this.makeCode(this.identifyCodes, 4)
		 },
		 // mounted: function (){
		 
		 // this.$options.methods.submitForm(this)
		 
		 // }
	}
</script>

<style scoped>
	::v-deep .el-form-item .el-input{
		width: 80%;
		}
	.center {
		width: 600px;
		height: 350px;
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
		padding: 45px 2px 10px 68px;
	}
	.el-link {
		font-size: 110%;
		margin-left: 85px;
	}
</style>
