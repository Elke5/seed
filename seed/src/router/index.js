import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import home from '../views/admin/AdminDl.vue';
import Menu from '../views/admin/AdminMenu.vue';
import clientdata from '../views/admin/ClientData.vue';
import clientdetail from '../views/admin/ClientDetail.vue';
import clientupdate from '../views/admin/ClientUpdate.vue';
import clientadd from '../views/admin/ClientAdd.vue';
import staffdata from '../views/admin/StaffData.vue';
import staffdetail from '../views/admin/StaffDetail.vue';
import staffadd from '../views/admin/StaffAdd.vue';
import staffupdate from '../views/admin/StaffUpdate.vue';
import roomdata from '../views/admin/RoomData.vue';
import roomdetail from '../views/admin/RoomDetail.vue';
import roomupdate from '../views/admin/RoomUpdate.vue';
import roomadd from '../views/admin/RoomAdd.vue';
import preroomdata from '../views/admin/PreroomData.vue';
import preroomdetail from '../views/admin/PreroomDetail.vue';
import preroomupdate from '../views/admin/PreroomUpdate.vue';
import preroomadd from '../views/admin/PreroomAdd.vue';
import canteendata from '../views/admin/CanteenData.vue';
import canteenadd from '../views/admin/CanteenAdd.vue';
import canteendetail from '../views/admin/CanteenDetail.vue';
import canteenupdate from '../views/admin/CanteenUpdate.vue';
import reservationdata from '../views/admin/ReservationData.vue';
import reservationadd from '../views/admin/ReservationAdd.vue';
import reservationdetail from '../views/admin/ReservationDetail.vue';
import reservationupdate from '../views/admin/ReservationUpdate.vue';
import staffhome from '../views/staff/StaffDl.vue';
import staffmenu from '../views/staff/StaffMenu.vue';
import preroomcheck from '../views/staff/PreroomCheck.vue';
import reservationcheck from '../views/staff/ReservationCheck.vue';
import preroomall from '../views/staff/PreroomAll.vue';
import reservationall from '../views/staff/ReservationAll.vue';
import userdh from '../views/user/UserDh.vue';
import usersy from '../views/user/UserSy.vue';
import login from '../views/user/UserDl.vue';
import userzc from '../views/user/UserZc.vue';
import roomshow from '../views/user/RoomShow.vue';
import canteenshow from '../views/user/CanteenShow.vue';
import userpre from '../views/user/UserPre.vue';

Vue.use(VueRouter)
 


const routes = [
   {
	   //后台管理登录路径
	   path: '/admin',
	   name:'home',
	   component: home,
   },
   {
	   path:'/index',
	   component:Menu,
	   children: [
		   {
			   //客户信息页面路径
			   path: 'clientdata',
			   name: 'client-data',
			   component: clientdata,
		   },
		   {
			  path:'clientdetail',
			  name:'client-detail',
			  component:clientdetail,
		   },
		   {
			   path: 'clientupdate',
			   name: 'client-update',
			   component: clientupdate,
		   },
		   {
		   	   path: 'clientadd',
		   	   name: 'client-add',
		   	   component: clientadd,
		   },
		   {
			   path:'staffdata',
			   name: 'staff-data',
			   component: staffdata,
		   },
            {
			   path:'staffdetail',
			   name: 'staff-detail',
			   component: staffdetail,
		   },
		   {
		   	   path:'staffadd',
		   	   name: 'staff-add',
		   	   component: staffadd,
		   },
		   {
		   	   path:'staffupdate',
		   	   name: 'staff-update',
		   	   component: staffupdate,
		   },
		   //客房
		   {
			   path: 'roomdata',
			   name: 'room-data',
			   component: roomdata,
		   },
		   {
               path: 'roomdetail',
               name: 'room-detail',
               component: roomdetail,
		   },
		   {
		   		path: 'roomupdate',
		   		name: 'room-update',
		   		component: roomupdate,
		   },
		   {
			    path: 'roomadd',
			    name: 'room-add',
			    component: roomadd,
		   },
		   //订房
            {
			   path: 'preroomdata',
			   name: 'preroom-data',
			   component: preroomdata,
		   },
		   {
               path: 'preroomdetail',
               name: 'preroom-detail',
               component: preroomdetail,
		   },
		   {
		   		path: 'preroomupdate',
		   		name: 'preroom-update',
		   		component: preroomupdate,
		   },
		   {
			    path: 'preroomadd',
			    name: 'preroom-add',
			    component: preroomadd,
		   },
		   //餐厅
		   {
		   		path: 'canteendata',
		   		name: 'canteen-data',
		   		component: canteendata,
		   },
		   {
		   		path: 'canteenadd',
		   		name: 'canteen-add',
		   		component: canteenadd,
		   },
		   {
		   		path: 'canteendetail',
		   		name: 'canteen-detail',
		   		component: canteendetail,
		   },
		   {
		   		path: 'canteenupdate',
		   		name: 'canteen-update',
		   		component: canteenupdate,
		   },
		    //订位
		   {
		   		path: 'reservationdata',
		   		name: 'reservation-data',
		   		component: reservationdata,
		   },
		   {
		   		path: 'reservationadd',
		   		name: 'reservation-add',
		   		component: reservationadd,
		   },
		   {
		   		path: 'reservationdetail',
		   		name: 'reservation-detail',
		   		component: reservationdetail,
		   },
		   {
		   		path: 'reservationupdate',
		   		name: 'reservation-update',
		   		component: reservationupdate,
		   },
	   ]
   },
   {
   	   //前台工作人员登录路径
   	   path: '/staff',
   	   name:'staffhome',
   	   component: staffhome,
   },
   {
   	   path:'/staffsy',
   	   component:staffmenu,
   	   children: [
   		   {
   			   //订房信息
   			   path: 'preroomcheck',
   			   name: 'preroom-check',
   			   component: preroomcheck,
   		   },
		   {
			   path: 'reservationcheck',
			   name: 'reservation-check',
			   component: reservationcheck,
		   },
		   {
			   path: 'preroomall',
			   name: 'preroom-all',
			   component: preroomall,
		   },
		   {
			   path: 'reservationall',
			   name: 'reservation-all',
			   component: reservationall,
		   }
		]
   },
   {
   		// 面向客户网页路径
   	  path: '/',	
   	  name: 'userhome',
   	  redirect: { name: 'room-show' }
    },
	{
	  path: '',
	  name: 'user-dh',
	  component: userdh,
	  children: [
		    {
				path: 'usersy',
				name: 'user-sy',
				component: usersy,
				children: [
					  {
						path: 'roomshow',
						name: 'room-show',
						component: roomshow,
					  },
					  {
						path: 'canteenshow',
						name: 'canteen-show',
						component: canteenshow,
					  },
					]
			},
			{
			    path: 'login',
				name: 'login',
				component: login,
			},
			{
				path: 'userzc',
				name: 'user-zc',
				component: userzc,
			},
			{
				path: 'userpre',
				name: 'user-pre',
				component: userpre,
			}
		]
	  },
]
//声明路由实例
const router = new VueRouter({
  // 修改路由为 history 模式
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// router.beforeEach((to,from,next)=>
// {
// 	const token = localStorage.getItem('Token')
// 	 if(from.path=="/login")//从登录页面可以直接通过登录进入主页面
// 	    {
// 	      next();
// 	    }
// 	    else{
// 	    	//从/进入,如果登录状态是true，则直接next进入主页面
// 		      if(localStorage.s === "true")
// 			    {
// 			      next('/');
// 			      console.log(localStorage['s'])
// 			    }
// 		    else {
// 				//如果登录状态是false，那么跳转至登录页面,需要登录才能进入主页面
// 		      ElementUI.Message.error('请先登录');
// 			  next('/login');
// 		      console.log("需要登录")
// 		    }
// }
// })


export default router