<template>
  <div>
    <el-row style="margin-bottom: 7px;width: 90%;">
      <!--      <el-button>默认按钮</el-button>-->
      <div style="float: right">
        <el-button type="info" v-on:click="uploadQuestion">导入</el-button>
        <el-button type="info" v-on:click="downloadQuestion">导出</el-button>
      </div>
    </el-row>
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
      total: 0
    }
  },
  methods: {
    uploadQuestion() {
      this.$prompt('请选择数据文件', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'file',
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
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
          // console.log(response)
          if (response.status === 200) {

          } else {

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
    },
    handleCurrentChange(val) {
      this.currentPage = val
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
