<template>
  <v-navigation-drawer
      app
      v-model="drawer"
      floating
      dark
      src="../../assets/img/6-300.jpg"
      width="300"
      :mini-variant.sync="mini"
      permanent
      enable-resize-watcher
      fixed
  >
    <v-list-item class="px-2"
                 link
                 @click.stop="mini = !mini"
    >

      <v-list-item-icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-divider></v-divider>
    <!-- 左侧菜单 -->
    <v-list class="pt-0" dense>
      <v-list-group
          :value="false"
          v-for="menu in menusMethods"
          :key="menu.title"
          :prepend-icon="menu.action"
          no-action
      >
        <!--一级菜单 -->
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="menu.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <!-- 二级菜单 -->
        <v-list-item link v-for="subItem in menu.items" :key="subItem.title" :to="menu.path + subItem.path">
          <v-list-item-content>
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import menus from "../../menu";
  export default {
  name: "Sidebar",
  data: () => ({
    drawer: true,
    mini: true,
    menusMethods: menus,
  }),
  created() {
  },

  computed: {


  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>