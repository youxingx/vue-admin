<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-row :gutter="14">
                <el-col :span="4">
                    <div class="label-wrap category">
                        <label for="">类型:</label>
                        <div class="warp-content">
                            <el-select v-model="categoryValue" placeholder="请选择" style="width: 100%">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <!--<el-form-item label="类型:">-->
                        <!--&lt;!&ndash;<el-input v-model="formInline.user" placeholder="审批人"></el-input>&ndash;&gt;-->
                        <!--<el-select v-model="value" placeholder="请选择" style="width: 120px">-->
                            <!--<el-option-->
                                    <!--v-for="item in options"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                </el-col>
                <el-col :span="7">
                    <div class="label-wrap date">
                        <label for="">日期：&nbsp;&nbsp;</label>
                        <div class="warp-content">
                            <el-date-picker
                                    style="width: 100%"
                                    v-model="dateValue"
                                    type="datetimerange"
                                    align="right"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>
                    </div>
                    <!--<el-form-item label="日期:">-->
                        <!--<el-date-picker-->
                                <!--v-model="value2"-->
                                <!--type="datetimerange"-->
                                <!--align="right"-->
                                <!--start-placeholder="开始日期"-->
                                <!--end-placeholder="结束日期"-->
                                <!--:default-time="['12:00:00', '08:00:00']">-->
                        <!--</el-date-picker>-->
                    <!--</el-form-item>-->
                </el-col>
                <el-col :span="3">
                    <div class="label-wrap key-word">
                        <label for="">关键字：</label>
                        <div class="warp-content">
                            <el-select v-model="searchKey" style="width: 100%">
                                <el-option v-for="item in searchOption"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <!--<el-form-item label="关键字">-->
                        <!--<el-select v-model="searchKey" style="width: 80px">-->
                            <!--<el-option v-for="item in searchOption"-->
                                       <!--:key="item.value"-->
                                       <!--:label="item.label"-->
                                       <!--:value="item.value"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                </el-col>
                <el-col :span="3">
                    <el-input v-model="searchKeyWord" placeholder="请输入内容" style="width: 100%"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="danger" style="width: 100%">搜索</el-button>
                </el-col>
                <el-col :span="3">&nbsp;</el-col>
                <el-col :span="2">
                    <el-button type="danger" class="pull-right" style="width: 100%" @click="dialogInfo=true">新增</el-button>
                </el-col>
            </el-row>
        </el-form>

        <div class="black-space-30"></div>
        <!--表格数据-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="title" label="标题" width="830"></el-table-column>
            <el-table-column prop="category" label="类型" width="130"></el-table-column>
            <el-table-column prop="date" label="日期" width="237"></el-table-column>
            <el-table-column prop="user" label="管理员"  width="115"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deleteInfo">删除</el-button>
                <el-button size="mini" type="success" @click="dialogInfo=true">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="black-space-30"></div>
        <!--底部分页-->
        <el-row>
            <el-col :span="12">
                <el-button size="medium" @click="deleteMulti">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                        class="pull-right"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="1000"
                        :page-sizes="[10,20,30,40]"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange">
                </el-pagination>
            </el-col>
        </el-row>

        <!--新增弹窗-->
        <!--<DialogInfo :flag="dialogInfo" @close="closeDialog" />-->
        <DialogInfo :flag.sync="dialogInfo" />
    </div>
</template>

<script>
    import DialogInfo from "./dialog/info";
    import {global} from "@/utils/global_3.0";
    import { reactive, ref, isRef, toRefs, onMounted, computed } from "@vue/composition-api";
    export default {
        name: "infoIndex",
        components: { DialogInfo },
        setup(props, context){
            const {confirm} = global();
            const options = reactive(
                [{
                    value: 1,
                    label: '国际信息'
                }, {
                    value: 2,
                    label: '国内信息'
                }, {
                    value: 3,
                    label: '行业信息'
                }],
            );
            const searchOption = reactive(
                [{
                    value: "id",
                    label: 'ID'
                }, {
                    value: "title",
                    label: '标题'
                }],
            );
            const tableData = reactive([
                {
                    title: '冠状病毒',
                    category: '国内新闻',
                    date: '2016-05-02 12:02:30',
                    user: 'tom'
                }
            ]);
            const searchKey = ref(searchOption[0].value);
            const categoryValue = ref('');
            const dateValue = ref('');
            const searchKeyWord = ref('');
            const dialogInfo = ref(false);

            const handleSizeChange = ((val)=>{

            });

            const handleCurrentChange = ((val)=>{

            });
            const deleteInfo = (()=>{
                confirm({
                    content:"此操作将永久删除该文件, 是否继续?",
                    tip:"警告",
                    fn: confirmDelete,
                    id: 1111111
                });
                // context.root.confirm({
                //         content:"此操作将永久删除该文件, 是否继续?",
                //         tip:"警告",
                //         fn: confirmDelete,
                //         id: 1111111
                //     });
            });

            const deleteMulti = (()=>{
                confirm({
                    content:"删除选中, 是否继续?",
                    fn: confirmDelete,
                    id: 1111112
                })
                // context.root.confirm({
                //         content:"删除选中, 是否继续?",
                //         fn: confirmDelete,
                //         id: 1111112
                //     });
            });

            const confirmDelete = ((value)=>{
                console.log(value)
            });

            // const closeDialog = (()=>{
            //     dialogInfo.value = false
            // });

            return {
                options,
                searchOption,
                tableData,
                categoryValue,
                dateValue,
                searchKey,
                searchKeyWord,
                dialogInfo,
                handleSizeChange,
                handleCurrentChange,
                deleteInfo,
                deleteMulti
                // closeDialog
            };
        }
    };
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
    &.category { @include labelDom(left, 60, 40)}
    &.date { @include labelDom(right, 93, 40)}
    &.key-word { @include labelDom(right, 99, 40)}
    /*label {*/
        /*float: left;*/
        /*line-height: 40px;*/
        /*width: 60px;*/
    /*}*/
    /*.warp-content {*/
        /*margin-left: 60px;*/
        /*!*background-color: #ccc;*!*/
    /*}*/
}
</style>
