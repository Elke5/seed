<template>
	<div>
		<el-page-header @back="back" content="修改客房信息" style="font-weight: bolder;line-height: 70px;">
		</el-page-header>
		 <el-form
		   ref="roomform"
		   label-width="100px"
		 >
		   <el-form-item label="ID" prop="id">
		     <el-input v-model="id" readonly></el-input>
		   </el-form-item>
		   <el-form-item label="客房类型" prop="type">
		     <el-input v-model="type"></el-input>
		   </el-form-item>
		   <el-form-item label="数量" prop="number">
		     <el-input v-model="number"></el-input>
		   </el-form-item>
		   <el-form-item label="价格" prop="price">
		     <el-input v-model="price"></el-input>
		   </el-form-item>
		   <el-form-item label="介绍" prop="content">
		     <el-input v-model="content"></el-input>
		   </el-form-item>
		  <!-- <el-form-item label="浏览次数" prop="view_count">
		     <el-input v-model="student.view_count" readonly></el-input>
		   </el-form-item> -->
		   <el-form-item>
		     <el-button type="primary" @click="submitForm">立即修改</el-button>
		   </el-form-item>
		 </el-form>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
	  inject: ['reload'],
	  name: "RoomUpdate",
	  data() {
	    return {
			id: "",
		    type: "",
		    number: "",
		    price: "",
			content: "",
	    };
	  },
	  // 计算属性选项
	  // computed: {
	  //   	client(){
	  //   	     if(this.data.client){
	  //   	       return this.data.client
	  //   	     }else{
	  //   	       return []
	  //   	     }
	  //   	   },
	  // },
	  
	 async created() {      
		  // let ids  = sessionStorage.getItem('data')
		  // this.$route.params.id = JSON.parse(ids)
	  // 获取当前页面路由参数id
	  const { id } = this.$route.params.id
		console.log('created:',this.$route.params)
	  let res=await axios.get('/api/room/update',{params:{id: this.$route.params.id}}).then(res => {
       this.data = res.data
	   this.id = this.$route.params.id
	   this.type = res.data[0].type
	   this.number = res.data[0].number
	   this.price = res.data[0].price
	   this.content = res.data[0].content
	   }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
	    methods: {
			submitForm() {
			  let data = {
			          id :this.id,
			          type: this.type,
			          number: this.number,
			          price: this.price,
			          content: this.content,
			        }
			        this.axios.get('/api/room/updatelist', {
			          params: data
			        }).then((res) => {
			           var code = res.data.statusCode
			           var msg = res.data.msg
			           if( code == 200) {
			               console.log(res.data)
			               this.$alert(msg,{
			                 dangerouslyUseHTMLString: true
			            }).then(() => {
			                this.reload()
			            });
			            
			            }else {
			              
			              this.$alert( msg,{
			                dangerouslyUseHTMLString: true 
			            }).then(() => {
			            confirm:this.$router.push({
	                        name: "room-detail",
	                        params: {
	                        id: this.id,
	                        },
	                      });
			            });
			            }
			          
			        })
			      },
			
			back(){
				this.$router.push('/index/roomdata')
			},
		},
		
		
	    
	}
</script>

<style scoped>
	.el-form {
		margin-left: 70px;
	}
	::v-deep .el-form-item {width: 60%;}
</style>
