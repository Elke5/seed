<template>
	<div>
		<el-page-header @back="back" content="修改订位信息" style="font-weight: bolder;line-height: 70px;">
		</el-page-header>
		 <el-form
		   ref="reservationform"
		   label-width="100px"
		 >
		   <el-form-item label="ID" prop="id">
		     <el-input v-model="id" readonly></el-input>
		   </el-form-item>
		   <el-form-item label="姓名" prop="name">
		     <el-input v-model="name"></el-input>
		   </el-form-item>
		   <el-form-item label="手机号码" prop="phone">
		     <el-input v-model="phone"></el-input>
		   </el-form-item>
		   <el-form-item label="餐厅类型" prop="type">
		       <el-select v-model="type" placeholder="请选择餐厅类型">
		         <el-option label="中餐厅" value="中餐厅"></el-option>
		         <el-option label="西餐厅" value="西餐厅"></el-option>
		   		<el-option label="自助餐厅" value="自助餐厅"></el-option>
		       </el-select>
		   </el-form-item>
		   <el-form-item label="就餐人数" prop="seatnum">
		    <el-input-number v-model="seatnum" :min="1" :max="20"></el-input-number>
			<span class="five">需大于等于五人</span>
		   </el-form-item>
		   <el-form-item label="就餐时间" prop="arrtime">
		     <el-time-picker
		       v-model="arrtime"
			   value-format="HH:mm" 
		       :picker-options="{
		        selectableRange: '09:00:00 - 20:30:00'
		       }"
		       placeholder="选择时间">
		     </el-time-picker>
		   </el-form-item>
		   <el-form-item label="备注" prop="other">
		     <el-input v-model="other"></el-input>
		   </el-form-item>
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
	  name: "ReservatoinUpdate",
	  data() {
	    return {
			id: "",
			name: "",
			phone: "",
		    type: "",
			seatnum: "",
			arrtime: "",
			other: "",
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
	  let res=await axios.get('/api/reservation/update',{params:{id: this.$route.params.id}}).then(res => {
       this.data = res.data
	   this.id = this.$route.params.id
	   this.name = res.data[0].name
	   this.phone = res.data[0].phone
	   this.type = res.data[0].type
	   this.seatnum = res.data[0].seatnum
	   this.arrtime = res.data[0].arrtime
	   this.other = res.data[0].other
	   }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
	    methods: {
			submitForm() {
			  let data = {
			          id :this.id,
					  name :this.name,
					  phone :this.phone,
			          type: this.type,
					  seatnum :this.seatnum,
					  arrtime :this.arrtime,
			          other: this.other,
			        }
			        this.axios.get('/api/reservation/updatelist', {
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
	                        name: "reservation-detail",
	                        params: {
	                        id: this.id,
	                        },
	                      });
			            });
			            }
			          
			        })
			      },
			
			back(){
				this.$router.push('/index/reservationdata')
			},
		},
		
		
	    
	}
</script>

<style scoped>
	.el-form {
		margin-left: 70px;
	}
	::v-deep .el-form-item {width: 60%;}
	.five {
		margin-left: 6px;
		font-size: 10px;
		color: red;
	}
</style>
