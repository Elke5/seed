<template>
	<div>
		<SearchInput @onSearch="onSearch">
		 <template v-slot:text>
		    <span>搜索</span>
		  </template>
		</SearchInput>
		<el-table
		:data="preroom"
		v-loading="loading" 
		border stripe style="width: 65vw"
		>
		  <el-table-column
		  label="ID" width="50" align="center" prop="id">
		  </el-table-column>
		  <el-table-column
		  label="预订号" width="150" prop="ordernum">
		  </el-table-column>
		  <el-table-column 
		  label="姓名" width="100" align="center" prop="name">
		  </el-table-column>
		  <el-table-column
		  label="联系电话" width="150" prop="phone">
		  </el-table-column>
		  <el-table-column 
		  label="房间类型" width="150" prop="type">
		  </el-table-column>
		  <el-table-column 
		  label="房间数量" width="80" prop="roomnum">
		  </el-table-column>	
		  <!-- <el-table-column label="介绍" prop="content"></el-table-column> -->
		  <el-table-column label="操作" align="center">
		    <template slot-scope="scope">
		      <el-button
		        size="mini"
		        icon="el-icon-view"
		        type="text"
		        circle
		        @click="handleDetail(scope.row)"
		      >
			  查看</el-button>
		    </template>
		  </el-table-column>
		</el-table>
	</div>
</template>

<script>
	import axios from 'axios'
	import SearchInput from "@/components/SearchInput"
	export default {
	  name: "PreroomData",
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
	    	 preroom(){
	    	      if(this.data.preroom){
	    	        return this.data.preroom
	    	      }else{
	    	        return []
	    	      }
	    	    },
	  },
	  async created() {
	    let res=await axios.get('/api/preroom/data').then(res=>{
	          // console.log(res.data[0])
	          this.data=res.data
			    })
	  },
	  methods: {
		 onSearch(val) {
		       this.axios.get('/api/preroom/search',{params:{value: val}}).then(res=>{
		       this.data=res.data
		     })
		     },
		 
		 handleDetail(row) {
		   this.$router.push({
		     name: "preroom-all",
		     params: {
		       id: row.id,
		     },
		   });
		 },
		},
	}
</script>

<style>
</style>
