<template>
	<div>
		<h1>客户信息</h1>
		<SearchInput @onSearch="onSearch">
		 <template v-slot:text>
		    <span>搜索</span>
		  </template>
		</SearchInput>
		<el-button
		class="rbutton"
		icon="el-icon-plus"
		type="primary" 
		size="medium" 
		@click="add()">新增</el-button>
		<el-table 
		:data="client"
		v-loading="loading" 
		border stripe style="width: 67%"
		>
		  <el-table-column label="ID" width="80" align="center" prop="id"></el-table-column>
		  <el-table-column label="用户名" width="150" prop="username"></el-table-column>
		  <el-table-column label="性别" width="100" prop="sex"></el-table-column>	
		  <el-table-column label="账号" width="150" prop="account"></el-table-column>
		  <el-table-column width="150" label="" align="center">
		    <template slot-scope="scope">
		      <el-button
		        size="mini"
		        icon="el-icon-view"
		        type="success"
		        circle
		        @click="handleDetail(scope.row)"
		      ></el-button>
			  <el-button
			    size="mini"
			    icon="el-icon-edit"
			    type="primary"
			    circle
			    @click="handleEdit(scope.row)"
			  ></el-button>
			  <el-button
			    size="mini"
			    type="danger"
			    icon="el-icon-delete"
			    circle
			    @click="handleDelete(scope.row.id)"
			  ></el-button>
		    </template>
		  </el-table-column>
		</el-table>
	</div>
</template>

<script>
	import axios from 'axios'
	import SearchInput from "@/components/SearchInput"
	export default {
	  inject: ['reload'],
	  name: "ClientData",
	  // 局部注册组件
		components: {
	    SearchInput
		},
	  data() {
	    return {
		  data:{},
		  value: '',  
	      loading: false,
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
	    let res=await axios.get('/api/client/data').then(res=>{
	          // console.log(res.data[0])
	          this.data=res.data
			    })
	  },
	  methods: {
		  onSearch(val) {
		        
		        this.axios.get('/api/client/search',{params:{value: val}}).then(res=>{
		        // console.log(res.data[0])
		        this.data=res.data
		        // console.log(res.data)
		      })
		      },

	    
	    handleDetail(row) {
	      this.$router.push({
	        name: "client-detail",
	        params: {
	          id: row.id,
	        },
	      });
	    },
		handleEdit(row) {
		  this.$router.push({
		    name: "client-update",
		    params: {
		      id: row.id,
		    },
		  });
		},
		handleDelete(val) {
		  this.$confirm("此操作将永久删除该数据, 是否继续?", "警告", {
		    confirmButtonText: "确定",
		    cancelButtonText: "取消",
		    type: "warning",
		  })
		    .then(async () => {
		     axios.get('/api/client/del',{params:{id: val}}).then(res=>{
				 this.data=res.data
				  var code = res.data.statusCode
				          var msg = res.data.msg
				          if( code == 200) {
				          this.$alert(msg,{
				              dangerouslyUseHTMLString: true
				           }).then(() => {
				           // on close
				           this.reload()
				           });
				           }else {
				             this.$alert(msg,{
				              dangerouslyUseHTMLString: true
				           }).then(() => {
				           // on close
				           });
				           }
		    })
			})
		    .catch(() => {
		      this.$message({
		        type: "info",
		        message: "已取消删除",
		      });
		    });
		
		},
		add() {
		  this.$router.push({
		    name: "client-add",
		  });
		},
	    },
	}
</script>

<style scoped>
	.rbutton {
		float: right;
		margin-right: 25vw;
		margin-bottom: 5px;
	}	
</style>
