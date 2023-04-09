import { compact, isArray, isNumber } from "lodash";

export const getResizeGraphicOption = (echartInstance: echarts.ECharts, gridId: string, onChange: (grid: echarts.GridComponentOption)=>void) => {
	const { grid } = echartInstance.getOption() as echarts.EChartsOption;
	const g = compact(isArray(grid) ? [...grid] : [grid]);
	const curGrid = g.find(o => o?.id === gridId);
	if (!curGrid) return [];
	const { left = 0, top = 0, right = 0, bottom = 0 } = curGrid;
	const width = echartInstance.getWidth();
	const height = echartInstance.getHeight();
	const r = isNumber(right) ? right : width * (parseFloat(right) / 100);
	const b = isNumber(bottom) ? bottom : height * (parseFloat(bottom) / 100);
	// console.log(grid, gridId, [width - r, height - b]);
	return [
		{
			type: "bezierCurve",
			position: [width - r, height - b],
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
			draggable: true,
			ondrag (e) {
				const targetGrid = g.find(o => o.id === gridId);
				onChange(
					{
						...targetGrid,
						right: width - e.target.x,
						bottom: height - e.target.y,
					}
				);
			},
		}
	] as echarts.EChartsOption["graphic"];
};

export const getMovingGridOption = () => {

};