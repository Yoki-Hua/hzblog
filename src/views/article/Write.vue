<template>
  <div>
    <v-container>
      <v-row>
        <v-col md="7">
          <h2>写文章
          </h2>
        </v-col>
        <v-col md="2">
          <v-btn rounded color="secondary">发布</v-btn>
          <v-btn rounded>保存</v-btn>
        </v-col>
      </v-row>


    </v-container>
    <v-container>
      <v-row>
        <!--        标题-->
        <v-col>
          <v-container>
            <v-text-field
                label="标题"
                outlined
            ></v-text-field>
            <Editor></Editor>

          </v-container>
          <v-col>
            <v-container>

            </v-container>
          </v-col>
        </v-col>
        <v-col md="4">
          <!--          菜单/分类-->
          <v-hover v-slot="{ hover }"
          >
            <v-card
                :elevation="hover ? 5 : 2"
                class=" mb-4"
            >
              <v-card-title>
                菜单
              </v-card-title>
              <v-card-text>
                <v-list dense>
                  <v-list-item-group
                      v-model="selectedItem"
                      color="primary"
                  >
                    <v-list-item
                        v-for="(menuItem, i) in menuItems"
                        :key="i"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="menuItem.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="menuItem.text"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-hover>

          <!--      标签    -->
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover?5:2" class="mb-4">
              <v-card-title>标签</v-card-title>
              <v-card-text>
                <v-combobox
                    v-model="chips"
                    :items="chipsItems"
                    chips
                    clearable
                    label="请选择标签"
                    multiple
                    prepend-icon="mdi-tag-heart"
                    solo
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="remove(item)"
                        color="green"
                        outlined
                    >
                      <strong>{{ item }}</strong>&nbsp;
                      <!--                      <span>(interest)</span>-->
                    </v-chip>
                  </template>
                </v-combobox>


              </v-card-text>
            </v-card>
          </v-hover >

          <!--       封面图   -->
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover?5:2" class="mb-4">
              <v-card-title>封面上传</v-card-title>
              <v-card-text>
                <v-card color="#d8d4d2">
                  <v-img src="https://www.islery.com/upload/m.webp"  height="270"></v-img>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="secondary">上传</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Editor from "@/components/Editor";

export default {
  name: "Write",
  components: {Editor},
  data: () => ({
    selectedItem: 0,
    //绑定菜单
    menuItems: [],
    //标签
    chips: [],
    chipsItems: [],
  }),
  watch: {},
  created() {
    this.selectMenus();
    this.selectChipsItems();
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    selectMenus() {
      //todo axios查询前台菜单并返回
      this.menuItems = [
        {text: '技术相关', icon: 'mdi-check-circle'},
        {text: '闲谈', icon: 'mdi-check-circle'},
        {text: '音乐', icon: 'mdi-check-circle'},
      ]
    },
    selectChipsItems() {
      //todo 查询前台标签属性
      this.chipsItems = ['云服务器', 'sql', 'java', 'js']
    }
  },

}
</script>

<style scoped>

</style>