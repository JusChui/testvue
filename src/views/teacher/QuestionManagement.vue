<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 80%"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="handleMouseHover">
      <el-table-column
        type="selection"
        width="45">
      </el-table-column>
      <el-table-column
        label="题目"
        prop="address"
        width="200"
        show-overflow-tooltip="show-overflow-tooltip">
      </el-table-column>
      <el-table-column
        prop="name"
        label="选项"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
    </el-table>
    <div class="block">
      <!--        <span class="demonstration">完整功能</span>-->
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
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },

  methods: {
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
    },
    handleMouseHover(row, column, cell, event) {
      console.log(cell.innerText)
      console.log(event)
    }
  }
}
</script>

<style scoped>

</style>
