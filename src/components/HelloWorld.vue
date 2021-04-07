<template>
  <el-container>
    <el-header style="width: 100%">
      <span class="title" style="width: 85%">基于web的作业管理平台</span>
      <div style="width: 15%;float: right" v-show="!isLogin">
        <el-link type="primary" :underline="false" @click="toLoginPage">登录</el-link>&nbsp;&nbsp;
        <el-link type="primary" :underline="false" @click="toRegisterPage">注册</el-link>
      </div>
      <div style="width: 18%;float: right" v-show="isLogin">
        <i class="el-icon-user-solid">{{ usr.name }}{{ usr.status }}</i>
        <el-button icon="el-icon-remove" style="background-color: #B3C0D1;border: none;" @click="loginOut">注销
        </el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--Aside-->
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              unique-opened="unique-opened"
              @open="handleOpen"
              @close="handleClose"
              @select="handleSelect">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="选项1-1">选项1-1</el-menu-item>
                  <el-menu-item index="选项1-2">选项1-2</el-menu-item>
                  <el-menu-item index="选项1-3">选项1-3</el-menu-item>
                  <el-menu-item index="选项1-4">选项1-4</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>导航二</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">选项2-1</el-menu-item>
                  <el-menu-item index="2-2">选项2-2</el-menu-item>
                  <el-menu-item index="2-3">选项2-3</el-menu-item>
                  <el-menu-item index="2-4">选项2-4</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>导航三</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">选项3-1</el-menu-item>
                  <el-menu-item index="3-2">选项3-2</el-menu-item>
                  <el-menu-item index="3-3">选项3-3</el-menu-item>
                  <el-menu-item index="3-4">选项3-4</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">选项4-1</el-menu-item>
                  <el-menu-item index="4-2">选项4-2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <el-row style="line-height: 0;height: auto;float: left;padding: 0.5%;background: #C0C4CC;width: 100%"
                v-show="includeTag">
          <el-tag
            :key="tag.name"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="closeTag(tag)"
            @click="clickTag(tag)"
            :type="tag.type"
            effect="dark">
            {{ tag.name }}
          </el-tag>
        </el-row>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  inject: ['reload'],
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      includeTag: true,
      isLogin: sessionStorage.getItem('token') === null ? false : true,
      usr: {
        name: '',
        status: ''
      }
    }
  },
  methods: {
    clickTag(tag) {
      //点击标签事件
      // console.log(tag)
      let index = this.dynamicTags.indexOf(tag)
      for (let i = 0; i < this.dynamicTags.length; i++) {
        this.dynamicTags[i].type = 'info'
      }
      this.dynamicTags[index].type = ''
    },
    closeTag(tag) {
      // 关闭标签
      let index = this.dynamicTags.indexOf(tag)
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      if (this.dynamicTags.length <= 0) {
        this.includeTag = false
      }
      if (this.isIncludeActive() === false && this.dynamicTags.length > 0) {
        this.dynamicTags[index - 1].type = ''
      }
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.inputValue = keyPath[1]
      this.handleInputConfirm()
      this.$router.push({path: '/test'})
    },
    handleInputConfirm() {
      //增加新标签
      let inputValue = this.inputValue;
      let tagNames = []
      for (let i = 0; i < this.dynamicTags.length; i++) {
        tagNames.push(this.dynamicTags[i].name)
      }
      //保持标签唯一
      if (tagNames.indexOf(inputValue) < 0) {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          this.dynamicTags[i].type = 'info'
        }
        this.dynamicTags.push({name: inputValue, type: ''});
        this.includeTag = true
      } else {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].name === inputValue) {
            this.dynamicTags[i].type = ''
          } else {
            this.dynamicTags[i].type = 'info'
          }
        }
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    isIncludeActive() {
      //检查是否有激活状态的标签
      if (this.dynamicTags.length > 0) {
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].type === '') {
            return true;
          }
        }
      }
      return false;
    },
    toLoginPage() {
      //跳转登录页面
      this.$router.push({path: '/login'})
    },
    toRegisterPage() {
      //跳转注册页面
      this.$router.push({path: '/register'})
    },
    updateMessage: async function () {
      this.isLogin = false
      this.usr.name = ''
      this.usr.status = ''
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('usr')
      // console.log(this.isLogin)
      await this.$nextTick()
      console.log(this.$data) // => '已更新'
    },
    loginOut() {
      let that = this
      this.$axios.get('/logout', {headers: {'Authorization': sessionStorage.getItem('token')}})
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            if (response.data.rtCode === 200) {
              that.$message({
                message: '退出成功',
                type: 'success'
              });
              this.updateMessage()
            } else {
              that.$message({
                message: response.data.rtMsg,
                type: 'warning'
              })
            }
          }
        }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted() {
    if (this.dynamicTags.length <= 0) {
      this.includeTag = false
    }
    let usr = JSON.parse(sessionStorage.getItem('usr'))
    if (usr != undefined && usr != '' && usr != null) {
      this.usr.name = usr.username
      if (usr.status === 0) {
        this.usr.status = '老师'
      } else if (usr.status === 1) {
        this.usr.status = '同学'
      } else {
        this.usr.status = ''
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  margin: 0;
}

.el-tag {
  float: left;
}

.el-tag + .el-tag {
  margin-left: 1px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-menu {
  background-color: #D3DCE6;
}

.el-col-12 {
  width: 100%;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: left;
  line-height: 80px;
  height: 80px !important;
}

.title {
  font-size: xxx-large;
  font-family: cursive;
}

.el-header {
  padding-left: 40px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  /*line-height: 200px;*/
  width: 18%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
