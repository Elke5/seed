<template>
	<div class="demo-image__placeholder">
	 <div class="show">
		 <el-row v-for="(roomlist, index) in room" class="block">
		   <el-col :span="12">
		       <img :src="img[index]" class="img">
		       <div style="padding: 12px;">
		         <span class="type">{{roomlist.type}}</span>
		         <div class="bottom clearfix">
		           <span>{{roomlist.area}}</span>
				   <el-divider direction="vertical"></el-divider>
				   <span>{{bed[index]}}</span>
				   <el-divider direction="vertical"></el-divider>
				   <span>{{show}}</span>
				   <el-divider direction="vertical"></el-divider>
				   <el-link type="primary" 
 				   @click="dialogViewVisible_click(img[index],roomlist.type,roomlist.area,bed[index],roomlist.content)">
						 查看客房信息
				   </el-link>
				   
				   <el-dialog 
				      :visible.sync="dialogViewVisible"  
					  title="客房基本信息"
					  >
					  <el-row>
					    <el-col :span="8">
					      <el-image 
					         style="width: 200px; height: 150px"
					         :src="image" 
					         :preview-src-list="[image]">
					      </el-image>
					      <div>
					        <h2>{{type}}</h2>
					        <span><b>面积：</b>{{area}}</span><br /><br />
					        <span><b>规格：</b>{{bednum}}</span><br /><br />
							<span class="red">(如需加床，请提前告知)</span>
					      </div>
						</el-col>
						<el-col :span="1">
						    <el-divider direction="vertical" class="middle0"></el-divider>
						</el-col>
						<el-col :span="12">
							<span class="content"><b>客房介绍：</b>{{content}}</span><br /><br />
							<h3>基本设施</h3>
							<ul>
								<li>牙刷</li>
								<li>牙膏</li>
								<li>肥皂</li>
								<li>洗发水</li>
								<li>润发露</li>
								<li>护发素</li>
								<li>浴帽</li>
								<li>梳子</li>
								<li>文具（笔，纸）</li>
							</ul>
							<div style="float: left;" class="red">
								<i class="el-icon-star-on"></i>
								<span>如需其他用品，请提前告知</span>
							</div>
						</el-col>
					  </el-row>
				   </el-dialog>
		         </div>
		       </div>
		   </el-col>
		   <el-col :span="1">
		   <el-divider direction="vertical" class="middle"></el-divider>
		   </el-col>
		   <el-col :span="11">
			   <div class="showright">
			   <div v-if="[1,2,3,4,5].includes(roomlist.id)">
				   <span class="zero">{{zero}}</span>
				   <el-button type="success" round @click="login();dialogVisible_click1(roomlist.type,zero)">预订</el-button>
				   <span class="price">￥{{roomlist.price}}</span>
			   </div>
			   <div v-if="[2,4,5].includes(roomlist.id)">
				   <el-divider></el-divider>
			   </div>
			   <div v-if="[2,4,5,6,7,8,9,10].includes(roomlist.id)" style="margin-top: 0px;">
				   <span class="two">{{two}}</span>
				   <el-button type="success" round @click="login();dialogVisible_click2(roomlist.type,two)">预订</el-button>
				   <span class="price" v-if="[2,4,5].includes(roomlist.id)">￥{{roomlist.price+150}}</span>
				   <span class="price" v-else>{{roomlist.price}}</span>
			   </div>
			  </div> 
		   </el-col>
        <el-dialog 
		title="预订客房" 
		:visible.sync="dialogFormVisible">
		   <el-form 
		   :model="preroom"
		   :rules="rules"
		   ref="ruleForm"
		   label-width="110px">
		   <el-form-item label="房型" prop="type">
		     <el-input v-model="type" readonly></el-input>
		   </el-form-item>
		   <el-form-item label="早餐" prop="type">
		     <el-input v-model="breakfast" readonly></el-input>
		   </el-form-item>
		     <el-form-item label="姓名" prop="name">
		       <el-input v-model="preroom.name"></el-input>
		     </el-form-item>
			 <el-form-item label="联系电话" prop="phone">
			   <el-input v-model="preroom.phone"></el-input>
			 </el-form-item>
		     <el-form-item label="房间数量" prop="roomnum">
		      <el-input-number v-model="preroom.roomnum" :min="1" :max="10" label="描述文字"></el-input-number>
		     </el-form-item>
			  <el-form-item label="入住时间" prop="intime">
			     <el-date-picker
			       v-model="preroom.intime"
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
		        v-model="preroom.arrtime"
		        value-format="HH:mm" 
		        :picker-options="{
		         selectableRange: '09:00:00 - 20:30:00'
		        }"
		        placeholder="选择时间">
		      </el-time-picker>
		     </el-form-item>
		     <el-form-item label="备注" prop="other">
		      <el-input v-model="preroom.other"></el-input>
		     </el-form-item>
		     <el-form-item>
		       <el-button type="primary" @click="add()">提交预定</el-button>
		       <el-button @click="resetForm">重置</el-button>
		     </el-form-item>
		   </el-form>
		 </el-dialog>
		 </el-row>
	  </div>
	 <!-- <div class="right">
	  <div v-for="roomlist in room" class="block">
	  	  <el-image :src="roomimg.img"></el-image>
	      <span class="type">{{room.type}}</span>
		  <span class="price">{{room.price}}</span>
	  	  <el-button type="success" round>预订</el-button>
	  </div>
	 </div> -->
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		inject: ['reload'],
	  data() {
	    return {
		  show:"禁烟",
		  zero:"无早餐",
		  two: "2份早餐",
		  dialogViewVisible: false,
		  dialogFormVisible: false,
		  type:"",
		  image:"",
		  area:"",
		  bednum:"",
		  content:"",
		  breakfast: "",
		  account:"",
		  id:"",
		  ordernum:"",
		  pretime: "",
		  data:{},
		  // data1:{},
			  img:[
				  require('@/assets/room/gjdcf1.jpg'),
				  require('@/assets/room/gjdcf2.jpg'),
				  require('@/assets/room/gjscf1.jpg'),
				  require('@/assets/room/gjscf2.jpg'),
				  require('@/assets/room/wzakf.jpg'),
				  require('@/assets/room/hhdcf.jpg'),
				  require('@/assets/room/hhscf.jpg'),
				  require('@/assets/room/swtf.jpg'),
				  require('@/assets/room/xztf.jpg'),
				  require('@/assets/room/zttf.jpg'),
				  ],
			  bed:[
				  "1张1.8米大床",
				  "1张1.8米大床",
				  "2张1.2米单人床",
				  "2张1.2米单人床",
				  "1张1.8米大床",
				  "1张1.8米大床",
				  "1张1.8米大床",
				  "1张1.8米大床",
				  "1张1.8米大床",
				  "可联系安排"
			  ],
    preroom: {
		name: "",
		phone: "",
        roomnum: 1,
		intime:"",
		arrtime: "",
		other: ""
      },
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
      rules: {
		name: [
		  {required: true, message: "请输入姓名", trigger: "blur"},
		],
		phone: [
		  {required: true, message: "请输入联系电话", trigger: "blur"},
		],
        roomnum: [
          {required: true},
        ],
		intime: [
		  {required: true, message: "请选择入住时间", trigger: "change" },
		],
		arrtime: [
		  {required: true, message: "请选择到店时间", trigger: "change" },
		],
		other: [
		  {required: false},
		],
      },
	    };
	  },
	  computed: {
	    	 room(){
	    	      if(this.data.room){
	    	        return this.data.room
	    	      }else{
	    	        return []
	    	      }
	    	    },
	  },
	    async created() {
	      let res=await axios.get('/api/room/data').then(res=>{
	            // console.log(res.data[0])
	            this.data=res.data
	    			    });			
		  this.ordernum = '0' + this.$ordernum.getOrderNum() + Math.floor(Math.random() * 1000);
		  this.pretime = this.$gettime.getTime();
	    },
		methods: {
			 dialogVisible_click1(type,zero) {
				   zero = "否";
			       this.dialogFormVisible = true
			       this.type = type;
			       this.breakfast = zero;
			    },
				dialogVisible_click2(type,two) {
					two = "是";
					if(type=="总统套房" && sessionStorage.s === "true"){
						this.dialogFormVisible = false
						this.$alert('暂不支持线上预定，请拨打前台服务电话进行预订',{
						})
					}else{
				    this.dialogFormVisible = true
				    this.type = type; 
				    this.breakfast = two;
					}
				   },
				dateFormat() {
				    this.pickdata.startTime = this.preroom.intime[0]
				    this.pickdata.endTime = this.preroom.intime[1]
					// console.log(this.pickdata.startTime)
			    },
				dialogViewVisible_click(img,type,area,bed,content) {
				       this.dialogViewVisible = true
				       this.image = img;
				       this.type = type; 
					   this.area = area;
					   this.bednum = bed;
					   this.content = content;
				    },
		  add(){
			  // const type = ;
			  // const breakfast = this.room.breakfast;
				(this.$refs.ruleForm)[0].validate((valid) => {
				  if (valid) {
					  var storage = window.sessionStorage;
					  var json = storage.getItem('account');
					  this.account = JSON.parse(json)
					  console.log(this.account);
		      this.axios.get('/api/preroom/add',{
					params: {
						ordernum:this.ordernum,
						account:this.account,
						name:this.preroom.name,
						phone:this.preroom.phone,
						type:this.type,
						breakfast:this.breakfast,
						roomnum:this.preroom.roomnum,
						intime:this.preroom.intime[0] + "至" + this.preroom.intime[1],
						arrtime:this.preroom.arrtime,
						pretime:this.pretime,
						other:this.preroom.other
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
			 //  }else {
		  //       console.log("error submit!!");
		  //       return false;
				  }
		  })
		      },
		  resetForm() {
		     (this.$refs.ruleForm)[0].resetFields();
		  },
		  login() {
		  			  if(sessionStorage.s === "true")
		  			      {
							this.dialogFormVisible = true
		  			        // this.$router.push('/userzc')
		  			        console.log(sessionStorage['s'])
		  			      }
		  			  else {
						  this.dialogFormVisible = false
		  			  	//如果登录状态是false，那么跳转至登录页面,需要登录才能进入主页面
		  			    this.$message.error('请先登录');
		  			    this.$router.push('/login')
		  			    console.log("需要登录")
		  			    
		  			  }
		  },
		  // getOrderNum () {
		  //       const Time = new Date() // 当前中国标准时间
		  //       const Year = Time.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
		  //       const Month = Time.getMonth() + 1 // 获取中国区月份
		  //       const Day = Time.getDate() // 获取几号
		  //       var CurrentDate = Year
		  //       if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
		  //         CurrentDate += Month
		  //       } else {
		  //         CurrentDate += '0' + Month
		  //       }
		  //       if (Day >= 10) {
		  //         CurrentDate += Day
		  //       } else {
		  //         CurrentDate += '0' + Day
		  //       }
		  //       return CurrentDate
				// },
		  },
	};
</script>

<style scoped lang="less">
	.demo-image__placeholder {
		margin-top: 50px;
	}
	.show {
		float: left;
		width:66vw;
		height: 100%;
		margin-left: 3vw;
	}
	// .right {
	// width: 45%;
	// height: 100%;
	// margin-right: 3vw;
	// position: relative;
	// float: right;
	// }
	.block {
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		border: 2px;
		width: 100%;
		height: 260px;
		margin-bottom: 20px;
	}
	.img {
		width:20vw;
		height:180px;
		display: block;
	}
	.type {
		font-family: "PingFang SC";
	}
	.price {
		float: right;
		color: crimson;
		margin-right: 7px;
		}
	.bottom {
		margin-top: 8px;
		line-height: 12px;
		}
	.type,.price {
		font-weight: bold;
		line-height: 30px;
		font-size: 20px;
	}
	.middle {
		height: 250px;
	}
	.showright {
		margin-top: 100px;
		margin-right: 15px;
		 }
	.two {
		color: royalblue;
	}
	.el-button {
		float: right;
	}
	.clearfix:before,
	.clearfix:after {
	    display: table;
	    content: "";
	}
	.clearfix:after {
	    clear: both
	}
	.small {
		width: 200px;
		height: 150px;
	}
	.middle0 {
		height: 330px;
	}
	.content {
		line-height: 20px;
	}
	.red {
		color: firebrick;
	}
	ul {
		margin-top: 30px;
		width:125%
		}
	li {
		margin-bottom: 20px;
		float: left;
		width:50%
		}
</style>
