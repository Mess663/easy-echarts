import { compact, isArray, isNumber } from "lodash";
import { Size } from "../../../types/common";

/**
 * 将ecahrt.grid的边距宽高从百分比转为数字
 * @param grid echart的单个grid配置
 * @param size echart容器的宽高
 */
export const gridPercent2Num = (grid: echarts.GridComponentOption, size?: Size) => {
	if (!size) return { top: 0, left: 0, right: 0, bottom: 0 };
	const { top, left, bottom, right } = grid;
	const { width, height } = size;
	const percent2Num = (p: string | number = 0, isWidth: boolean) => {
		if (isNumber(p)) return p;
		const percentNumber = parseFloat(p);
		return percentNumber * (isWidth ? width : height) / 100;
	};
	return {
		top: percent2Num(top, false),
		left: percent2Num(left, true),
		bottom: percent2Num(bottom, false),
		right: percent2Num(right, true)
	};
};

export const initGraphicOption = (echartInstance: echarts.ECharts, gridId: string, onChange: (grid: echarts.GridComponentOption)=>void) => {
	const { grid } = echartInstance.getOption() as echarts.EChartsOption;
	const g = compact(isArray(grid) ? [...grid] : [grid]);
	const curGrid = g.find(o => o?.id === gridId);
	if (!curGrid) return [];
	const { left = 0, top = 0, right = 0, bottom = 0 } = curGrid;
	const width = echartInstance.getWidth();
	const height = echartInstance.getHeight();
	const r = isNumber(right) ? right : width * (parseFloat(right) / 100);
	const b = isNumber(bottom) ? bottom : height * (parseFloat(bottom) / 100);
	return [
		{
			type: "bezierCurve",
			x: width - r,
			y: height - b,
			shape: {
				x1: -30,
				y1: 10,
				x2: 10,
				y2: -30,
				cpx1: 10,
				cpy1: 10
			},
			style: {
				lineWidth: 10
			},
			cursor: "nwse-resize",
			// draggable: true,
			// ondrag (e) {
			// 	const targetGrid = g.find(o => o.id === gridId);
			// 	onChange(
			// 		{
			// 			...targetGrid,
			// 			right: width - e.target.x,
			// 			bottom: height - e.target.y,
			// 		}
			// 	);
			// },
		}
	] as echarts.EChartsOption["graphic"];
};
