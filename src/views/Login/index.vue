<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li :class="{'current':item.current}" v-for="(item, index) in menuTab":key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
        </div>
        <div class="login-form">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" size="mini">
                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>
                <el-form-item prop="replypassword" class="item-form" v-if="model==='register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.replypassword" auto-complete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="14"><el-input type="text" v-model.number="ruleForm.code" maxlength="6" minlength="6"></el-input></el-col>
                        <el-col :span="10"><el-button type="success" class="block" @click="getSms()">获取验证码</el-button></el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { GetSms } from "@api/login"
    import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
    import { stripscript, validataEmail, validataPassword, validataCode } from "@/utils/validata";
    export default {
        name: "index",
        setup(props, context){
        // setup(props, {refs}){
            /**
             * context里面的内容
             * context.attrs
             * context.slots
             * context.parent
             * context.root
             * context.emit
             * context.refs
             */
            let validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (!validataEmail(value)) {
                    callback(new Error('用户名格式有误'));
                }else {
                    callback();
                }
            }
            let validatePassword = (rule, value, callback) => {
                // console.log(stripscript(value));
                ruleForm.password = stripscript(value);
                value = ruleForm.password
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!validataPassword(value)) {
                    callback(new Error('密码格式为6~20位字母和数字'));
                } else {
                    callback();
                }
            }
            let validateReplyPassword = (rule, value, callback) => {
                // console.log(stripscript(value));
                if(model.value === 'login'){ return callback();}
                ruleForm.replyPassword = stripscript(value);
                value = ruleForm.replyPassword
                if (value === '') {
                    callback(new Error('请确认密码'));
                } else if (value!=ruleForm.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            }
            let validateCode = (rule, value, callback) => {
                // this.ruleForm.code = stripscript(value)
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                } else if(!validataCode(value)) {
                    callback(new Error('验证码格式有误'));
                } else {
                    callback();
                }
            }


            /**
             * 这里面放置的是data数据、生命周期、自定义函数
             * 对象数据用reactive()
             * 基础数据用ref()
             */
            const menuTab= reactive([
                {txt:"登录", current:true, type:'login'},
                {txt:"注册", current:false, type:'register'},
            ])
            const model = ref('login')
            const ruleForm = reactive({
                username: '',
                password: '',
                replypassword: '',
                code: ''
            })
            const rules = reactive({
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                replypassword:[
                    { validator: validateReplyPassword, trigger: 'blur' }
                ],
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
            })

            // console.log(menuTab)
            // console.log(model.value)
            // //isRef函数用来判断对象是否是基础类型
            // console.log(isRef(menuTab))

            /**
             * 自定义函数
             */
            const toggleMenu = (item => {
                model.value = item.type
                menuTab.forEach(elem => {
                    elem.current = false
                })
                item.current = !item.current
            })
            /**
             * 获取验证码
             */
            const getSms = (()=>{
                let data = {
                    username:ruleForm.username
                }
                GetSms(data)
            })
            const submitForm = (formName => {
                // axios.request({
                //     method: 'get',
                //     url: '/user/12345',
                //     data: {
                //         firstName: 'Fred',
                //         lastName: 'Flintstone'
                //     }
                // })

                context.refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            })

            //生命周期
            onMounted(() => {
                // GetSms()
                // axios.get('/apis/ithil_j/activity/movie_annual2017').then(res => {
                //     console.log(res.data)
                // }, res => {
                //     console.info('调用失败');
                // })
                // axios.get('/agent/agent/testapi/test/reverse.action').then(res => {
                //     console.log(res.data)
                // }, res => {
                //     console.info('调用失败');
                // })
                // axios.get('/devapi/productapi/getSms').then(res => {
                //     console.log(res.data)
                // }, res => {
                //     console.info('调用失败');
                // })
                // axios.get( "/article/d4666d640e2e478d283d8c7f.htm" )
                //     .then( function ( response ) {
                //         console.log( response.data );
                //     } )
                //     .catch( function ( error ) {
                //         throw error;
                //     } );
                // axios.get( "/devapi/productapi/getSms" )
                //     .then( function ( response ) {
                //         console.log( response.data );
                //     } )
                //     .catch( function ( error ) {
                //         throw error;
                //     } );

            })
            //所有用到的数据都要返回
            return {
                menuTab,
                model,
                ruleForm,
                rules,
                toggleMenu,
                getSms,
                submitForm,
                validateUsername,
                validatePassword,
                validateReplyPassword,
                validateCode
            }
        },
        comments:{},
        // data(){
        //     return {
        //     }
        // },
        // created() {
        // },
        // mounted() {
        // },
        methods:{

        },
        props:{},
        watch:{}
    }
</script>

<style lang="scss" scoped>
#login {
    height: 100vh;
    background-color: #344a5f;
}
.login-wrap {
    width: 330px;
    margin: auto;
}
.menu-tab {
    text-align: center;
    li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
}
.current {
    background-color: rgba(0,0,0,.1);
}
.login-form {
    width: 20%;
    margin: 0 auto;
    /*margin-top: 29px;*/
    label {
        display: block;
        font-size: 14px;
        color: #fff;
        margin-bottom: 3px;
    }
}
.item-form {
    margin-bottom: 13px;
}
.block {
    display: block;
    width: 100%;
    margin: 0 auto;
}
.login-btn {
    margin-top: 19px;
}
</style>

<!--邮箱正则 ：/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/  -->
<!--字母+数字 ：/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/  -->
<!--字母或数字 ：/^[a-z0-9]{6}$/  -->
