<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li :class="{'current':item.current}" v-for="(item, index) in menuTab":key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
        </div>
        <div class="login-form">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm" size="mini">
                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="14"><el-input v-model.number="ruleForm2.code" maxlength="6" minlength="6"></el-input></el-col>
                        <el-col :span="10"><el-button type="success" class="block">获取验证码</el-button></el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm2')" class="login-btn block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        comments:{},
        data(){
            var validateUsername = (rule, value, callback) => {
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (!reg.test(value)) {
                    callback(new Error('用户名格式有误'));
                }else {
                    callback();
                }
            };
            var validatePassword = (rule, value, callback) => {
                let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!reg.test(value)) {
                    callback(new Error('密码格式为6~20位字母和数字'));
                } else {
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                let reg = /^[a-z0-9]{6}$/
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                } else if(!reg.test(value)) {
                    callback(new Error('验证码格式有误'));
                } else {
                    callback();
                }
            };
            return {
                menuTab:[
                    {txt:"登录", current:true},
                    {txt:"注册", current:false}
                ],
                isActive:1,
                ruleForm2: {
                    username: '',
                    password: '',
                    code: ''
                },
                rules2: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    code: [
                        { validator: validateCode, trigger: 'blur' }
                    ]
                }
                // index:1
            }
        },
        created() {
        },
        mounted() {
        },
        methods:{
            toggleMenu(item){
                this.menuTab.forEach(elem => {
                    elem.current = false
                })
                item.current = !item.current
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
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
