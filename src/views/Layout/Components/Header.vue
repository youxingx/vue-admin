<template>
    <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu"></svg-icon></div>
        <div class="pull-right">
            <div class="pull-left user-info">
                <!--<img src="../../../assets/images/face.jpg">-->
                管理员
            </div>
            <div class="pull-left header-icon">
                <svg-icon icon-class="exit" class-name="exit"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "layoutHeader",
        setup(props, context) {
            const navMenuState = () =>{
                context.root.$store.commit("SET_COLLAPSE");
            };
            return {
                navMenuState,
            };
        }
    };
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap{
    position: fixed;
    top: 0;
    left: $navMenu;
    right: 0;
    height: 75px;
    background-color: #fff;
    line-height: 75px;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
    @include webkit(transition, all .3s ease 0s);
}
.open {
    #header-wrap{
        left: $navMenu;
    }
}
.close {
    #header-wrap{
        left: $navMenuMin;
    }
}
.header-icon {
    padding: 0 32px;
    svg {
        margin-bottom: -8px;
        font-size: 25px;
        cursor: pointer;
    }
}
.user-info {
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    + .header-icon {
        padding: 0 28px;
    }
}
</style>
