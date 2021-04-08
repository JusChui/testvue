<template>
  <div style="margin-top: 10px">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formInline.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名">
        <el-input v-model="formInline.name" placeholder="请输入学生姓名"></el-input>
      </el-form-item>
      <!--      <el-form-item label="活动区域">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>-->
      <el-form-item>
        <el-button type="info" @click="onReset()">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
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
        <!--        <span class="demonstration">完整功能</span>-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=formInline.currentPage
          :page-sizes="[1, 5, 10, 20, 50]"
          :page-size=formInline.pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=formInline.total>
        </el-pagination>
      </div>
      <!--      <div style="margin-top: 20px">
              <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
              <el-button @click="toggleSelection()">取消选择</el-button>
            </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "ListStudent",
  data() {
    return {
      formInline: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
        username: '',
        email: '',
        name: ''
      },
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    onSubmit() {
      let params = this.formInline
      params.status = 1
      console.log(params)
      this.$axios.post('/user/getStudents', params,
        {headers: {'Authorization': sessionStorage.getItem('token')}})
        .then((response) => {
          // console.log(response)
          if (response.status === 200) {
            if (response.data.rtCode === 200) {
              this.tableData = response.data.data
              this.formInline.total = response.data.bean.total
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
    onReset() {
      this.formInline.username = ''
      this.formInline.email = ''
    },
    /*toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },*/
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val
      this.onSubmit()
    },
    handleCurrentChange(val) {
      this.formInline.currentPage = val
      this.onSubmit()
    }
  }
}
</script>

<style>
.el-form--inline .el-form-item__label {
  float: left;
}

.el-divider--horizontal {
  height: 2px;
  margin: 10px;
}

.el-table--fit {
  width: 80%;
  margin-left: 10%;
}

.block {
  text-align: right;
  margin-right: 10%;
}
</style>
