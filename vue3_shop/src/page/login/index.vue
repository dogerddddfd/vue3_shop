<script setup>
import Form from './Form.vue'
</script>

<template>
   <div class="background">
      <div id="login_card">
         <div class="img_div">
            <img src="../../assets/img/banana.gif" alt="">
         </div>
         <Form></Form>
      </div>
   </div>

</template>

<style lang="less" scoped>
.background {
   width: 100%;
   height: 100%;
   z-index: -10;
   background: linear-gradient(to bottom right, #667FFF, #66FFE6);
}

#login_card {
   width: 480px;
   height: 300px;

   position: relative;
   top: 45%;
   left: 50%;
   transform: translate(-50%, -40%);

   border-radius: 20px;
   // background: radial-gradient(circle, #ffcc00, #FFE666);
   background-color: #fff;
   box-shadow: 0px 0px 20px #333333;


   overflow: visible;

   .img_div {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 10px solid #FFFF47;
      box-shadow: 0px 0px 20px #FFFF47;

      position: absolute;
      top: -80px;
      left: 50%;
      transform: translate(-50%, 0);

      overflow: hidden;

      img {
         width: 100%;
         height: 100%
      }
   }

}
</style>