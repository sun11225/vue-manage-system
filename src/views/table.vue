<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
					<el-option key="1" label="广东省" value="广东省"></el-option>
					<el-option key="2" label="湖南省" value="湖南省"></el-option>
				</el-select>
				<el-input v-model="query.username" placeholder="用户名" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="clickAddUser">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-username="table-header">
				<el-table-column prop="id" label="会员ID" width="100" align="center"></el-table-column>
				<el-table-column prop="username" label="用户名"></el-table-column>
				<el-table-column prop="mobile" label="手机号"></el-table-column>
<!--				<el-table-column label="头像(查看大图)" align="center">-->
<!--					<template #default="scope">-->
<!--						<el-image-->
<!--							class="table-td-thumb"-->
<!--							:src="scope.row.thumb"-->
<!--							:z-index="10"-->
<!--							:preview-src-list="[scope.row.thumb]"-->
<!--							preview-teleported-->
<!--						>-->
<!--						</el-image>-->
<!--					</template>-->
<!--				</el-table-column>-->
				<el-table-column prop="address" label="地址"></el-table-column>
<!--				<el-table-column label="状态" align="center">-->
<!--					<template #default="scope">-->
<!--						<el-tag-->
<!--							:type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''"-->
<!--						>-->
<!--							{{ scope.row.state }}-->
<!--						</el-tag>-->
<!--					</template>-->
<!--				</el-table-column>-->

				<el-table-column prop="grade" label="会员等级"></el-table-column>
				<el-table-column label="验光单" width="286" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog title="新增" v-model="addUserVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="data.username"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="data.address"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addUserVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

	</div>
</template>

<script setup lang="ts" username="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { apiService } from '../api/apiService';
import { apiUrls } from '../api/apiUrls';

interface TableItem {
	id: number;
	username: string;
	mobile: string;
	address: string;
	//会员等级
	grade: string,
	//验光ID
	lastOptometryId: number,
	state: string;
	date: string;
}

interface PageInfo {
	curPage: number,
	pageSize: number,
	totalCount: number,
	totalPage: number
}

const data = reactive({
	username: "1",
	address: "2"
});
const query = reactive({
	address: '',
	username: '',
	pageIndex: 1,
	pageSize: 10
});
let tableData = ref<TableItem[]>([]);
 tableData.value = [
	{
	    "id": 1,
        "username": "sunhao",
        "mobile": "18279292755",
        "address": "深圳市宝安区",
        //会员等级
        "grade": "1",
		//验光ID
		"lastOptometryId": 1,
		"state": "1",
        "date": "1",
},
	{
		"id": 2,
		"username": "sunhao",
		"mobile": "18279292755",
		"address": "深圳市宝安区",
		//会员等级
		"grade": "1",
		//验光ID
		"lastOptometryId": 1,
		"state": "1",
		"date": "1",
	},
	{
		"id": 3,
		"username": "sunhao",
		"mobile": "18279292755",
		"address": "深圳市宝安区",
		//会员等级
		"grade": "1",
		//验光ID
		"lastOptometryId": 1,
		"state": "1",
		"date": "1",
	}];
const pageInfo: any = ref<PageInfo>();
// 获取表格数据
const getData = () => {
	// const data = {
	// 	"curPage": pageInfo.value.curPage,
	// 	"mobile": "",
	// 	"pageSize": pageInfo.value.pageSize,
	// };
	// apiService.fetchPostData(apiUrls.getUserList,data).then(res => {
	// 	tableData.value = res.data.list;
	// 	pageInfo.value = res.data.pageInfo;
	// });
};
getData();

// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};

// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
const addUserVisible = ref(false);
let form = reactive({
	username: '',
	address: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.username = row.username;
	form.address = row.address;
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].username = form.username;
	tableData.value[idx].address = form.address;
};

const clickAddUser = () => {
	addUserVisible.value = true
};
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.red {
	color: #F56C6C;
}
.mr10 {
	margin-right: 10px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
