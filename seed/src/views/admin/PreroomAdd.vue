<template>
	<div>
      <el-page-header @back="back" content="新增订房信息" style="font-weight: bolder;line-height: 70px;">
      </el-page-header>
    <el-form
      :model="preroom"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="preroom.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="preroom.phone"></el-input>
      </el-form-item>
      <el-form-item label="房间类型" prop="type">
          <el-select v-model="preroom.type" placeholder="请选择餐厅类型">
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
		  <el-select v-model="preroom.breakfast" placeholder="请选择">
		   <el-option label="是" value="是"></el-option>
		   <el-option label="否" value="否"></el-option>
		  </el-select>
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
        <el-button type="primary" @click="add">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RoomAdd",
  data() {
    return {
      preroom: {
		name: "",
		phone: "",
        type: "",
		breakfast: "",
        roomnum: "",
		intime:"",
		arrtime: "",
		other: ""
      },
	  ordernum:"",
	  pretime:"",
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
        type: [
          {required: true, message: "请选择房间类型", trigger: "blur"},
        ],
		breakfast: [
		  {required: true, message: "请选择", trigger: "blur"},
		],
        roomnum: [
          {required: true, message: "请输入房间数量", trigger: "change" },
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
    }
  },
  async created() {		
    this.ordernum = 'ht0' + this.$ordernum.getOrderNum() + Math.floor(Math.random() * 1000);
    this.pretime = this.$gettime.getTime();
  },
  methods: {
	dateFormat() {
	    this.pickdata.startTime = this.preroom.intime[0]
	    this.pickdata.endTime = this.preroom.intime[1]
		// console.log(this.pickdata.startTime)
	},
    add(){
		this.$refs.ruleForm.validate((valid) => {
		  if (valid) {
        this.axios.get('/api/preroom/add',{
			params: {
				ordernum:this.ordernum,
				name:this.preroom.name,
				phone:this.preroom.phone,
				type:this.preroom.type,
				breakfast:this.preroom.breakfast,
				roomnum:this.preroom.roomnum,
				intime:this.preroom.intime[0] + "至" + this.preroom.intime[1],
				arrtime:this.preroom.arrtime,
				pretime:this.pretime,
				other:this.preroom.other
				}}).then(res=>{
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
			 this.$alert(msg,{
			      dangerouslyUseHTMLString: true
			 }).then(() => {
			    this.$router.push('/index/preroomdata')
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
</style>