<script setup>
import { ElMenu, ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { request } from '../../../utils/server';

const menuList = await request({
   method:'get',
   url:`menus`
})

const icons = {
   125: 'User',
   103: 'Key',
   101: 'ShoppingBag',
   102: 'List',
   145: 'DataAnalysis'
}

let activePath
function saveNavState(getactivePath) {
   window.sessionStorage.setItem('activePath', getactivePath)
   activePath = getactivePath
}

</script>

<template>
   <Suspense>
      <template #default>
         <el-menu background-color="#333744" text-color="#fff" unique-opened router :default-active="activePath">
            <el-sub-menu v-for="item in menuList" :index="item.id + ''" :id="item.id">
               <template #title>
                  <el-icon :size="20">
                     <component :is="icons[item.id]" />
                  </el-icon>
                  <span>{{ item.authName }}</span>
               </template>
               <el-menu-item v-for="subItem in item.children" :index="'/' + subItem.path + ''" :id="subItem.id"
                  @click="saveNavState(subItem.path)">
                  <template #title>
                     <el-icon :size="15">
                        <Grid />
                     </el-icon>
                     <span>{{ subItem.authName }}</span>
                  </template>
               </el-menu-item>
            </el-sub-menu>
         </el-menu>
      </template>
   </Suspense>
</template>

<style lang="less">
.el-menu {
   border: 1px solid #333744
}
</style>