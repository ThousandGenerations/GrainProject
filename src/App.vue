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
// import  from '@/'
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less" scoped>
</style>

