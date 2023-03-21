<template>
	<div>
		<el-page-header @back="back" content="修改订房信息" style="font-weight: bolder;line-height: 70px;">
		</el-page-header>
		 <el-form
		   ref="roomform"
		   label-width="100px"
		 >
		   <el-form-item label="ID" prop="id">
		     <el-input v-model="id" readonly></el-input>
		   </el-form-item>
		   <el-form-item label="姓名" prop="name">
		     <el-input v-model="name"></el-input>
		   </el-form-item>
		   <el-form-item label="联系电话" prop="phone">
		     <el-input v-model="phone"></el-input>
		   </el-form-item>
		   <el-form-item label="房间类型" prop="type">
		       <el-select v-model="type" placeholder="请选择餐厅类型">
		         <el-option label="高级大床房(无窗）" value="高级大床房(无窗）"></el-option>
		         <el-option label="高级大床房(有窗）" value="高级大床房(有窗）"></el-option>
		   		<el-option label="高级双床房(无窗)" value="高级双床房(无窗)"></el-option>
		   			<el-option label="高级双床房(有窗)" value="高级双床房(有窗)"></el-option>
		   			<el-option label="无障碍客房" value="无障碍客房"></el-option>
		   			<el-option label="豪华大床房" value="豪华大床房"></el-option>
		   			<el-option label="豪华双床房" value="豪华双床房"></el-option>
		   			<el-option label="商务套房" value="商务套房"></el-option>
		   			<el-option label="行政套房" value="行政套房"></el-option>
		   			<el-option label="总统套房" value="总统套房"></el-option>
		       </el-select>
		     </el-form-item>
		   <el-form-item label="早餐" prop="breakfast">
		   		  <el-select v-model="breakfast" placeholder="请选择">
		   		   <el-option label="是" value="是"></el-option>
		   		   <el-option label="否" value="否"></el-option>
		   		  </el-select>
		   		  </el-form-item>
		   <el-form-item label="房间数量" prop="roomnum">
		      <el-input-number v-model="roomnum" :min="1" :max="10" label="描述文字"></el-input-number>
		   </el-form-item>
		   <el-form-item label="入住时间" prop="intime">
		      <el-date-picker
		        v-model="intime"
		   		value-format="yyyy-MM-dd" 
		        type="daterange"
		   		:picker-options="pickerOptions"
		        range-separator="至"
		        start-placeholder="开始日期"
		        end-placeholder="结束日期"
		   		@change="dateFormat()">
		   	  </el-date-picker>
		   </el-form-item>
		   <el-form-item label="预计到店时间" prop="arrtime">
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
	  name: "PreroomUpdate",
	  data() {
	    return {
			id: "",
		    name: "",
		    phone: "",
		    type: "",
		    breakfast: "",
		    roomnum: 1,
			intime:"",
		    arrtime: "",
		    other: "",
			pickdata: {
					  startTime:"",
					  endTime:"",
			},
			pickerOptions: {
			               disabledDate: time => {
			                   return (
			                       time < new Date()
			                   )
			               }
			           },
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
	  let res=await axios.get('/api/preroom/update',{params:{id: this.$route.params.id}}).then(res => {
       this.data = res.data
	   this.id = this.$route.params.id
	   this.name = this.data[0].name
	   this.phone = this.data[0].phone
	   this.type = res.data[0].type
	   this.breakfast = this.data[0].breakfast
	   this.roomnum = res.data[0].roomnum
	   this.intime = res.data[0].intime
	   this.arrtime = res.data[0].arrtime
	   this.other = res.data[0].other
	   }).catch(() => {
	    this.$message.error("网络错误，请刷新重试！");
	  })
	},
	    methods: {
			dateFormat() {
			    this.pickdata.startTime = this.intime[0]
			    this.pickdata.endTime = this.intime[1]
				// console.log(this.pickdata.startTime)
			},
			submitForm() {
			  let data = {
			          id :this.id,
					  name :this.name,
					  phone :this.phone,
			          type: this.type,
					  breakfast :this.breakfast,
			          roomnum: this.roomnum,
					  intime:this.intime[0] + "至" + this.intime[1],
			          arrtime: this.arrtime,
			          other: this.other,
			        }
			        this.axios.get('/api/preroom/updatelist', {
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
	                        name: "preroom-detail",
	                        params: {
	                        id: this.id,
	                        },
	                      });
			            });
			            }
			          
			        })
			      },
			
			back(){
				this.$router.push('/index/preroomdata')
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
