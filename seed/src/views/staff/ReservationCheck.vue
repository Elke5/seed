<template>
	<div>
		<SearchInput @onSearch="onSearch">
		 <template v-slot:text>
		    <span>搜索</span>
		  </template>
		</SearchInput>
		<el-table
		:data="reservation"
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
		  label="手机号码" width="150" prop="phone">
		  </el-table-column>
		  <el-table-column 
		  label="餐厅类型" width="150" prop="type">
		  </el-table-column>
		  <el-table-column 
		  label="就餐人数" width="80" prop="seatnum">
		  </el-table-column>	
		  <!-- <el-table-column 
		  label="备注" prop="other">
		  </el-table-column> -->
		  <el-table-column label="操作" align="center">
		    <template slot-scope="scope">
		      <el-button
		        size="mini"
		        icon="el-icon-view"
		        type="text"
		        circle
		        @click="handleDetail(scope.row)"
		      >查看</el-button>
		    </template>
		  </el-table-column>
		</el-table>
	</div>
</template>

<script>
	import axios from 'axios'
	import SearchInput from "@/components/SearchInput"
	export default {
	  name: "ReservationData",
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
	    	 reservation(){
	    	      if(this.data.reservation){
	    	        return this.data.reservation
	    	      }else{
	    	        return []
	    	      }
	    	    },
	  },
	  async created() {
	    let res=await axios.get('/api/reservation/data').then(res=>{
	          // console.log(res.data[0])
	          this.data=res.data
			    })
	  },
	  methods: {
		     onSearch(val) {
		           this.axios.get('/api/reservation/search',{params:{value: val}}).then(res=>{
		           this.data=res.data
		         })
		         },
	  		 handleDetail(row) {
	  		   this.$router.push({
	  		     name: "reservation-all",
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
