<script setup>
import { ElContainer, ElHeader, ElAside, ElMain, ElButton } from 'element-plus';
import { defineAsyncComponent } from 'vue';
import router from '../../router'

const Shop_Menu = defineAsyncComponent(() => {
   return import('./menu/index.vue');
});
function logout() {
   window.sessionStorage.clear()
   router.push('/login')
}

</script>

<template>
   <div class="common-layout">
      <el-container>
         <el-header>
            <div class="title">
               <div class="img_div" @click="router.push('/welcome')">
                  <img src="../../assets/img/banana.gif" alt="">
               </div>
               <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出登录</el-button>
         </el-header>
         <el-container class="main-container">
            <el-aside width="150px">
               <Suspense>
                  <template #default>
                     <Shop_Menu />
                  </template>
               </Suspense>
            </el-aside>
            <el-main>
               <router-view></router-view>
            </el-main>
         </el-container>
      </el-container>
   </div>
</template>

<style lang="less" scoped>
.el-container {
   height: 100%;
}

.common-layout {
   width: 100%;
   height: 100%;

   .el-header {
      height: 70px;
      background-color: #2c3e50;
      color: #ecf0f1;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .title {
         display: flex;
         flex-direction: row;
         align-items: center;

         .img_div {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 3px solid #FFFF47;
            box-shadow: 0px 0px 7px #FFFF47;

            margin: 0 20px;

            cursor: pointer;

            overflow: hidden;

            img {
               width: 100%;
               height: 100%
            }
         }

         span {
            font-size: 20px;
            font-weight: 500;
         }
      }

      .el-button {
         margin: 0 25px;
      }

   }

   .main-container {
      height: 100%;
      width: 100%;

      .el-aside {
         height: 100%;
         background-color: #333744;
      }
   }
}
</style>