<template>
	<div class="bj1">
		<h1 class="title">seed hotel工作系统</h1>
		<el-row>
		<el-col :span="6">
		 <div class="avatar">
			 <el-card :body-style="{ padding: '28px' }" shadow="hover" class="card">
				 <i class="el-icon-user-solid"></i>
			 </el-card>
		 </div>
		 <div class="under">
		  <span class="jobnum"><b>工号：{{jobnum}}</b></span><br />
		  <el-button 
		     type="primary" round 
			 @click="logout" 
			 class="logout"
			 size="medium">退出登录</el-button>
		 </div>
		</el-col>
		<el-col :span="17" class="colright">
		  <h2 style="margin-bottom: 8px;">预订管理</h2>
		  <el-menu 
		     router :default-active="$route.path"  
			 class="el-menu-demo" 
			 mode="horizontal">
		    <el-menu-item index="/staffsy/preroomcheck">客房预订</el-menu-item>
		    <el-menu-item index="/staffsy/reservationcheck">餐位预订</el-menu-item>
		  </el-menu>
		  <div class="preroomtable">
			  <router-view/>
		  </div>
		</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		inject: ['reload'],
		 data () {
		      return {
				jobnum:"",
		      }
		    },
		 async created() {
		 		  //获取登录工号
		    var storage = window.sessionStorage;
		    var json = storage.getItem('jobnum');
		    this.jobnum = JSON.parse(json)
		  },
		 methods: {
			 logout(){
			 	 window.sessionStorage.removeItem('data');
			 	 this.$router.push('/staff')
			 },
		 }
	}
</script>

<style scoped>
	.bj1 {
		margin-top: -1.9rem;
		width: 100vw;
		height: 600px;
		background-image: url(@/assets/staff/staffmenu1.jpg);
	}
	.title {
		font-weight: bolder;
		padding-top: 50px;
		margin-left: 30px;
	}
	.avatar {
		margin-top: 25px;
		font-size: 70px;
	}
	.card {
		margin-left: 50px;
		margin-bottom: 5px;
		width: 130px;
		height: 130px;
	}
	.under {
		margin-left: 63px;
	}
	.jobnum {
		line-height: 35px;
	}
	.colright {
		margin-top: 85px;
	}
	.preroomtable {
		margin-top: 38px;
	}
</style>
