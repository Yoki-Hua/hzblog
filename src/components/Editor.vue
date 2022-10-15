<template>
  <div class="mb-8"
       :style="{ height: this.fullEditorHeight + 'px' }"
  >
    <!--
       上传图片
       -->
    <v-dialog
        transition="dialog-top-transition"
        :max-width="dialogWidth+'px'"
        v-model="imgDialog"
    >
      <v-card>
        <v-card-title
        >
          图片上传
        </v-card-title>
        <!--       上传界面-->
        <div v-show="show">
          <v-card-text
              class="text-center"
          >
            <v-row>
              <v-col md="12">

                <v-hover v-slot="{ hover }">
                  <v-card
                      class="v-btn"
                      color="#d8d4d2"
                      :elevation="hover?5:2"
                      height="300px"
                  >
                    <!--                    用于格式换行  -->
                    <v-card-text/>
                    <v-card-text/>
                    <v-card-text/>
                    <v-card-text/>
                    <FileUpload
                        class="btn btn-primary dropdown-toggle"
                        post-action="/upload/post"
                        :multiple="false"
                        :drop="true"
                        :drop-directory="false"
                        :size="size"
                        @input="uploadFile"
                        @input-filter="inputFilter"
                        v-model="files"
                        ref="upload"
                    >

                      <v-icon
                          x-large
                          color="purple"
                      >
                        mdi-image
                      </v-icon>
                      <p>
                        点击或者拖拽上传
                      </p>
                    </FileUpload>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-row>
              <v-col>
                <h1>
                  or
                </h1>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                    v-model="imgUrl"
                    filled
                    label="url"
                    :hint="hint"
                    persistent-hint
                    append-outer-icon="mdi-cloud-upload"
                    color="#fbb5f3"
                    @focus="changeText()"
                    @click:append-outer="inputImageUrl(imgUrl)"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-spacer></v-spacer>


          </v-card-text>
        </div>
        <!--        预览界面-->
        <div v-show="!show">
          <v-card-text>
            <v-row justify="center">
<!--        todo lazy-src需要更换    -->
              <v-img
                  alt="自定义图像"
                  lazy-src="https://www.islery.com/upload/hm1.webp"
                  :src="imgSrc"
                  @error="imgStatus='error'"
                  v-if="imgStatus !== 'error'"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                        indeterminate
                        color="purple"
                    ></v-progress-circular>
                  </v-row>
                </template>

              </v-img>
              <v-img
                  v-else
                  src="https://cdn.jsdelivr.net/gh/Yoki-Hua/image/pic/20210125141627.png"
                  width="900"
              >
              </v-img>
            </v-row>

          </v-card-text>
        </div>
        <v-card-actions class="justify-end">
          <v-btn text @click="saveImage()">上传</v-btn>
          <v-btn
              text
              @click="cancelImage()"
          >取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!--    编辑器-->
    <quill-editor
        class="edit_container"
        v-model="quillContent"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
        @ready="onEditorReady($event)"
        :style="{ height: this.quillEditorHeight + 'px' }"

    >
    </quill-editor>
    <!--    代码块-->
    <v-dialog
        transition="dialog-top-transition"
        :max-width="dialogWidth+'px'"
        v-model="editorDialog"
    >
      <v-card class=" mr-0 ml-0">
        <v-toolbar
            color="black"
            dark
        >插入代码
        </v-toolbar>
        <CodeEdit
            ref="codeEditValue"
        ></CodeEdit>
        <v-card-actions class="justify-end">
          <v-btn text @click="saveCode()">保存</v-btn>
          <v-btn
              text
              @click="cancelCode()"
          >关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import FileUpload from 'vue-upload-component'
import {Quill, quillEditor} from "vue-quill-editor"; //调用编辑器
// import Quill from 'quill'
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
// 图片可拖拽
import {ImageDrop} from 'quill-image-drop-module'
//图片可调整大小
import ImageResize from 'quill-image-resize-module'
import CodeEdit from "@/components/CodeEdit";

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
//自定义弹出代码框图标
const icons = Quill.import('ui/icons');
icons.codeCard = '<i  class="v-icon  mdi mdi-xml " style="font-size: 18px;align-content: center"></i>'
// 自定义字体大小
let size = ['12px', '16px', '18px', '20px', '22px', '28px', '32px']
let Size = Quill.import('attributors/style/size')
Size.whitelist = size
Quill.register(Size, true)
// let Delta = Quill.import('delta');
// 自定义字体类型
let fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif']
let Font = Quill.import('formats/font')
Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)

//自定义toolbar
// 富文本工具栏配置
const toolbarOptions = [
  [{'font': fonts}], //字体
  [{'size': size}],  // 大小
  [{'header': 1}, {'header': 2}],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'codeCard'],//自定义弹出框
  [{'header': [1, 2, 3, 4, 5, 6, false]}],//标题
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction
  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean'],                                      // remove formatting button

];


export default {
  components: {
    quillEditor, FileUpload, CodeEdit
  },
  data() {
    return {
      //上传组件
      size: 0,
      imgDialog: false,
      files: [],
      show: true,
      imgStatus: false,
      imgSrc: '',
      imgUrl: '',
      hint: '',//图片url提示语
      //------------
      //编辑器
      preIndex: 0,//各个dialog事件点击弹出窗口时，当前光标位置
      editorDialog: false,
      quillContent: ``,
      editorOption: {
        placeholder: '请编写您的内容....',
        theme: 'snow',  // or 'bubble'
        modules: {
          imageResize: { //调整大小组件。
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          toolbar: {
            container: toolbarOptions,  // 工具栏
            handlers: {
              codeCard: this.showAlter,
              image: this.alterImage
            }
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
        },


      },
      quillEditorHeight: 300,
      fullEditorHeight: 300,
      //---------------------
      //隐藏框
      dialogWidth: document.body.clientWidth - (document.body.clientWidth / 5 * 4)
    }
  },

  methods: {

    // eslint-disable-next-line no-unused-vars
    onEditorReady(editor) { // 准备编辑器
      // console.log(editor)
    },
    // 失去焦点事件
    onEditorBlur() {
      document.documentElement.setAttribute('data-theme', 'blur');
    },
    // 获得焦点事件
    onEditorFocus() {
      document.documentElement.setAttribute('data-theme', 'focus');
    },
    onEditorChange() {
    }, // 内容改变事件
    /**
     * 自定义 工具按钮
     * */
    /* initButton() {
       let alterCardBtn = document.querySelector('.ql-alterCard');
       alterCardBtn.innerHTML = '<i  class="v-icon  mdi mdi-xml  " style="font-size: 16px;align-content: center"></i>';
     },*/
    showAlter() {
      let quill = this.$refs.myQuillEditor.quill;
      this.preIndex = quill.selection.savedRange.index;
      this.editorDialog = true;
    },
    cancelCode() {
      let quill = this.$refs.myQuillEditor.quill;
      quill.setSelection(this.preIndex)
      this.editorDialog = false;
    },
    saveCode() {
      //创建quill实例
      let quill = this.$refs.myQuillEditor.quill;
      //内容
      let text = this.$refs.codeEditValue.codeValue;
      //语言类型  如 js  java
      let lang = this.$refs.codeEditValue.selectLang;
      if (lang === 'html') {
        text = '<!-- ' + lang + '   --> ' + "\n" + text
      } else if (lang === 'shell') {
        text = "#!/bin.bash\n" + '#' + lang + "\n" + text
      } else {
        text = '/**' + lang + "*/" + "\n" + text
      }
      this.editorDialog = false;
      // eslint-disable-next-line no-unused-vars
      // const index = quill.getSelection().index;
      //获得焦点光标位置
      let index = quill.selection.savedRange.index;
      //如果没有位置 获取当前数据最后一行
      let index2;
      if (this.quillContent.length !== 0) {
        this.quillContent += "\n";
      }
      index2 = this.quillContent.length

      //   console.log(index)
      //   let delta=new Delta();
      //   delta.insert(`${text}`,{
      //   "code-block":"true"
      // })
      // delta.ops.push({"insert":text,"attribute":{"code-block":true}})
      // console.log("delta:"+JSON.stringify(delta))
      quill.insertText(index,"\n")
      text+="\n"
      quill.insertText(index+1 ? index+1 : index2, text , {
        "code-block": "true"
      })
      // quill.formatText(index,text.length,'code-block','true')

      quill.setSelection(index+1 + text.length);
      // quill.setContents(delta);
      this.$refs.codeEditValue.codeValue = "";
    },
    /***
     * 自定义上传url图片
     */
    //校验是不是图片url及是否有效
    is_img_url(imgUrl) {
      return new Promise(function (resolve, reject) {
        let ImgObj = new Image(); //判断图片是否存在
        ImgObj.src = imgUrl;
        ImgObj.onload = function (res) {
          this.files=ImgObj;
          resolve(res);
        }
        ImgObj.onerror = function (err) {
          reject(err)
        }
      })
    },
    inputImageUrl(imgUrl) {
      //先判断url是否为图片  是否有效
      this.is_img_url(imgUrl).then(()=>{
        this.imgSrc = imgUrl;
        this.show = false;
      }).catch(()=>{
        this.hint="请上传正确的图片url"
      })
      //

    },
    changeText() {
      this.hint = '';
    },
    /**
     * 上传图片
     * */
    //图片保存
    uploadFile(values) {
      this.files = values
    },
    //图片校验过滤
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }
      newFile.blob = '';
      let URL = (window.URL || window.webkitURL);
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
      this.imgSrc = newFile.blob;
      this.show = false

    },
    //图片保存后端
    saveImage(){
      //获取图片
     let img= this.files[0];
     console.log(img)
     /**
      * axios调用后端   todo 这里先用blob代替
      * */
      //插入quill图片
      let quill=this.$refs.myQuillEditor.quill;
      //获得焦点光标位置
      let index = quill.selection.savedRange.index;
      quill.insertEmbed(index,'image',"https://www.islery.com/upload/hm1.webp");
      quill.setSelection(index+1);
      console.log(this.quillContent)
      this.imgDialog = false;
      this.imgUrl = '';
      this.imgSrc = '';
      this.show = true

    },
    //图片上传相关
    alterImage() {
      let quill = this.$refs.myQuillEditor.quill;
      this.preIndex = quill.selection.savedRange.index;
      this.imgDialog = true;
    },
    cancelImage() {
      let quill = this.$refs.myQuillEditor.quill;
      quill.setSelection(this.preIndex)
      this.imgDialog = false;
      this.imgUrl = '';
      this.imgSrc = '';
      this.show = true
    },

  },
  created() {
    this.quillEditorHeight = document.body.clientHeight - (document.body.clientHeight / 2)
    this.fullEditorHeight = this.quillEditorHeight + 100;
  },
  mounted() {
    // this.initButton()
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor;
    },

  }
}
</script>
<style lang="scss">
@import "../style/mixin";
@import '../style/font';

.edit_container {
  line-height: 24px;
  background-size: auto 30%;
  @include ed-bg_image($background-image-focus);
  //background-image: url("https://www.islery.com/upload/hm1.webp");
  background-position: right bottom;
}

.ql-toolbar {
  white-space: normal;
}

::v-deep {
  .editor_wrap .editor img {
    max-width: 720px;
    margin: 10px;
  }

  .editor_wrap .editor .ql-bubble .ql-editor a {
    color: #136ec2;
  }

  .editor_wrap .avatar-uploader {
    display: none;
  }

  .editor_wrap .editor {
    line-height: normal !important;
    height: 270px;
    margin-bottom: 60px;
  }
}


.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip .ql-editing .ql-action::after {
  border-right: 0;
  content: '保存';
  padding-right: 0;
}

</style>