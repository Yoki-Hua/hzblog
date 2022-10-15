<template>
<div>
<v-main app>
  <router-view></router-view>
</v-main>
</div>
</template>

<script>
export default {
  name: "Content",
  data:()=>({
    menuMap:{},
  }),
  created() {

    },
  mounted() {
    },

  computed:{

  }
}
</script>

<style scoped>

</style>