<template>
    <v-card
    outlined
    >
      <v-card-title>
        <v-row>
          <v-col>
            <v-text-field filled  label="昵称(必填)" color="#fbb5f3"> </v-text-field>
          </v-col>
          <v-col>
            <v-text-field filled label="邮箱(必填)" color="#fbb5f3"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field filled label="网址(https://)" color="#b987fe"></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
     <v-card-text>
       <v-textarea
           class="textarea-1"
           transition="scale-transition"
           filled
           label="写点东西呗^_^"
           value=""
           color="#b987fe"
           @focus="focus($event)"
           @blur="blur($event)"
       ></v-textarea>
     </v-card-text>
      <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
      >
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn>
    </v-card>

</template>

<script>

export default {
  name: "comment",
  data:()=>({

  }),
  methods:{
    blur(event){
      document.documentElement.setAttribute('data-theme', event.type)
    },
    focus(event){
      document.documentElement.setAttribute('data-theme', event.type)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/mixin";
.textarea-1 {
  @include cm-bg_image($background-image-blur);
  background-size: auto 80%;
  background-origin:padding-box;
  background-repeat: no-repeat;
  background-position: right top;
  background-color: rgba(255, 255, 255, 0);
  resize: both;
}
</style>