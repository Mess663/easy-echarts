import React, { useEffect, useRef } from "react";
import css from "./index.module.less";
import * as echarts from "echarts";
import useRefSize from "../../hooks/useRefSize";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import { ComponentType } from "../../types/biz/compont";

const ChartPreview = () => {
	const [containerRef, size] = useRefSize();
	const series = useSelector((state: RootState) => state.optionForm.series);
	const title = useSelector((state: RootState) => state.optionForm.title);
	const echartObjRef = useRef<echarts.ECharts>();
	const dispatch = useDispatch<Dispatch>();

	useEffect(() => {
		if (!echartObjRef.current) return;
		const chart = echartObjRef.current;
		chart.setOption({
			title: title.map(o => ({
				...o,
				left: 5,
				top: 5,
				triggerEvent: "click"
			})),
			tooltip: {},
			xAxis: {
				type: "category"
			},
			yAxis: {},
			series: series.map(o => ({
				type: o.type
			})),
			dataset: {
				source: [
					["product", "2012", "2013", "2014", "2015"],
					["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
					["Milk Tea", 86.5, 92.1, 85.7, 83.1],
					["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4]
				]
			},
			animation: false
		} as echarts.EChartsOption, true);
	}, [series, title]);

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
					if (dom) {
						if (echartObjRef.current) {
							echartObjRef.current.dispose();
						}

						echartObjRef.current = echarts.init(dom);
						echartObjRef.current.on("mousedown", ComponentType.Title, (params) => {
							dispatch.optionForm.selectTitle(params.componentIndex);
						});
						echartObjRef.current.on("mousemove", ComponentType.Title, (params) => {
							console.log(params.event?.offsetX, params.event?.offsetY);
						});
					}
				}}
			/>
		</div>
	);
};

export default ChartPreview;

