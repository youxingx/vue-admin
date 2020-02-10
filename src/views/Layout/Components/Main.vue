<template>
    <div id="main-wrap">
        <router-view></router-view>
        <!--内容区-->
    </div>
</template>

<script>
    export default {
        name: "Main"
    };
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
    position: fixed;
    left: $navMenu;
    top: 75px;
    right: 0;
    bottom: 0;
    /*padding: 75px 0 0 250px;*/
    border: 30px solid #f7f7f7;
    border-bottom: none;
    -webkit-box-sizing: border;
}
</style>
