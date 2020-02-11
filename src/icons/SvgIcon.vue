<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
    <!--<div>-->
        <!--&lt;!&ndash;{{plusOne}}&ndash;&gt;-->
        <!--<svg :class="svgClass" aria-hidden="true">-->
            <!--<use :xlink:href="iconName"></use>-->
        <!--</svg>-->
    <!--</div>-->
</template>

<script>
    import { reactive, ref, isRef, toRefs, onMounted, computed } from "@vue/composition-api";
    export default {
        name: "svgIcon",
        // props:["iconClass", "className"],
        props:{
            iconClass:{
                /**
                 * type类型的值
                 * String:
                 * Number:
                 * Boolean:
                 * Array:
                 * Object:
                 * Date:
                 * Function:
                 * Symbol:表示独一无二的值(es6)
                 */
                type:String,
                default:"qqqq",
                required:true,
                validator:(value)=>{
                    return true
                }
            },
            className:{
                type:String,
                default:"qqqq",
            },
        },
        setup(props){
            // console.log(props.iconClass);
            // console.log(props.className);
            const msg = ref("手把手撸前端代码");
            //监听数据变化，处理，并返回
            const iconName =computed(() => `#icon-${props.iconClass}`);
            const svgClass =computed(()=>{
                if(props.className){
                    return `svg-icon ${props.className}`;
                } else {
                    return `svg-icon`;
                }
            });
            // const count = ref(10);

            // const plusOne = computed({
            //     get: ()=>count.value+1,
            //     set: (val)=>count.value=val-1,
            // });

            // const plusOne = computed(()=>{
            //     return count.value + 1
            // });
            return {
                msg,
                iconName,
                svgClass
                // plusOne
            }
        },
    };
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill:currentColor;
    color: #fff;
    /*
    fill:currentColor;
    color: red;
    &.font12{
        font-size: 12px;
    }
    */
    /*font-size: 20px;*/
    /*background-color: red;*/
}
</style>
