import React, { useEffect, useRef } from "react";
import css from "./index.module.less";
import * as echarts from "echarts";
import useRefSize from "../../hooks/useRefSize";
import { useRecoilState } from "recoil";
import optionForm from "../../recoil/option_form";

const ChartPreview = () => {
	const [containerRef, size] = useRefSize();
	const [charts] = useRecoilState(optionForm.chartsState); 
	const echartObjRef = useRef<echarts.ECharts>();

	useEffect(() => {
		if (!echartObjRef.current) return;
		const chart = echartObjRef.current;
		chart.setOption({
			tooltip: {},
			xAxis: {
				type: "category"
			},
			yAxis: {},
			series:charts.map(o => ({
				type: o.type
			})),
			dataset: {
				source: [
					["product", "2012", "2013", "2014", "2015"],
					["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
					["Milk Tea", 86.5, 92.1, 85.7, 83.1],
					["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4]
				]
			}
		} as echarts.EChartsOption, true);
	}, [charts]);

	useEffect(() => {
		if (size && echartObjRef.current) {
			echartObjRef.current.resize();
		}
	}, [size]);

	return (
		<div className={css.container} ref={containerRef}>
			<div 
				style={{
					width: size?.width,
					height: size?.height
				}} 
				className={css.chart} 
				ref={(dom) => {
					if (dom && !echartObjRef.current) {
						echartObjRef.current = echarts.init(dom);
					}
				}}
			></div>
		</div>
	);
};

export default ChartPreview;