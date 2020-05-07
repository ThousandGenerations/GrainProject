<template>
  <div>
    <!-- 头部 -->
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { reqBaseCategoryList } from "@/api";
// import  from '@/'
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  //测试三级菜单请求
  async mounted() {
    // const result = await reqBaseCategoryList();
    // console.log(result);
  }
};
</script>

<style lang="less" scoped>
</style>

