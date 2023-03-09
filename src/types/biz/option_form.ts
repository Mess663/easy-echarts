import { Chart } from "./chart";

// 图表选择对象（转换成series） 
export type FormChart = { 
    key: string,  // 唯一id
    name: string  // 图表中文名
    type: Chart // series type
}