<template>
	<div>
      <el-page-header @back="back" content="新增前台人员信息" style="font-weight: bolder;line-height: 70px;">
      </el-page-header>
    <el-form
      :model="staff"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="工号" prop="jobnum">
        <el-input v-model="staff.jobnum"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="staff.pass"></el-input>
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
      staff: {
        jobnum:"",
		pass:"",
      },
      rules: {
        jobnum: [
          {required: true, message: "请输入工号", trigger: "blur"},
        ],
        pass: [
          {required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    }
  },
  methods: {
    add(){
		this.$refs.ruleForm.validate((valid) => {
		  if (valid) {
        this.axios.get('/api/staff/add',{params: {jobnum:this.staff.jobnum,pass:this.staff.pass}}).then(res=>{
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
			 this.$alert(msg,{
			      dangerouslyUseHTMLString: true
			 }).then(() => {
			    this.$router.push('/index/staffdata')
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