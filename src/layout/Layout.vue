<template>
  <div class="home">
   <Bar></Bar>
    <Sidebar></Sidebar>
    <Content></Content>
    <Footer></Footer>
  </div>

</template>

<script>
// @ is an alias to /src
import Bar from '@/layout/components/Bar'
import Sidebar from "@/layout/components/Sidebar";
import Footer from "@/layout/components/Footer";
import Content from "@/layout/components/Content";
export default {
  name: 'Layout',
  components: {
    Content,
    Footer,
    Bar,
    Sidebar
  }
}
</script>
