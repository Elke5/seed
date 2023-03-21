<template>
	<el-container>
	<el-header>
		<img height="50" width="50" :src="logo" />
		<h1>seed hotel</h1>
		<div class="right">
			<!-- <span class="users"> -->
				<el-button 
				round icon="el-icon-tickets" 
				size="medium" 
				@click="pre">我的预订</el-button>
				
			<el-popover
			  v-model="showPopover"
			  placement="right"
			  width="300"
			  trigger="click">
			  <div class="person">
				  <el-avatar :size="50" :src="circleUrl"></el-avatar><br />
				  <span><b>{{client.username}}</b></span><br />
			  </div>
			  <el-popover
			    placement="left"
			    width="300"
			    trigger="click">
				<el-form 
				   :label-position="labelPosition" 
				   label-width="80px" 
				   :model="client"
				   size="mini">
				  <el-form-item label="用户名">
				    <el-input v-model="client.username"></el-input>
				  </el-form-item>
				  <el-form-item label="性别">
				    <el-select v-model="client.sex" placeholder="请选择">
				     <el-option label="男" value="男"></el-option>
				     <el-option label="女" value="女"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="出生日期">
				     <el-date-picker
				           v-model="client.birth"
				           type="date"
				           placeholder="选择日期"
						   value-format="yyyy-MM-dd">
				     </el-date-picker>
				  </el-form-item>
				  <el-button 
				      type="success" plain 
				      @click="submit" 
					  style="float: right;"
					  size="mini">立即修改</el-button>
				</el-form>
			    <el-button 
				     slot="reference" 
					 icon="el-icon-edit" 
					 type="text">
					编辑个人资料
				</el-button>
			  </el-popover>
			  <div class="show">
				  <span>性别：{{client.sex}}</span>
				  <br />
				  <span>出生日期：{{client.birth}}</span>
				  <br />
			  </div>
			  <el-button type="text" @click="logout" class="logout">退出登录</el-button>
				 <el-button
				 slot="reference"
				 circle icon="el-icon-user" 
				 title="个人中心" 
				 @click="login"></el-button>
			</el-popover>
		</div>
		
		</el-header>
	<el-main>
		<router-view/>
	</el-main>
	<el-footer>
		<span>举报投诉热线
		<i class="el-icon-phone">123456789</i>
		</span>
	</el-footer>
	</el-container>
</template>

<script>
	import axios from 'axios'
	import logo from "@/assets/logo.jpg";
	export default {
		inject: ['reload'],
	  data() {
	    return {
	      logo,
		  isAuth:"",
		  account:"",
		  showPopover:false,
		  labelPosition:"top",
		  circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
		  client:{
			  username:"",
			  sex:"",
			  birth:"",
		  },
	    };
	  },
	  async created() {
		  //获取登录账号
	    var storage = window.sessionStorage;
	    var json = storage.getItem('account');
	    this.account = JSON.parse(json)
	    let res=await axios.get('/api/client/show',{params:{account: this.account}}).then(res => {
		 this.data = res.data
	     this.client.username = res.data[0].username
		 this.client.sex = res.data[0].sex
		 this.client.birth = res.data[0].birth
	    })
		// .catch(() => {
	 //      this.$message.error("网络错误，请刷新重试！");
	 //    })
	  },
	  methods: {
		  login() {
			  if(sessionStorage.s === "true")
			      {
					this.showPopover = false 
			        // console.log(sessionStorage['s'])
			      }
			  else {
				  this.showPopover = true
			  	//如果登录状态是false，那么跳转至登录页面,需要登录才能进入主页面
			        this.$message.error('请先登录');
			        this.$router.push('/login')
			        console.log("需要登录")
			    
			  }
		  },
            pre() {
			  if(sessionStorage.s === "true")
			      {
			        // this.$router.push('/userzc')
			        // console.log(localStorage['s'])
					 this.$router.push('/userpre')
			      }else {
			  	//如果登录状态是false，那么跳转至登录页面,需要登录才能进入主页面
			        this.$message.error('请先登录');
			        this.$router.push('/login')
			        console.log("需要登录")
			    
			  }
		  },
		  submit() {
		    let data = {
				   account: this.account,
				   username:this.client.username,
		           sex: this.client.sex,
				   birth: this.client.birth
		          }
		          this.axios.get('/api/client/userchange', {
		            params: data
		          }).then((res) => {
		             var code = res.data.statusCode
		             var msg = res.data.msg
		             if( code == 200) {
		                 // console.log(res.data)
		                 this.$alert(msg,{
		                   dangerouslyUseHTMLString: true
		              }).then(() => {
		                  this.reload()
		              });
		              
		              }else {
		                this.$message({
		                	 type: 'success',
		                	 message: '已修改!'
		                })
		              }
		          })
		        },
		  // index() {
			 //  var storage = window.sessionStorage;
			 //  var json = storage.getItem('account');
			 //  this.account = JSON.parse(json)
			 //  this.axios.get('/api/preroom/order',{
			 //  					params: {
			 //  						account:this.account,
				// 					}}).then(res=>{
				// 						}
		  // }
		  logout(){
			  this.isAuth="false";//修改登录状态
			  sessionStorage.setItem('s',this.isAuth);
			   this.$message({
			   	     type: 'success',
			   	     message: '已退出'
			   })
			   this.$router.push('/')
			   this.reload()
		  },
	  }
	};
</script>

<style scoped lang="less">
	body {
	  font-family: Avenir, Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  margin-top: 60px;
	}
	.el-container {
		min-height: 100vh;
	}
	@header-height: 80px;
	@footer-height: 55px;
	.el-header{
	  background-color: #b99a7b;
	  color: #ffffff;
	  height: @header-height !important;
	  display: flex;
	  align-items: center;
	}
	.person {
		display: block;
		text-align: center;
		margin-bottom: 15px;
	}
	.show {
		font-size: 15px;
		margin: 5px 10px;
	}
	.submit {
		margin-right: 20px;
	}
	.logout {
		float: right;
	}
	.el-button {
		margin-left: 10px;
	}
	h1 {
	    margin-left: 10px;
		font-family: "Courier New", cursive, serif, sans-serif;
	  }
	.right {
		  margin-left: auto;
	  }
	.el-dropdown-link {
		margin: 0 8px;
		cursor: pointer;
		color: #409EFF;
	}
	.el-footer {
		  background-color: #b99a7b;
		  color: #ffffff;
		  height: @footer-height !important;
		  display: block;
		  text-align: center;
		  line-height: 55px;
	  }
</style>
