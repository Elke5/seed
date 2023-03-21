<template>
	<div>
		 <el-carousel :interval="4000" type="card" height="320px">
		    <el-carousel-item v-for="pic in pics" :key="pic.id">
		     <img class="img" :src="pic.src" />
		    </el-carousel-item>
		 </el-carousel>
		 
		  <el-menu 
		  router :default-active="$route.path" 
		  class="el-menu-demo" 
		  mode="horizontal" >
		    <el-menu-item index="/usersy/roomshow">房间</el-menu-item>
			<el-menu-item index="/usersy/canteenshow">餐饮</el-menu-item>
		  </el-menu>
		  <div class="index">
		  <el-row>
		   <el-col :span="17">
		  <router-view></router-view>
		  </el-col>
		  <el-col :span="1">
			  <el-divider direction="vertical" class="middle"></el-divider>
		  </el-col>
		  <el-col :span="5">
			  <div class="rule">
			  <h2>酒店政策</h2>
			  <ul>
				  <li>订房必读</li>
				  <!-- <p><span style="font-weight: bold">城市通知:</span>
				  为贯彻落实《xx市星级酒店全面推进减少酒店行业
				  一次性用品专项行动方案》相关规定，推进生活垃圾源头减量，
				   xx年x月x日起，xx市旅游住宿业将不再主动提供牙刷、
				   梳子、浴擦、剃须刀、指甲锉、鞋擦这些一次性日用品，
				   酒店餐厅不主动提供一次性餐具。若住客需要可咨询酒店。<br /> -->
				   <span style="font-weight: bold">预订规则：</span>
				   预订（订房，订位）后的前30分钟可免费取消，超过30分钟后需支付20元取消。
				  </p>
				   <el-divider></el-divider>
				  <li>入住方式</li>
				  <p>请到前台领取钥匙/门卡</p>
				  <el-divider></el-divider>
				  <li>入住提示</li>
				  <p>仅接待持大陆身份证的客人</p>
				  <el-divider></el-divider>
				  <li>儿童及加床</li>
				  <p>酒店允许客人携带儿童入住。<br />
                      <span style="font-weight: bold">使用现有床铺</span><br />
                        每房间可有1名12岁或以下的儿童使用现有床铺。<br />
                      <span style="font-weight: bold">加床：</span><br />
                        每间客房如需加床/加婴儿床，请提前拨打前台服务电话安排。</p>
			  </ul>
			  <h2>关于我们</h2>
			  <ul>
				  <li>联系我们：</li>
				  <p>客服电话：080-55555<br />
				     前台电话：080-88888<br />
					 邮箱：3456789@xx.com
				  </p>
				  
			  </ul>
			  </div>
		  </el-col>
		 </el-row>
		</div>
	</div>
</template>

<script>
	import jd1 from "@/assets/carousel/jd1.jpg";
	import jd2 from "@/assets/carousel/jd2.jpg";
	import jd3 from "@/assets/carousel/jd3.jpg";
	import jd4 from "@/assets/carousel/jd4.jpg";
	import jd5 from "@/assets/carousel/jd5.jpg";
	export default {
	  data() {
	    return {
	    pics:[
				  {
					  id:'1',
					  src:jd1
				  },
				  {
				  	  id:'2',
				  	  src:jd2
				  },
				  {
					  id:'3',
					  src:jd3
				  },
				  {
				  	  id:'4',
				  	  src:jd4
				  },
				  {
				  	  id:'5',
				  	  src:jd5
				  },
	],
   }
  },
}
</script>

<style scoped lang="less">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.img{
		width: 100%;
		height: 100%;
	}
.index {
	width: 100vw;
}
.middle {
	width: 3px;
	height: 1000px;
	}
.rule{
	margin-top: 39px;
}
li{
	font-weight: bold;
}
</style>
