<template>
	<div>
      <el-page-header @back="back" content="新增订位信息" style="font-weight: bolder;line-height: 70px;">
      </el-page-header>
    <el-form
      :model="reservation"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="reservation.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="reservation.phone"></el-input>
      </el-form-item>
      <el-form-item label="餐厅类型" prop="type">
          <el-select v-model="reservation.type" placeholder="请选择餐厅类型">
            <el-option label="中餐厅" value="中餐厅"></el-option>
            <el-option label="西餐厅" value="西餐厅"></el-option>
      		<el-option label="自助餐厅" value="自助餐厅"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="就餐人数" prop="seatnum">
       <el-input-number v-model="reservation.seatnum" :min="1" :max="20"></el-input-number>
       <span class="five">需大于等于五人</span>
      </el-form-item>
	  <el-form-item label="就餐时间" prop="arrtime">
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
        <el-button type="primary" @click="add">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservationAdd",
  data() {
    return {
      reservation: {
		name: "",
		phone: "",
        type: "",
        seatnum: "",
		time: "",
		other: ""
      },
	  ordernum:"",
	  pretime:"",
      rules: {
		name: [
		  {required: true, message: "请输入姓名", trigger: "blur"},
		],
		phone: [
		  {required: true, message: "请输入手机号码", trigger: "blur"},
		],
        type: [
          {required: true, message: "请选择餐厅类型", trigger: "change"},
        ],
        seatnum: [
          {required: true, message: "请输入人数", trigger: "change" },
        ],
		arrtime: [
		  {required: true, message: "请选择就餐时间", trigger: "change" },
		],
		other: [
		  {required: false},
		],
      },
    }
  },
  async created() {
	this.ordernum = 'htc' + this.$ordernum.getOrderNum() + Math.floor(Math.random() * 10);
    this.pretime = this.$gettime.getTime();
  },
  methods: {
    add(){
		this.$refs.ruleForm.validate((valid) => {
		  if (valid) {
        this.axios.get('/api/reservation/add',{
			params: {
			ordernum:this.ordernum,
			name:this.reservation.name,
			phone:this.reservation.phone,
			type:this.reservation.type,
			seatnum:this.reservation.seatnum,
			arrtime:this.reservation.arrtime,
			pretime:this.pretime,
			other:this.reservation.other
			}}).then(res=>{
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
			 this.$alert(msg,{
			      dangerouslyUseHTMLString: true
			 }).then(() => {
			    this.$router.push('/index/reservationdata')
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
	  }else {
          console.log("error submit!!");
          return false;
		  }
    })
        },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
	back(){
		this.$router.go(-1)
	},
  },
  // async created() {
  //     let names = sessionStorage.getItem("data");
  //     this.username = JSON.parse(names);
  //     }
}
</script>

<style scoped>
.el-form {
	margin-left: 70px;
}
::v-deep .el-form-item {width: 60%;}
::v-deep .el-select{width: 100%;}
.five {
		margin-left: 6px;
		font-size: 10px;
		color: red;
	}
</style>