<template>
  <div>
    <el-row style="margin-bottom: 7px;width: 90%;">
      <!--      <el-button>默认按钮</el-button>-->
      <el-button type="info" style="float: right" v-on:click="removeFormMyStudent">移出我的学生</el-button>
    </el-row>
    <!--  查询结果  -->
    <div style="text-align: center">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 80%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="学号"
          width="120">
          <template slot-scope="scope">{{ scope.row.id_number }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="学生姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱账号"
          show-overflow-tooltip>
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
  </div>
</template>

<script>
export default {
  name: "ManageMyStudent",
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
    listMyStudent() {
      let usr = JSON.parse(sessionStorage.getItem('usr'))
      let params = {
        status: '1', tid: usr.id, currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      this.$axios.post('/user/getStudents', params,
        {headers: {'Authorization': sessionStorage.getItem('token')}})
        .then((response) => {
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
    },
    removeFormMyStudent() {
      if (this.multipleSelection === null || this.multipleSelection.length <= 0) {
        this.$message({
          message: '请至少选择一个选择要移出的学生',
          type: 'warning'
        })
        return false;
      }
      let usr = JSON.parse(sessionStorage.getItem('usr'))
      let params = {
        status: '1', tid: usr.id, sid: this.multipleSelection
      }
      this.$axios.post('/user/removeStudent', params,
        {headers: {'Authorization': sessionStorage.getItem('token')}})
        .then((response) => {
          if (response.status === 200) {
            if (response.data.rtCode === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.listMyStudent()
            } else {
              this.$message({
                message: '操作失败:' + response.data.rtMsg,
                type: 'error'
              })
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.listMyStudent()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.listMyStudent()
    }
  },
  mounted() {
    this.listMyStudent()
  }
}
</script>

<style scoped>

</style>
