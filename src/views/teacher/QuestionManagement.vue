<template>
  <div>
    <el-row style="margin-bottom: 7px;width: 90%;">
      <div style="float: right">
        <el-button type="info" v-on:click="deleteQuestion">删除</el-button>
        <el-button type="info" v-on:click="uploadQuestion">导入</el-button>
        <el-button type="info" v-on:click="downloadQuestion">导出</el-button>
      </div>
    </el-row>
    <el-dialog
      title="从文件导入"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div style="margin-bottom: 5px">
        <el-link :underline="false" type="primary" v-on:click="downloadTemplate">点击此处下载批量导入模板文件</el-link>
      </div>
      <el-upload
        class="upload-demo"
        drag
        ref="upload"
        action
        multiple="multiple"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :on-change="fileChange"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitFile">确 定</el-button>
  </span>
    </el-dialog>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      style="width: 80%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="45">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand"
                   v-for="(index,item) in props.row.choices"
                   :key="item">
            <el-form-item>
              <span :slot="label" class="el-form-item__label">{{ index.choiceName }}</span>
              <span>{{ index.choice }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="题目ID"
        prop="id"
        width="95">
      </el-table-column>
      <el-table-column
        label="题目内容"
        prop="content">
      </el-table-column>
      <el-table-column
        label="题目分值"
        prop="score"
        width="95">
      </el-table-column>
      <el-table-column
        label="录入时间"
        prop="creatTime"
        width="152">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page=currentPage
        :page-sizes="[5, 10, 20, 50]"
        :page-size=pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=total>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionManagement",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
    deleteQuestion() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          message: '请至少选择一道题目删除',
          type: 'warning'
        })
        return false
      }
      let params = {params: this.multipleSelection}
      this.$axios.post('/question/deleteQuestions', params,
        {headers: {'Authorization': sessionStorage.getItem('token')}})
        .then((response) => {
          if (response.data.rtCode === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getQuestions()
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        }).catch((error) => {
        console.log(error)
      })
    },
    downloadTemplate() {
      this.$axios.get('/question/getTemplate',
        {headers: {'Authorization': sessionStorage.getItem('token')}})
        .then((response) => {
          console.log(response)
          if (response.data.rtCode === 200) {
            this.$message({
              message: response.data.rtMsg,
              type: 'success'
            })
            this.dialogVisible = false
          } else {
            this.$message({
              message: '模板文件下载失败',
              type: 'error'
            })
          }
        }).catch((error) => {
        console.log(error)
      })
    },
    submitFile() {
      if (this.fileList.length < 1) {
        this.$message({
          message: '未选取上传模板',
          type: 'error'
        });
        return;
      }
      let formData = new FormData();
      this.fileList.forEach(function (file) {
        formData.append("file", file.raw, file.name);
      });
      this.$axios.post('/question/uploadQuestions', formData, {
        headers: {
          'Authorization': sessionStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        if (response.data.rtCode === 200) {
          this.$message({
            message: "导入成功",
            type: 'success'
          })
          this.getQuestions()
          this.dialogVisible = false
        } else {
          this.$message({
            message: "导入失败",
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    uploadQuestion() {
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log("handleRemove", file, fileList);
      this.fileList = fileList
    },
    handlePreview(file) {
      console.log("handlePreview", file);
    },
    beforeUpload(file) {
      console.log("before Upload", file)
    },
    beforeRemove(file, fileList) {
      console.log("beforeRemove", file, fileList);
    },
    fileChange(file, fileList) {
      console.log("fileChange", file, fileList);
      this.fileList = fileList
    },
    handleClose(done) {
      // 关闭对话框提示
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    downloadQuestion() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          message: '请至少选择一道题目进行导出',
          type: 'warning'
        })
        return false
      }
      let params = {params: this.multipleSelection}
      this.$axios.post('/question/downloadQuestions', params,
        {headers: {'Authorization': sessionStorage.getItem('token')}})
        .then((response) => {
          console.log(response)
          if (response.data.rtCode === 200) {
            this.$message({
              message: response.data.rtMsg,
              type: 'success'
            })
          } else {
            this.$message({
              message: response.data.rtMsg,
              type: 'error'
            })
          }
        }).catch((error) => {
        console.log(error)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getQuestions()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getQuestions()
    },
    getQuestions(params) {
      params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      this.$axios.post('/question/getQuestions', params,
        {headers: {'Authorization': sessionStorage.getItem('token')}})
        .then((response) => {
          // console.log(response)
          if (response.status === 200) {
            if (response.data.rtCode === 200) {
              this.tableData = response.data.data
              this.total = response.data.bean.total
              this.$message({
                message: response.data.rtMsg,
                type: 'success'
              })
            } else {
              this.$message({
                message: response.data.rtMsg,
                type: 'warning'
              })
            }
          }
        }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getQuestions()
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
