<template>
	<div>
     <el-page-header @back="back" content="新增餐厅信息" style="font-weight: bolder;margin-top: 30px;">
     </el-page-header>
    <el-form
      :model="canteen"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="类型" prop="type">
        <el-input v-model="canteen.type"></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="content">
       <el-input v-model="canteen.content"></el-input>
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
  name: "CanteenAdd",
  data() {
    return {
      canteen: {
        type: "",
		content: ""
      },
      rules: {
        type: [
          {required: true, message: "请输入类型", trigger: "blur"},
        ],
		content: [
		  {required: false},
		],
      },
    }
  },
  methods: {
    add(){
		this.$refs.ruleForm.validate((valid) => {
		  if (valid) {
        this.axios.get('/api/canteen/add',{params: {type:this.canteen.type,content:this.canteen.content}}).then(res=>{
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
			 this.$alert(msg,{
			      dangerouslyUseHTMLString: true
			 }).then(() => {
			    this.$router.push('/index/canteendata')
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
	margin-top: 80px;
}
::v-deep .el-form-item {width: 60%;}
</style>