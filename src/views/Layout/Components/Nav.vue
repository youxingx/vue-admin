<template>
    <div id="nav-wrap">
        <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#fff"
            router>

            <template v-for="(item, index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
                    <!--  一级菜单  -->
                    <template slot="title">
                        <!--<i :class="item.meta.icon"></i>-->
                        <!--<svg-icon iconClass="menu" className="menu"></svg-icon>-->
                        <svg-icon :iconClass="item.meta.icon" :className="item.meta.name"></svg-icon>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <!--  子级菜单  -->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import { reactive, ref, isRef, toRefs, onMounted, computed } from "@vue/composition-api";
    export default {
        name: "navMenu",
        setup(props, context){
            //data数据
            // const isCollapse = ref(false);
            const routers = reactive(context.root.$router.options.routes)
            // console.log(routers);

            /**
             * computed 监听
             * @type {Function}
             */
            const isCollapse = computed(()=>{
                return context.root.$store.state.isCollapse;
            });

            // const handleOpen = ((key, keyPath)=>{
            //     // console.log(key, keyPath);
            // });
            //
            // const handleClose = ((key, keyPath)=>{
            //     // console.log(key, keyPath);
            // });

            //打印store
            // console.log(context.root.$store.state.isCollapse);
            // console.log(context.root.$store.getters.count);
            // context.root.$store.commit("SET_COUNT", 100);

            return {
                isCollapse,
                // handleOpen,
                // handleClose,
                routers,
            };
        }
    };
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
    text-align: center;
    img {
        margin: 28px auto 25px;
        width: 92px;
        @include webkit(transition, all .3s ease 0s);
    }
}
#nav-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: $navMenu;
    height: 100vh;
    background-color: #344a5f;
    @include webkit(transition, all .3s ease 0s);
    svg {
        font-size: 20px;
        margin-right: 10px;
    }
}
.open {
    #nav-wrap {width: $navMenu;}
}
.close {
    #nav-wrap {width: $navMenuMin;}
    .logo img {width: 60%;}
}
</style>
