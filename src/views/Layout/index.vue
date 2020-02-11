<template>
    <div id="layout" :class="[menuStatus ? 'close':'open']">
        <LayoutHeader></LayoutHeader>
        <LayoutMain></LayoutMain>
        <LayoutNav></LayoutNav>
    </div>
</template>

<script>
    import LayoutHeader from "./Components/Header";
    import LayoutMain from "./Components/Main";
    import LayoutNav from "./Components/Nav";
    import { reactive, ref, isRef, toRefs, onMounted, computed } from "@vue/composition-api";
    export default {
        name: "layout",
        components:{ LayoutHeader, LayoutMain, LayoutNav },
        setup(props, context){
            const menuStatus = computed(()=>{
                return context.root.$store.state.isCollapse;
            });

            return {
                menuStatus,
            };
        }
    };
</script>

<style lang="scss" scoped>

</style>
