<template>
	<div>
		<el-container>
		  <el-header>
			  <h1>seed hotel 后台管理系统</h1>
		  </el-header>
		  <el-container>
		    <el-aside>
				<el-menu 
				default-active="1-4-1" 
				class="el-menu-vertical-demo" 
				:collapse="isCollapse"
				background-color="#f8f5f3"
				text-color="black"
				active-text-color="#ffd04b"
				router :default-active="$route.path">
					<el-menu-item class="icon">
					  <i class="el-icon-menu" @click="isCollapse = !isCollapse"></i>
					</el-menu-item>
				  <el-submenu index="1">
				    <template slot="title">
				      <i class="el-icon-s-custom"></i>
				      <span slot="title">账号管理</span>
				    </template>
				    <el-menu-item-group>
				      <!-- <span slot="title"></span> -->
				      <el-menu-item index="/index/clientdata">查看/编辑客户账号</el-menu-item>
				      <el-menu-item index="/index/staffdata">查看/编辑前台人员账号</el-menu-item>
				    </el-menu-item-group>
				  </el-submenu>
				 <el-submenu index="2">
				   <template slot="title">
				     <i class="el-icon-house"></i>
				     <span slot="title">客房管理</span>
				   </template>
				   <el-menu-item-group>
				     <!-- <span slot="title"></span> -->
				     <el-menu-item index="/index/roomdata">查看/编辑客房</el-menu-item>
					 <el-menu-item index="/index/preroomdata">查看/编辑订房</el-menu-item>
				   </el-menu-item-group>
				 </el-submenu>
				  <el-submenu index="3">
				    <template slot="title">
				      <i class="el-icon-dish"></i>
				      <span slot="title">餐饮管理</span>
				    </template>
				    <el-menu-item-group>
				      <!-- <span slot="title"></span> -->
				      <el-menu-item index="/index/canteendata">查看/编辑餐厅</el-menu-item>
				    </el-menu-item-group>
					<el-menu-item-group>
					  <el-menu-item index="/index/reservationdata">查看/编辑订位</el-menu-item>
					</el-menu-item-group>
				  </el-submenu>
				  <el-menu-item @click="exit">
				      <i class="el-icon-switch-button"></i>
				      <span slot="title">退出登录</span>
				    </el-menu-item>
				</el-menu>
			</el-aside>
		    <el-main>
				<router-view/>
			</el-main>
		  </el-container>
		</el-container>

	</div>
</template>

<script>
	  export default {
	    data() {
	      return {
	        isCollapse: false
	      };
	    },
		methods: {
		        exit(){
		            window.sessionStorage.removeItem('data');
		            // window.location.reload()
		            this.$router.push('/admin')
		        },
		    }
	  }
</script>

<style scoped lang="less">
	@header-height: 88px;
	.el-header {
	    background-color: #69738e;
	    color: #f8f5f3;
		display: block;
		text-align: center;
		line-height: 48px;
		height: @header-height !important;
	  }
	  // .el-main {
	  //   background-color: #e9eef3;
	  //   color: #333;
	  //   height: calc(100vh - @header-height);
	  // }
	  
	  ::v-deep .icon{
	  	text-align: right;
	  	}
	   .el-menu-vertical-demo:not(.el-menu--collapse) {
	      width: 200px;
	      min-height: 400px;
	    }
	  
	  /* .el-aside {
	    background-color: #D3DCE6;
	    color: #333;
	    text-align: center;
	    line-height: 200px;
	  } */
	  
	  /* .el-main {
	      background-color: #E9EEF3;
	      color: #333;
	      text-align: center;
	      
	    } */
	h1 {
		font-size: 30px;
	}
</style>
