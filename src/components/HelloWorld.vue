<template>
  <el-container>
    <el-header>基于web的作业管理平台</el-header>
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
        <el-row style="line-height: 0;height: auto;float: left;padding: 0.5%;background: #C0C4CC;" v-show="includeTag">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="closeTag(tag)">
            {{ tag }}
          </el-tag>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      includeTag: true
    }
  },
  methods: {
    closeTag(tag) {
      // 关闭标签
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      if (this.dynamicTags.length <= 0) {
        this.includeTag = false
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.inputValue = keyPath[1]
      this.handleInputConfirm()
    },
    handleInputConfirm() {
      //增加新标签
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        this.includeTag = true
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  margin: 0;
}

.el-tag + .el-tag {
  margin-left: 10px;
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

.el-header {
  font-size: xxx-large;
  font-family: cursive;
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

/*body > .el-container {
  margin-bottom: 40px;
}*/

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
