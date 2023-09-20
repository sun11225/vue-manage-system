<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <!--				<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
                <!--					<el-option key="1" label="广东省" value="广东省"></el-option>-->
                <!--					<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                <!--				</el-select>-->
                <el-input v-model="mobilePhone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" :icon="Plus" @click="addOptometryData">新增</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      header-cell-class-username="table-header">
                <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
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
                <el-table-column label="验光单" width="243" align="center">
                    <template #default="scope">
                        <el-button-group class="ml-4">
                            <el-button text type="primary" :icon="Edit"
                                       @click="optometryDataDetails(scope.$index, scope.row)">
                                详情
                            </el-button>
                            <el-button text type="primary" :icon="Edit"
                                       @click="editOptometryData(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-button text type="danger" :icon="Delete" @click="handleDelete(scope.$index, scope.row)">
                            </el-button>
                        </el-button-group>
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

        <el-dialog title="编辑验光单" v-model="editOptometryDetailVisible" :show-close="false" width="70%">
            <el-form label-width="140px" :inline="true" :rules="rules" :model="optometryUpdateData" ref="ruleFormRef">
                <el-form-item label="会员号码" prop="userId">
                    <el-input v-model="optometryUpdateData.userId"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="optometryPersonalName">
                    <el-input v-model="optometryUpdateData.optometryPersonalName"></el-input>
                </el-form-item>
                <el-form-item label="验光师" prop="optometryDoctor">
                    <el-input v-model="optometryUpdateData.optometryDoctor"></el-input>
                </el-form-item>
                <el-form-item label="验光门店" prop="optometrySourceName">
                    <el-input v-model="optometryUpdateData.optometrySourceName"></el-input>
                </el-form-item>
                <el-form-item label="验光时间" prop="optometryTime">
                    <el-input v-model="optometryUpdateData.optometryTime"></el-input>
                </el-form-item>
                <el-form-item label="验光单类型" prop="optometryType">
                    <el-select v-model="optometryTypeData" class="m-2" placeholder="Select">
                        <el-option
                                v-for="item in options"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="右眼轴位" prop="axisR">
                    <el-input v-model="optometryUpdateData.axisR"></el-input>
                </el-form-item>
                <el-form-item label="左眼轴位" prop="axisL">
                    <el-input v-model="optometryUpdateData.axisL"></el-input>
                </el-form-item>
                <el-form-item label="右眼散光度数" prop="cylinderR">
                    <el-input v-model="optometryUpdateData.cylinderR"></el-input>
                </el-form-item>
                <el-form-item label="左眼散光度数" prop="cylinderL">
                    <el-input v-model="optometryUpdateData.cylinderL"></el-input>
                </el-form-item>
                <el-form-item label="右眼矫正视力" prop="distanceR">
                    <el-input v-model="optometryUpdateData.distanceR"></el-input>
                </el-form-item>
                <el-form-item label="左眼矫正视力" prop="distanceL">
                    <el-input v-model="optometryUpdateData.distanceL"></el-input>
                </el-form-item>
                <el-form-item label="双眼瞳距" prop="pd">
                    <el-input v-model="optometryUpdateData.pd"></el-input>
                </el-form-item>
                <el-form-item label="近加光ADD" prop="addd">
                    <el-input v-model="optometryUpdateData.addd"></el-input>
                </el-form-item>
                <el-form-item label="右眼度数" prop="sphereR">
                    <el-input v-model="optometryUpdateData.sphereR"></el-input>
                </el-form-item>
                <el-form-item label="左眼度数" prop="sphereL">
                    <el-input v-model="optometryUpdateData.sphereL"></el-input>
                </el-form-item>
                <el-form-item label="右眼视力" prop="visionR">
                    <el-input v-model="optometryUpdateData.visionR"></el-input>
                </el-form-item>
                <el-form-item label="左眼视力" prop="visionL">
                    <el-input v-model="optometryUpdateData.visionL"></el-input>
                </el-form-item>
                <el-form-item label="瞳高" prop="vd">
                    <el-input v-model="optometryUpdateData.vd"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="mark">
                    <el-input v-model="optometryUpdateData.mark"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
				<span class="dialog-footer">
					<el-button @click="closeForm(ruleFormRef)">取 消</el-button>
					<el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
				</span>
            </template>
        </el-dialog>

        <el-dialog title="验光单详情" v-model="optometryDetailVisible" :fullscreen="false" :show-close="false" width="86%">
            <table style="margin-top: -12px">
                <tbody>
                <tr>
                    <td>会员号码</td>
                    <td>{{optometryUpdateData.userId}}</td>
                    <td>会员姓名</td>
                    <td>{{optometryUpdateData.optometryPersonalName}}</td>
                    <td colspan="4"></td>
                </tr>
                <tr>
                    <td>验光师</td>
                    <td>{{optometryUpdateData.optometryDoctor}}</td>
                    <td>验光门店</td>
                    <td>{{optometryUpdateData.optometrySourceName}}</td>
                    <td>验光时间</td>
                    <td>{{optometryUpdateData.optometryTime}}</td>
                    <td>验光单类型</td>
                    <td>{{optometryTypeData}}</td>
                </tr>
                <tr>
                    <td>右眼轴位</td>
                    <td>{{optometryUpdateData.axisR}}</td>
                    <td>左眼轴位</td>
                    <td>{{optometryUpdateData.axisL}}</td>
                    <td>右眼散光度数</td>
                    <td>{{optometryUpdateData.cylinderR}}</td>
                    <td>左眼散光度数</td>
                    <td>{{optometryUpdateData.cylinderL}}</td>
                </tr>
                <tr>
                    <td>右眼度数</td>
                    <td>{{optometryUpdateData.sphereR}}</td>
                    <td>左眼度数</td>
                    <td>{{optometryUpdateData.sphereL}}</td>
                    <td>右眼矫正视力</td>
                    <td>{{optometryUpdateData.distanceR}}</td>
                    <td>左眼矫正视力</td>
                    <td>{{optometryUpdateData.distanceL}}</td>
                </tr>
                <tr>

                    <td>近加光ADD:</td>
                    <td>{{optometryUpdateData.addd}}</td>
                    <td>双眼瞳距</td>
                    <td>{{optometryUpdateData.pd}}</td>
                    <td>右眼视力</td>
                    <td>{{optometryUpdateData.visionR}}</td>
                    <td>左眼视力</td>
                    <td>{{optometryUpdateData.visionL}}</td>
                </tr>
                <tr>
                    <td>右眼视力</td>
                    <td>{{optometryUpdateData.visionR}}</td>
                    <td>左眼视力</td>
                    <td>{{optometryUpdateData.visionL}}</td>
                    <td>瞳高</td>
                    <td>{{optometryUpdateData.vd}}</td>
                    <td colspan="2"></td>
                </tr>
                </tbody>
            </table>


        </el-dialog>

<!--         新增验光单 -->
        <el-dialog title="新增验光单" v-model="addOptometryVisible" :show-close="false" width="70%">
            <el-form label-width="140px" :inline="true" :rules="rules" :model="optometryData" ref="ruleFormRef">
                <el-form-item label="会员号码" prop="userId">
                    <el-input v-model="optometryData.userId"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="optometryPersonalName">
                    <el-input v-model="optometryData.optometryPersonalName"></el-input>
                </el-form-item>
                <el-form-item label="验光师" prop="optometryDoctor">
                    <el-input v-model="optometryData.optometryDoctor"></el-input>
                </el-form-item>
                <el-form-item label="验光门店" prop="optometrySourceName">
                    <el-input v-model="optometryData.optometrySourceName"></el-input>
                </el-form-item>
                <el-form-item label="验光时间" prop="optometryTime">
                    <el-input v-model="optometryData.optometryTime"></el-input>
                </el-form-item>
                <el-form-item label="验光单类型" prop="optometryType">
                    <el-select v-model="optometryTypeData" class="m-2" placeholder="Select">
                        <el-option
                                v-for="item in options"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="右眼度数" prop="sphereR">
                    <el-input v-model="optometryData.sphereR"></el-input>
                </el-form-item>
                <el-form-item label="左眼度数" prop="sphereL">
                    <el-input v-model="optometryData.sphereL"></el-input>
                </el-form-item>
                <el-form-item label="右眼散光" prop="cylinderR">
                    <el-input v-model="optometryData.cylinderR"></el-input>
                </el-form-item>
                <el-form-item label="左眼散光" prop="cylinderL">
                    <el-input v-model="optometryData.cylinderL"></el-input>
                </el-form-item>
                <el-form-item label="右眼轴位" prop="axisR">
                    <el-input v-model="optometryData.axisR"></el-input>
                </el-form-item>
                <el-form-item label="左眼轴位" prop="axisL">
                    <el-input v-model="optometryData.axisL"></el-input>
                </el-form-item>
                <el-form-item label="双眼瞳距" prop="pd">
                    <el-input v-model="optometryData.pd"></el-input>
                </el-form-item>
                <el-form-item label="近加光ADD" prop="addd">
                    <el-input v-model="optometryData.addd"></el-input>
                </el-form-item>
                <el-form-item label="右眼矫正视力" prop="distanceR">
                    <el-input v-model="optometryData.distanceR"></el-input>
                </el-form-item>
                <el-form-item label="左眼矫正视力" prop="distanceL">
                    <el-input v-model="optometryData.distanceL"></el-input>
                </el-form-item>
                <el-form-item label="右眼视力" prop="visionR">
                    <el-input v-model="optometryData.visionR"></el-input>
                </el-form-item>
                <el-form-item label="左眼视力" prop="visionL">
                    <el-input v-model="optometryData.visionL"></el-input>
                </el-form-item>
                <el-form-item label="瞳高" prop="vd">
                    <el-input v-model="optometryData.vd"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="mark">
                    <el-input v-model="optometryData.mark"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
				<span class="dialog-footer">
					<el-button @click="resetForm(ruleFormRef)">取 消</el-button>
					<el-button type="primary" @click="addForm(ruleFormRef)">确 定</el-button>
				</span>
            </template>
        </el-dialog>


    </div>
</template>

<script setup lang="ts" username="basetable">
    import {ref, reactive, onMounted} from 'vue';
    import {ElMessage, ElMessageBox} from 'element-plus';
    import {Delete, Edit, Search, Plus} from '@element-plus/icons-vue';
    import {apiService} from '../api/apiService';
    import {apiUrls} from '../api/apiUrls';
    import {useRouter, useRoute} from 'vue-router';
    import {FormInstance, FormRules} from 'element-plus';

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

    let query = reactive({
        curPage: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
    });
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

    const ruleFormRef = ref<FormInstance>();
    const router = useRouter();
    const route = useRoute();
    let queryUserId = ref<string>("");
    let userId = ref<string>();
    let tableData = ref<TableItem[]>([]);
    let optometryDetailVisible = ref<boolean>(false);
    let editOptometryDetailVisible = ref<boolean>(false);
    let optometryTypeData = ref();
    const addOptometryVisible = ref(false);
    const mobilePhone = ref("");



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
        userId: string,
        vd: string,
        visionL: string,
        visionR: string,
        createTime: string,
    }

    let optometryUpdateData = reactive<TableItem>({
        id: "",
        addd: "",
        axisL: "",
        axisR: "",
        cylinderL: "",
        cylinderR: "",
        distanceL: "",
        distanceR: "",
        isDefault: false,
        mark: "",
        optometryDoctor: "",
        optometryPersonalName: "",
        optometrySourceName: "",
        optometryTime: "",
        optometryType: 1,
        pd: "",
        sphereL: "",
        sphereR: "",
        userId: "",
        vd: "",
        visionL: "",
        visionR: "",
        createTime: "",
    });

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
        optometryType: 1,
        pd: "",
        sphereL: "",
        sphereR: "",
        userId: "",
        vd: "",
        visionL: "",
        visionR: ""
    });


    onMounted(() => {
        getData();
    });

    // 获取表格数据
    const getData = () => {
        const data = {
            mobile: mobilePhone.value,
            // userId: userId.value,
            curPage: query.curPage,
            pageSize: query.pageSize,
        };
        apiService.fetchPostData(apiUrls.queryOptometry, data).then((res) => {
            if (res.code != 200) {
                return
            }
            ElMessage.success('查询验光单成功');
            tableData.value = res.data;
            query.curPage = res.pageInfo.curPage;
            query.pageSize = res.pageInfo.pageSize;
            query.totalCount = res.pageInfo.totalCount;
            query.totalPage = res.pageInfo.totalPage;
        })
    };

    //编辑验光单
    const editOptometryData = (index: number, row: any) => {
        const data = {
            optometryId: row.id
        };
        console.log('Sun >>> optometryId: row.id === ' + row.id);
        apiService.fetchPostData(apiUrls.getOptometryDetails, data).then((res) => {
            if (res.code != 200) {
                return
            }
            optometryUpdateData.id = res.data.id;
            optometryUpdateData.addd = res.data.addd;
            optometryUpdateData.axisL = res.data.axisL;
            optometryUpdateData.axisR = res.data.axisR;
            optometryUpdateData.cylinderL = res.data.cylinderL;
            optometryUpdateData.cylinderR = res.data.cylinderR;
            optometryUpdateData.distanceL = res.data.distanceL;
            optometryUpdateData.distanceR = res.data.distanceR;
            optometryUpdateData.isDefault = res.data.isDefault;
            optometryUpdateData.mark = res.data.mark;
            optometryUpdateData.optometryDoctor = res.data.optometryDoctor;
            optometryUpdateData.optometryPersonalName = res.data.optometryPersonalName;
            optometryUpdateData.optometrySourceName = res.data.optometrySourceName;
            optometryUpdateData.optometryTime = res.data.optometryTime;
            optometryUpdateData.optometryType = res.data.optometryType;
            optometryUpdateData.pd = res.data.pd;
            optometryUpdateData.sphereL = res.data.sphereL;
            optometryUpdateData.sphereR = res.data.sphereR;
            optometryUpdateData.userId = res.data.userId;
            optometryUpdateData.vd = res.data.vd;
            optometryUpdateData.visionL = res.data.visionL;
            optometryUpdateData.visionR = res.data.visionR;
            optometryUpdateData.createTime = res.data.createTime;
            if (optometryUpdateData.optometryType == 1) {
                optometryTypeData.value = "框架眼镜验光单"
            } else {
                optometryTypeData.value = "隐形眼镜验光单"
            }
            editOptometryDetailVisible.value = true;
        });

    };

    //查看验光单详情
    const optometryDataDetails = (index: number, row: any) => {
        const data = {
            optometryId: row.id
        };
        console.log('Sun >>> optometryId: row.id === ' + row.id);
        apiService.fetchPostData(apiUrls.getOptometryDetails, data).then((res) => {
            if (res.code != 200) {
                return
            }
            optometryUpdateData.id = res.data.id;
            optometryUpdateData.addd = res.data.addd;
            optometryUpdateData.axisL = res.data.axisL;
            optometryUpdateData.axisR = res.data.axisR;
            optometryUpdateData.cylinderL = res.data.cylinderL;
            optometryUpdateData.cylinderR = res.data.cylinderR;
            optometryUpdateData.distanceL = res.data.distanceL;
            optometryUpdateData.distanceR = res.data.distanceR;
            optometryUpdateData.isDefault = res.data.isDefault;
            optometryUpdateData.mark = res.data.mark;
            optometryUpdateData.optometryDoctor = res.data.optometryDoctor;
            optometryUpdateData.optometryPersonalName = res.data.optometryPersonalName;
            optometryUpdateData.optometrySourceName = res.data.optometrySourceName;
            optometryUpdateData.optometryTime = res.data.optometryTime;
            optometryUpdateData.optometryType = res.data.optometryType;
            optometryUpdateData.pd = res.data.pd;
            optometryUpdateData.sphereL = res.data.sphereL;
            optometryUpdateData.sphereR = res.data.sphereR;
            optometryUpdateData.userId = res.data.userId;
            optometryUpdateData.vd = res.data.vd;
            optometryUpdateData.visionL = res.data.visionL;
            optometryUpdateData.visionR = res.data.visionR;
            optometryUpdateData.createTime = res.data.createTime;
            if (optometryUpdateData.optometryType == 1) {
                optometryTypeData.value = "框架眼镜验光单"
            } else {
                optometryTypeData.value = "隐形眼镜验光单"
            }
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
        // if (queryUserId.value != "") {
            query.curPage = 1;
            // userId.value = queryUserId.value;
            getData();
        // } else {
        //     ElMessage.error("请输入正确的用户ID")
        // }
    };

    //新增验光单
    const addOptometryData = () => {
        addOptometryVisible.value = true;
    };

    //重置
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        addOptometryVisible.value = false;
        formEl.resetFields()
    };

    const closeForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        editOptometryDetailVisible.value = false;
    };

    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        console.log('Sun >>> optometryTypeData.value === ' + optometryTypeData.value);
        if (optometryTypeData.value == "框架眼镜验光单") {
            optometryUpdateData.optometryType = 1;
        } else {
            optometryUpdateData.optometryType = optometryTypeData.value
        }
        apiService.fetchPostData(apiUrls.updateOptometry, optometryUpdateData).then((res) => {
            if (res.code != 200) {
                return
            }
            ElMessage.success("修改成功");
            getData();
            editOptometryDetailVisible.value = false;
        })
    };

    //新增验光单
    const addForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        if (optometryTypeData.value == "框架眼镜验光单") {
            optometryData.optometryType = 1;
        } else {
            optometryData.optometryType = optometryTypeData.value
        }
        await formEl.validate((valid, fields) => {
            if (valid) {
                apiService.fetchPostData(apiUrls.addOptometry,optometryData).then((res) => {
                    if(res.code != 200){
                        ElMessage.error(res.msg);
                        return
                    }
                    ElMessage.success('新增验光单成功');
                    formEl.resetFields();
                    addOptometryVisible.value = false;
                    getData();

                })
            } else {
                console.log('error submit!', fields)
            }
        })
    };

    // 删除操作
    const handleDelete = (index: number, row: any) => {
        // 二次确认删除
        ElMessageBox.confirm('确定要删除吗？', '提示', {
            type: 'warning'
        })
            .then(() => {
                const data = {
                    ids: [row.id]
                };
                console.log('SUn >>> ids === ' + JSON.stringify(data));
                apiService.fetchPostData(apiUrls.deleteOptometry, data).then((res) => {
                    if (res.code != 200) {
                        return
                    }
                    ElMessage.success('删除成功');
                    getData();
                });
            })
            .catch(() => {
            });
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

    table {
        border-collapse: collapse;
        width: 100%;
        border: 1px solid #000; /* 添加表格边框 */
        margin-bottom: 20px; /* 添加一些间距 */
    }

    td {
        border: 1px solid #000; /* 添加单元格边框 */
        padding: 8px;
        text-align: left;
    }

    td:nth-child(odd) {
        width: 88px; /* 固定奇数列宽度 */
        height: 30px; /* 固定奇数列高度 */
        background-color: #f2f2f2; /* 奇数列背景色 */
    }
    td:nth-child(even) {
        text-align: center; /* 居中偶数列内容 */
    }


</style>
