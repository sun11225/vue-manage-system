<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <!--				<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
                <!--					<el-option key="1" label="广东省" value="广东省"></el-option>-->
                <!--					<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                <!--				</el-select>-->
                <el-input v-model="query.username" placeholder="用户ID" class="handle-input mr10"></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
<!--                <el-button type="primary" :icon="Plus" @click="clickAddUser">新增</el-button>-->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-username="table-header">
                <el-table-column prop="userId" label="用户ID" width="100" align="center"></el-table-column>
                <el-table-column prop="optometryPersonalName" label="验光者姓名"></el-table-column>
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
                <el-table-column prop="optometryDoctor" label="验光医生"></el-table-column>
                <!--				<el-table-column label="状态" align="center">-->
                <!--					<template #default="scope">-->
                <!--						<el-tag-->
                <!--							:type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''"-->
                <!--						>-->
                <!--							{{ scope.row.state }}-->
                <!--						</el-tag>-->
                <!--					</template>-->
                <!--				</el-table-column>-->

                <el-table-column prop="optometrySourceName" label="验光来源单位"></el-table-column>
                <el-table-column prop="optometryTime" label="验光时间"></el-table-column>
                <el-table-column label="验光单" width="286" align="center">
                    <template #default="scope">
                        <el-button text :icon="Search" @click="queryOptometryData(scope.$index, scope.row)">
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>
            <div class="pagination">
                <el-pagination
                        layout="total, prev, pager, next"
                        :current-page="query.curPage"
                        :page-size="query.pageSize"
                        :total="query.totalCount"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <el-dialog title="验光单详情" v-model="optometryDetailVisible" width="70%">
            <el-form label-width="140px" :inline="true"  :label-position="left" :rules="rules" :model="optometryData" ref="ruleFormRef">
                <el-form-item label="验光者姓名" prop="optometryPersonalName">
                    <el-input v-model="optometryData.optometryPersonalName"></el-input>
                </el-form-item>
                <el-form-item label="验光医生" prop="mark">
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
            </el-form>
<!--            <template #footer>-->
<!--				<span class="dialog-footer">-->
<!--					<el-button @click="resetForm(ruleFormRef)">取 消</el-button>-->
<!--					<el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>-->
<!--				</span>-->
<!--            </template>-->
        </el-dialog>


    </div>
</template>

<script setup lang="ts" username="basetable">
    import { ref, reactive,onMounted } from 'vue';
    import { ElMessage, ElMessageBox } from 'element-plus';
    import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
    import { apiService } from '../api/apiService';
    import { apiUrls } from '../api/apiUrls';
    import { useRouter,useRoute  } from 'vue-router';
    import { FormInstance, FormRules } from 'element-plus';



    const router = useRouter();
    const route = useRoute();
    const userId = ref<string>();
    const addOptometryVisible = ref(false);


    interface TableItem {
        id: string,
        addd: string,
        axisL: string,
        axisR: string,
        cylinderL: string,
        cylinderR: string,
        distanceL: string,
        distanceR: string,
        isDefault: boolean,
        mark: string,
        optometryDoctor: string,
        optometryPersonalName: string,
        optometrySourceName: string,
        optometryTime: string,
        optometryType: number,
        pd: string,
        sphereL: string,
        sphereR: string,
        userId: number,
        vd: string,
        visionL: string,
        visionR: string,
        createTime: string,
    }

    let query = reactive({
        curPage: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
    });
    let tableData = ref<TableItem[]>([]);
    let optometryData = ref<TableItem>();
    let optometryDetailVisible = ref<boolean>(false);

    onMounted(() => {
        if (route.query.id) {
            console.log('Sun >>> id === ' + route.query.id);
            userId.value = route.query.id as string;
            const data = {
                userId: userId.value,
                curPage: query.curPage,
                pageSize: query.pageSize,
            };
            apiService.fetchPostData(apiUrls.queryOptometry,data).then((res) => {
                if (res.code != 200){
                    return
                }
                ElMessage.success('查询验光单成功');
                tableData.value = res.data;
                query.curPage = res.pageInfo.curPage;
                query.pageSize = res.pageInfo.pageSize;
                query.totalCount = res.pageInfo.totalCount;
                query.totalPage =  res.pageInfo.totalPage;
                console.log('Sun >>> === ' + JSON.stringify(query))

            })
        }

    });

    // 获取表格数据
    const getData = () => {
        const data = {
            userId: userId.value,
            curPage: query.curPage,
            pageSize: query.pageSize,
        };
        apiService.fetchPostData(apiUrls.queryOptometry,data).then((res) => {
            if (res.code != 200){
                return
            }
            ElMessage.success('查询验光单成功');
            tableData.value = res.data.data;
            query.curPage = res.pageInfo.curPage;
            query.pageSize = res.pageInfo.pageSize;
            query.totalCount = res.pageInfo.totalCount;
            query.totalPage =  res.pageInfo.totalPage;
        })
    };

    //查询验光单
    const queryOptometryData = (index: number, row: any) => {
        const data = {
            optometryId: row.id
        };
        console.log('sUN >>> optometryId: row.id === ' + row.id);
        apiService.fetchPostData(apiUrls.getOptometryDetails,data).then((res) => {
            if (res.code != 200){
                return
            }
            optometryData.value = res.data;
            optometryDetailVisible.value = true;
        });

    };
    // 分页导航
    const handlePageChange = (val: number) => {
        query.curPage = val;
        getData();
    };

    // 查询操作
    const handleSearch = () => {
        query.curPage = 1;
        getData();
    };

    const closeForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        optometryDetailVisible.value = false;
    };

    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        optometryDetailVisible.value = false;
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
