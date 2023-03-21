<template>
	<div>
		<div class="top">
		<el-page-header @back="goBack" content="我的预订">
		</el-page-header>
		</div>
		<div class="main">
		  <el-card class="box-card">
			<el-row>
				<el-col :span="10" class="model">
				  <h1>房间预订</h1>
				   <div v-if="preroom == undefined || preroom == null || preroom.length <= 0">
					   <span class="rcenter">暂无预订</span>
				   </div>
				    <div v-for="(preroomlist,index) in preroom">  
			           <el-card class="box-card" shadow="hover">
					        <span>预订号：{{preroomlist.ordernum}}</span><br />
							<span class="blue1">预订时间：{{preroomlist.pretime}}</span>
							<el-divider class="word"><span style="color: royalblue;">30分钟免费取消</span></el-divider>
							<h3>{{preroomlist.type}}</h3>
						    <span>{{preroomlist.area}}</span>
							<el-divider direction="vertical"></el-divider>
							<span>{{bed[index]}}</span>
							<el-divider direction="vertical"></el-divider>
							<span>早餐：{{preroomlist.breakfast}}</span>
						  <el-divider>
							<span class="blue1">{{preroomlist.intime}}({{$intervaltime.getDiffDay(preroomlist.intime)}}晚)</span><br />
						  </el-divider>
						  <div class="blue2">
							<span><b>房间数量：</b>{{preroomlist.roomnum}}</span><br />
							<span><b>到店时间：</b>{{preroomlist.arrtime}}</span><br />
							<span><b>预订备注：</b>{{ preroomlist.other | fruitFilter }}</span>
						  </div>
						  <el-button type="warning" plain class="cancel" @click="outerVisible;Pcancel(preroomlist.pretime,preroomlist.id)">取消预订</el-button>
						   <el-dialog title="" :visible.sync="outerVisible">
						      <el-dialog
						        width="30%"
						        title="请支付"
						        :visible.sync="innerVisible"
						        append-to-body>
								<img :src="pay" />
								<div slot="footer" class="dialog-footer">
								  <el-button @click="innerVisible = false">取 消</el-button>
								  <el-button type="primary" @click="innerVisible = false;outerVisible = false;Pdel(preroomlist.id)">已支付</el-button>
								</div>
						      </el-dialog>
							  <span>已超过30分钟，需支付20元，是否取消预订</span>
						      <div slot="footer" class="dialog-footer">
						        <el-button @click="outerVisible = false">取 消</el-button>
						        <el-button type="primary" @click="innerVisible = true">确定</el-button>
						      </div>
						    </el-dialog>
			           </el-card>
				    </div>
			    </el-col>
				
				<el-col :span="10" class="model">
					<h1>餐位预订</h1>
					  <div v-if="reservation == undefined || reservation == null || reservation.length <= 0">
					      <span class="rcenter">暂无预订</span>
					  </div>
					<div v-for="(reservationlist,index) in reservation">
					   <el-card class="box-card" shadow="hover">
					        <span>预订号：{{reservationlist.ordernum}}</span><br />
							<span class="blue1">预订时间：{{reservationlist.pretime}}</span>
							<el-divider class="word"><span style="color: royalblue;">30分钟免费取消</span></el-divider>
							<h3>{{reservationlist.type}}</h3>
							<el-divider></el-divider>
						  <div class="blue2">
							<span><b>就餐人数：</b>{{reservationlist.seatnum}}</span><br />
							<span><b>就餐时间：</b>{{reservationlist.arrtime}}</span><br />
							<span><b>预订备注：</b>{{ reservationlist.other | fruitFilter }}</span>
						  </div>
						  <el-button type="warning" plain class="cancel" @click="outerVisible;Rcancel(reservationlist.pretime,reservationlist.id)">取消预订</el-button>
						   <el-dialog title="" :visible.sync="outerVisible">
						      <el-dialog
						        width="30%"
						        title="请支付"
						        :visible.sync="innerVisible"
						        append-to-body>
								<img :src="pay" />
								<div slot="footer" class="dialog-footer">
								  <el-button @click="innerVisible = false">取 消</el-button>
								  <el-button type="primary" @click="innerVisible = false;outerVisible = false;Rdel(reservationlist.id)">已支付</el-button>
								</div>
						      </el-dialog>
							  <span>已超过30分钟，需支付20元，是否取消预订</span>
						      <div slot="footer" class="dialog-footer">
						        <el-button @click="outerVisible = false">取 消</el-button>
						        <el-button type="primary" @click="innerVisible = true">确定</el-button>
						      </div>
						    </el-dialog>
					   </el-card>
					</div>
				</el-col>
			</el-row>
		  </el-card>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data(){
			return{
				data:{},
				data1:{},
				account: "",
				intervaltime:false,
				outerVisible:false,
				innerVisible:"",
				pay:require('@/assets/pay.jpg'),
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
			}
		},
		filters: {
		    fruitFilter(value) {
				if(value=='' || value == null){
					return "无"
				}else{
					return value
				}
		    }
		  },
		computed: {
		  	 preroom(){
		  	      if(this.data.preroom){
		  	        return this.data.preroom
		  	      }else{
		  	        return []
		  	      }
		  	    },
			 reservation(){
				 if(this.data1.reservation){
				   return this.data1.reservation
				 }else{
				   return []
				 }
			 }
			  
		},
		async created() {
			//获取登录账号
			var storage = window.sessionStorage;
			var json = storage.getItem('account');
			this.account = JSON.parse(json)
			
		  let res=await axios.get('/api/preroom/order',{
		  params: {
		  	account:this.account,
		  	}}).then(res=>{
		        this.data=res.data
					    });
		  let res1=await axios.get('/api/reservation/order',{
		  params: {
		  	account:this.account,
		  	}}).then(res=>{
		        this.data1=res.data
		  					    });
		  },
	    methods: {
	       goBack() {
			 this.$router.go(-1)
	    },
           Pcancel(pretime,id) {
			   // console.log(id)
			   var curdate = new Date()
			   var preTime = new Date(pretime);
			   // console.log(preTime)
			   var AddpreTime = preTime.setMinutes(preTime.getMinutes() + 30)
			   var AddPreTime = new Date(AddpreTime)
			   if(curdate.getTime() <= AddPreTime.getTime()){
				   this.outerVisible = false
				   // this.$alert('已超过30分钟')
				    this.$confirm('是否取消预订', '', {
				             confirmButtonText: '确定',
				             cancelButtonText: '取消',
				             type: 'warning'
				           }).then(() => {
							   this.axios.get('/api/preroom/del',{
								   params:{
									   id: id,
								   }}).then(() => {
									   this.$message({
									     type: 'success',
									     message: '取消成功!'
								   })
				             });
				           }).catch(() => {
				           });
			   }else{
				   this.outerVisible = true
				   this.innerVisible = false
			   }
	  },
	    Rcancel(pretime,id) {
	  			   // console.log(id)
	  			   var curdate = new Date()
	  			   var preTime = new Date(pretime);
	  			   // console.log(preTime)
	  			   var AddpreTime = preTime.setMinutes(preTime.getMinutes() + 30)
	  			   var AddPreTime = new Date(AddpreTime)
	  			   if(curdate.getTime() <= AddPreTime.getTime()){
	  				   this.outerVisible = false
	  				   // this.$alert('已超过30分钟')
	  				    this.$confirm('是否取消预订', '', {
	  				             confirmButtonText: '确定',
	  				             cancelButtonText: '取消',
	  				             type: 'warning'
	  				           }).then(() => {
	  							   this.axios.get('/api/reservation/del',{
	  								   params:{
	  									   id: id,
	  								   }}).then(() => {
	  									   this.$message({
	  									     type: 'success',
	  									     message: '取消成功!'
	  								   })
	  				             });
	  				           }).catch(() => {
	  				           });
	  			   }else{
	  				   this.outerVisible = true
	  				   this.innerVisible = false
	  			   }
	  },
	  Pdel(id) {
		  this.axios.get('/api/preroom/del',{
		  			   params:{
		  				   id: id,
		  			   }}).then(() => {
		  				   this.$message({
		  				     type: 'success',
		  				     message: '取消成功!'
		  			   })
		           });
	  },
	  Rdel(id) {
	  		  this.axios.get('/api/reservation/del',{
	  		  			   params:{
	  		  				   id: id,
	  		  			   }}).then(() => {
	  		  				   this.$message({
	  		  				     type: 'success',
	  		  				     message: '取消成功!'
	  		  			   })
	  		           });
	  }
	}
	}
</script>

<style>
	.main {
		width: 90vw;
		margin-left: 3vw;
	}
	.top{
		margin-bottom: 50px;
	}
	.model {
		margin: 0 3.5vw;
	}
	.box-card{
		margin-bottom: 30px;
	}
	.blue1 {
		color: royalblue;
		font-size: 12px;
	}
	.cancel {
		float: right;
		line-height: 12px;
	}
	.rcenter {
		color: darkgrey;
		font-size: 20px;
		display: block;
		text-align: center;
	}
	/* .blue2 {
		color: royalblue;
	} */
</style>
