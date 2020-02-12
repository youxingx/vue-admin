<template>
    <el-dialog title="新增" :visible.sync="dialogInfo" @close="close" width="580px">
        <el-form :model="form">
            <el-form-item label="标题" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
                <el-input v-model="form.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="概况" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" @click="dialogFormVisible = false">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { reactive, ref, isRef, toRefs, onMounted, computed, watch } from "@vue/composition-api";
    export default {
        name: "info",
        props:{
            flag:{
                type:Boolean,
                default:false
            },
        },
        // watch:{
        //     flag:{
        //         handler(newValue, oldValue) {
        //             this.dialogInfo.value = newValue;
        //         }
        //     }
        // },
        setup(props, context){
            const dialogInfo = ref(false);
            const formLabelWidth = ref('70px');

            const form =reactive({
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                });

            //watch监听
            watch(()=>{
                // console.log(props.flag);
                dialogInfo.value = props.flag;
            });

            const close = (()=>{
                dialogInfo.value = false;
                context.emit("update:flag", false);
                // context.emit("close", false);
            });

            return {
                dialogInfo,
                formLabelWidth,
                form,
                close,
            };
        },
    };
</script>

<style scoped>

</style>
