<template>
	<div>
      <el-page-header @back="back" content="新增客户信息" style="font-weight: bolder;line-height: 70px;">
      </el-page-header>
    <el-form
      :model="client"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="client.username"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="client.account" placeholder="此为手机号码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="client.pass"></el-input>
      </el-form-item>
     <el-form-item label="出生日期" prop="age">
       <el-date-picker
             v-model="client.birth"
             type="date"
             placeholder="选择日期"
       	   value-format="yyyy-MM-dd">
       </el-date-picker>
     </el-form-item>
	 <el-form-item label="性别" prop="sex">
	     <el-select v-model="client.sex" placeholder="请选择性别">
	       <el-option label="男" value="男"></el-option>
	       <el-option label="女" value="女"></el-option>
	     </el-select>
	 </el-form-item>
	 <el-form-item label="备注" prop="other">
	     <el-input v-model="client.other"></el-input>
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
      client: {
        username: "",
        account: "",
		pass: "",
		birth: "",
		sex:"",
		other:"",
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
        ],
        account: [
          {required: true, message: "请输入账号", trigger: "change" },
        ],
		pass: [
		  {required: true, message: "请输入密码", trigger: "change" },
		],
		other: [
		  {required: false},
		],
      },
    }
  },
  methods: {
    add(){
		this.$refs.ruleForm.validate((valid) => {
		  if (valid) {
        this.axios.get('/api/client/add',{
			params: {
				username:this.client.username,
				Phone:this.client.account,
				userPassword:this.client.pass,
				birth:this.client.birth,
				sex:this.client.sex,
				other:this.client.other
				}}).then(res=>{
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
			 this.$alert(msg,{
			      dangerouslyUseHTMLString: true
			 }).then(() => {
			    this.$router.push('/index/clientdata')
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
::v-deep .el-form-item {width: 50%;}
</style>