<template>
  <div>
    <CodeEditor
        :language_selector="true"
        :languages="this.codeLanguages"
        :copy_code="true"
        v-model="codeValue"
        ref="codeEditor"
        border_radius="1px"
        :min_height="min_height"
        width="auto"
        :wrap_code="true"
        @lang="getLanguage"
    >  </CodeEditor>
  </div>

</template>

<script>

import CodeEditor from 'simple-code-editor'
export default {
  name: "CodeEdit",
  components:{CodeEditor},
  props:{

  },
  data:()=>(
      {
        codeValue:``,
        selectLang:'',
        codeLanguages:[
            ['javascript','JS'],
            ['java','JAVA'],
            ['c#','C#'],
            ['cpp','C++'],
            ['python', 'Python'],
            ['shell','Shell'],
            ['html','HTML'],
            ['typeScript','TS'],
            ['rust','RUST']
        ],
        min_height: document.body.clientHeight - (document.body.clientHeight/2)+'px',
      }
  ),
  methods:{
    getLanguage(lang){
     this.selectLang=lang;
    },

  }
}
</script>

<style scoped>

</style>