<template>
	<div>
      <el-page-header @back="back" content="新增客房信息" style="font-weight: bolder;line-height: 70px;">
      </el-page-header>
    <el-form
      :model="room"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="客房类型" prop="type">
        <el-input v-model="room.type"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="room.number"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="room.price"></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="content">
       <el-input v-model="room.content"></el-input>
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
      room: {
        type: "",
        number: "",
		price: "",
		content: ""
      },
      rules: {
        type: [
          {required: true, message: "请输入类型", trigger: "blur"},
        ],
        number: [
          {required: true, message: "请输入数量", trigger: "change" },
        ],
		price: [
		  {required: true, message: "请输入价格", trigger: "change" },
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
        this.axios.get('/api/room/add',{params: {type:this.room.type,number:this.room.number,price:this.room.price,content:this.room.content}}).then(res=>{
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
			 this.$alert(msg,{
			      dangerouslyUseHTMLString: true
			 }).then(() => {
			    this.$router.push('/index/roomdata')
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
</style>