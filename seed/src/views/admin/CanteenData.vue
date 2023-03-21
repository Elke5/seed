<template>
	<div>
		<h1>餐厅信息</h1>
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
		:data="canteen"
		v-loading="loading" 
		border stripe style="width: 54vw"
		>
		  <el-table-column label="ID" width="150" align="center" prop="id"></el-table-column>
		  <el-table-column label="类型" width="300" align="center" prop="type"></el-table-column>	
		  <!-- <el-table-column label="介绍" prop="content"></el-table-column> -->
		  <el-table-column label="操作" align="center">
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
	  name: "CanteenData",
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
	    	 canteen(){
	    	      if(this.data.canteen){
	    	        return this.data.canteen
	    	      }else{
	    	        return []
	    	      }
	    	    },
	  },
	  async created() {
	    let res=await axios.get('/api/canteen/data').then(res=>{
	          // console.log(res.data[0])
	          this.data=res.data
			    })
	  },
	  methods: {
		  onSearch(val) {
		        
		        this.axios.get('/api/canteen/search',{params:{value: val}}).then(res=>{
		        // console.log(res.data[0])
		        this.data=res.data
		        // console.log(res.data)
		      })
		      },

	    
	    handleDetail(row) {
	      this.$router.push({
	        name: "canteen-detail",
	        params: {
	          id: row.id,
	        },
	      });
	    },
		
        handleEdit(row) {
		  this.$router.push({
		    name: "canteen-update",
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
		     axios.get('/api/canteen/del',{params:{id: val}}).then(res=>{
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
				             
				               this.$router.go(0)
				            this.reload()
				             
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
		    name: "canteen-add",
		  });
		},
	    },
	}
</script>

<style scoped>
.rbutton {
	float: right;
	margin-right: 20vw;
	margin-bottom: 5px;
}
</style>
