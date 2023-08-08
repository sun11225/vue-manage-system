<template>
	<div>
		<div class="container">
			<div class="handle-box">
<!--				<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
<!--					<el-option key="1" label="广东省" value="广东省"></el-option>-->
<!--					<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
<!--				</el-select>-->
				<el-input v-model="mobilePhone" placeholder="请输入手机号" class="handle-input mr10" maxlength ="11"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" @click="handleReset">重置</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-username="table-header">
				<el-table-column prop="id" label="会员ID" width="120" align="center"></el-table-column>
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
						<el-button text :icon="Edit" @click="addOptometryData">
							新增
						</el-button>
<!--						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">-->
<!--							编辑-->
<!--						</el-button>-->
						<el-button text :icon="Search" @click="queryOptometryData(scope.$index, scope.row)">
							查询
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.curPage"
					:page-size="query.pageSize"
					:total="query.totalCount"
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

		<!-- 新增验光单 -->
		<el-dialog title="新增验光单" v-model="addOptometryVisible" width="70%">
			<el-form label-width="140px" :inline="true"  :label-position="left" :rules="rules" :model="optometryData" ref="ruleFormRef">
				<el-form-item label="验光者姓名" prop="optometryPersonalName">
					<el-input v-model="optometryData.optometryPersonalName"></el-input>
				</el-form-item>
				<el-form-item label="验光医生" prop="optometryDoctor">
					<el-input v-model="optometryData.optometryDoctor"></el-input>
				</el-form-item>
				<el-form-item label="验光来源单位名称" prop="optometrySourceName">
					<el-input v-model="optometryData.optometrySourceName"></el-input>
				</el-form-item>
				<el-form-item label="验光时间" prop="optometryTime">
					<el-input v-model="optometryData.optometryTime"></el-input>
				</el-form-item>
                <el-form-item label="用户编号" prop="userId">
                    <el-input v-model="optometryData.userId"></el-input>
                </el-form-item>
				<el-form-item label="近加光ADD" prop="addd">
					<el-input v-model="optometryData.addd"></el-input>
				</el-form-item>
				<el-form-item label="验光单类型" prop="optometryType">
					<el-select v-model="optometryData.optometryType" class="m-2" placeholder="Select">
						<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="左眼轴位" prop="axisL">
					<el-input v-model="optometryData.axisL"></el-input>
				</el-form-item>
				<el-form-item label="右眼轴位" prop="axisR">
					<el-input v-model="optometryData.axisR"></el-input>
				</el-form-item>
				<el-form-item label="左眼散光度数" prop="cylinderL">
					<el-input v-model="optometryData.cylinderL"></el-input>
				</el-form-item>
				<el-form-item label="右眼散光度数" prop="cylinderR">
					<el-input v-model="optometryData.cylinderR"></el-input>
				</el-form-item>
				<el-form-item label="左眼矫正视力" prop="distanceL">
					<el-input v-model="optometryData.distanceL"></el-input>
				</el-form-item>
				<el-form-item label="右眼矫正视力" prop="distanceR">
					<el-input v-model="optometryData.distanceR"></el-input>
				</el-form-item>
				<el-form-item label="双眼瞳距" prop="pd">
					<el-input v-model="optometryData.pd"></el-input>
				</el-form-item>
				<el-form-item label="瞳高" prop="vd">
					<el-input v-model="optometryData.vd"></el-input>
				</el-form-item>
				<el-form-item label="左眼度数" prop="sphereL">
					<el-input v-model="optometryData.sphereL"></el-input>
				</el-form-item>
				<el-form-item label="右眼度数" prop="sphereR">
					<el-input v-model="optometryData.sphereR"></el-input>
				</el-form-item>
				<el-form-item label="左眼视力" prop="visionL">
					<el-input v-model="optometryData.visionL"></el-input>
				</el-form-item>
				<el-form-item label="右眼视力" prop="visionR">
					<el-input v-model="optometryData.visionR"></el-input>
				</el-form-item>
                <el-form-item label="说明" prop="mark">
                    <el-input v-model="optometryData.mark"></el-input>
                </el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="resetForm(ruleFormRef)">取 消</el-button>
					<el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
				</span>
			</template>
		</el-dialog>

	</div>
</template>

<script setup lang="ts" username="basetable">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { apiService } from '../api/apiService';
import { apiUrls } from '../api/apiUrls';
import { useRouter  } from 'vue-router';
import { FormInstance, FormRules } from 'element-plus';


const router = useRouter();

const options = [
	{
		value: '1',
		label: '框架眼镜验光单',
	},
	{
		value: '2',
		label: '隐形眼镜验光单',
	},
];

const ruleFormRef = ref<FormInstance>();
const rules: FormRules = {
	addd: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	axisL: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	axisR: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	cylinderL: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	cylinderR: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	distanceL: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	distanceR: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	mark: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	optometryDoctor: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	optometryPersonalName: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	optometrySourceName: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	optometryTime: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	optometryType: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	pd: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	sphereL: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	sphereR: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	userId: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	vd: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	visionL: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
	visionR: [
		{
			required: true,
			message: '请填写数据',
			trigger: 'blur'
		}
	],
};

interface TableItem {
	email: string,
	headPortraitUrl: string,
	id: string;
	//验光ID
	lastOptometryId: number,
	mobile: string;
	username: string;
	nickname: string,
	address: string;
	//会员等级
	grade: string,
	state: string;
	date: string;
}

const optometryData = reactive({
	addd: "",
	axisL: "",
	axisR: "",
	cylinderL: "",
	cylinderR: "",
	distanceL: "",
	distanceR: "",
	mark: "",
	optometryDoctor: "",
	optometryPersonalName: "",
	optometrySourceName: "",
	optometryTime: "",
	optometryType: "",
	pd: "",
	sphereL: "",
	sphereR: "",
	userId: "",
	vd: "",
	visionL: "",
	visionR: ""
});

const mobilePhone = ref();
let query = reactive({
	curPage: 1,
	pageSize: 10,
	totalCount: 0,
	totalPage: 0,
});
let tableData = ref<TableItem[]>([]);

// 获取表格数据
const getData = () => {
	const data = {
		curPage: query.curPage,
		pageSize: query.pageSize,
	};
	apiService.fetchPostData(apiUrls.getUserList,data).then(res => {
		tableData.value = res.data;
		query.curPage = res.pageInfo.curPage;
		query.pageSize = res.pageInfo.pageSize;
		query.totalCount = res.pageInfo.totalCount;
		query.totalPage =  res.pageInfo.totalPage;
	});
};

   onMounted(() => {
      getData();
   });

const getVipUserInfo = () => {
	const data = {
		mobile: mobilePhone.value,
		curPage: query.curPage,
		pageSize: query.pageSize,
	};
	apiService.fetchPostData(apiUrls.getUserList,data).then(res => {
		tableData.value = res.data;
		query.curPage = res.pageInfo.curPage;
		query.pageSize = res.pageInfo.pageSize;
		query.totalCount = res.pageInfo.totalCount;
		query.totalPage =  res.pageInfo.totalPage;
	});
};

//重置
const handleReset = () => {
	query.curPage = 1;
	getData()
};

// 查询操作
const handleSearch = () => {
	query.curPage = 1;
	getVipUserInfo();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.curPage = val;
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

//新增验光单
const addOptometryData = () => {
   addOptometryVisible.value = true;
};

//查询验光单
const queryOptometryData = (index: number, row: any) => {
	router.push({ path: '/optometry', query: { id: row.id } })
};

//保存验光单
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			apiService.fetchPostData(apiUrls.addOptometry,optometryData).then((res) => {
				if(res.code != 200){
					return
				}
				ElMessage.success('新增验光单成功');
				formEl.resetFields();
				addOptometryVisible.value = false

			})
		} else {
			console.log('error submit!', fields)
		}
	})
};

//重置
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	addOptometryVisible.value = false;
	formEl.resetFields()
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
const addOptometryVisible = ref(false);
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
