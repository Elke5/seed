<template>
	<div class="show">
		<el-row>
		  <el-col :span="8" v-for="(canteenlist, index) in canteen" :offset="2">
		    <el-card :body-style="{ padding: '0px' }" class="card">
		      <img :src="img[index]" class="image">
		      <div style="padding: 14px;">
			   <div>
		        <span class="type">{{canteenlist.type}}</span><br />
				<el-button 
				type="success" round 
				class="button" 
				@click="login();dialogVisible_click1(canteenlist.id,canteenlist.type)">订位</el-button>
				<el-dialog
				title="订位" 
				:visible.sync="dialogFormVisible">
				   <el-form 
				   :model="reservation"
				   :rules="rules"
				   ref="preruleForm"
				   label-width="110px">
				   <el-form-item label="餐厅类型" prop="type">
				     <el-input v-model="type" readonly></el-input>
				   </el-form-item>
				     <el-form-item label="姓名" prop="name">
				       <el-input v-model="reservation.name"></el-input>
				     </el-form-item>
					 <el-form-item label="联系电话" prop="phone">
					   <el-input v-model="reservation.phone"></el-input>
					 </el-form-item>
				     <el-form-item label="就餐人数" prop="seatnum">
				      <el-input-number v-model="reservation.seatnum" :min="1" :max="20"></el-input-number>
				     </el-form-item>
				     <el-form-item label="预计就餐时间" prop="arrtime">
						 <el-time-picker
						   v-model="reservation.arrtime"
						   value-format="HH:mm" 
						   :picker-options="{
						    selectableRange: '09:00:00 - 20:30:00'
						   }"
						   placeholder="选择时间">
						 </el-time-picker>
				     </el-form-item>
				     <el-form-item label="备注" prop="other">
				      <el-input v-model="reservation.other"></el-input>
				     </el-form-item>
				     <el-form-item>
				       <el-button type="primary" @click="add">提交预定</el-button>
				       <el-button @click="resetForm">重置</el-button>
				     </el-form-item>
				   </el-form>
				 </el-dialog>
			   </div>
				<el-tooltip 
				class="item" 
				popper-class='my-tooltip' 
				:enterable="false" 
				effect="light" 
				:content="canteenlist.content" 
				placement="top">
				<div slot="content" style="width: 330px; height: 100px;">{{canteenlist.content}}</div>
				<p class="content">{{canteenlist.content}}</p>
				</el-tooltip>
		        <!-- <div class="bottom clearfix">
		        </div> -->
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		inject: ['reload'],
	    data() {
             var checknum = function (rule, val, callback) {
                if (!val) {
                    return callback(new Error("请输入就餐人数"));
                }
                if(parseFloat(val) < 5){
                    return callback(new Error("订位就餐人数需大于5人"));
                }
                return callback();
            };
	      return {
			  dialogFormVisible: false,
			  type:"",
			  account:"",
			  ordernum:"",
			  pretime:"",
			  data:{},
                img:[
				  require('@/assets/canteen/zct.jpg'),
				  require('@/assets/canteen/xct.jpg'),
				  require('@/assets/canteen/zzct.jpg'),
				  require('@/assets/canteen/dtjb.jpg'),
				  require('@/assets/canteen/yht.jpg'),
				  ],
			  reservation:{
				  name: "",
				  phone: "",
				  seatnum:5,
				  arrtime:"",
				  other:"",
			  },
			  rules: {
			  		name: [
			  		  {required: true, message: "请输入姓名", trigger: "blur"},
			  		],
			  		phone: [
			  		  {required: true, message: "请输入联系电话", trigger: "blur"},
			  		],
			        seatnum: [
			          {required: true, validator: checknum, trigger: "change" },
			        ],
			  		arrtime: [
			  		  {required: true, message: "请选择就餐时间", trigger: "change" },
			  		],
			  		other: [
			  		  {required: false},
			  		],
			  },
	      };
	    },
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
		  this.ordernum = 'c' + this.$ordernum.getOrderNum() + Math.floor(Math.random() * 10);
		  this.pretime = this.$gettime.getTime();
		},
		methods: {
			dialogVisible_click1(index,type) {
				this.type = type
				if(index == 1 || index == 2 || index ==3){
				this.dialogFormVisible = true
			}else if(index == 4 || index == 5){
				this.dialogFormVisible = false
				this.$alert('暂不支持订位',{
				})
			}else{}
		},
		add(){
					  // const type = ;
					  // const breakfast = this.room.breakfast;
						(this.$refs.preruleForm)[0].validate((valid) => {
						  if (valid) {
							 var storage = window.sessionStorage;
							 var json = storage.getItem('account');
							 this.account = JSON.parse(json)
							 console.log(this.account);
		                this.axios.get('/api/reservation/add',{
							params: {
								ordernum:this.ordernum,
								account:this.account,
								name:this.reservation.name,
								phone:this.reservation.phone,
								type:this.type,
								seatnum:this.reservation.seatnum,
								arrtime:this.reservation.arrtime,
								pretime:this.pretime,
								other:this.reservation.other
								}}).then(res=>{
		     var code = res.data.statusCode
		     var msg = res.data.msg
		     if( code == 200) {
							 this.$alert('已预订',{
							      dangerouslyUseHTMLString: true
							 }).then(() => {
							   this.reload()
							 });
		        // this.$router.push('/index/roomdata')
		      }else {
		        this.$alert({
		        message: msg,
		      }).then(() => {
		      // on close
		      });
		      }
						})
						}
						})
		    },
		resetForm() {
		  (this.$refs.preruleForm)[0].resetFields();
		},
		login() {
					  if(localStorage.s === "true")
					      {
						    this.dialogFormVisible = true
					        // this.$router.push('/userzc')
					        console.log(localStorage['s'])
					      }
					  else {
						this.dialogFormVisible = false
					  	//如果登录状态是false，那么跳转至登录页面,需要登录才能进入主页面
					    this.$message.error('请先登录');
					    this.$router.push('/login')
					    console.log("需要登录")
					    
					  }
		},
		}
	  };
</script>

<style scoped lang="less">
	.show {
		margin-top: 50px;
		margin-left: 1vw;
	}
	.card {
		width:28vw;
		height:380px;
		margin-bottom: 20px;
	}
	.image {
		width:100%;
		height:230px;
		display: block;
	}
	.type {
		font-family: "PingFang SC";
		font-weight: bold;
		line-height: 30px;
		font-size: 20px;
	}
	.button {
		float: right;
		margin-top: -32px;
		margin-right: 6px;
	}
	p{
	   transform: translateY(1em);
	   display: block;
	   overflow: hidden;
	   white-space: nowrap;
	   text-overflow: ellipsis;
	   width: 95%;
	}
	// .bottom {
	// 	margin-top: 8px;
	// 	line-height: 12px;
	// 	}
	// .clearfix:before,
	// .clearfix:after {
	//     display: table;
	//     content: "";
	// }
	// .clearfix:after {
	//     clear: both
	// }
</style>
