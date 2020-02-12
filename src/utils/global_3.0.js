import {MessageBox} from "element-ui";
import { reactive, ref } from "@vue/composition-api";
export function global() {
    const str = ref("");
    const confirm = ((params)=>{
        MessageBox.confirm(params.content, params.tip || "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: params.type ||"warning",
            center:"true",
        }).then(() => {
            // console.log(params.fn);
            params.fn && params.fn(params.id);
            // root.$message({
            //     type: "success",
            //     message: "删除成功!"
            // });
        }).catch(() => {
            // root.$message({
            //     type: "info",
            //     message: "已取消删除"
            // });
        });
    });

    return {
        str,
        confirm
    };
}
