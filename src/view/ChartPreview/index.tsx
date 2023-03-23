import React, { useEffect, useMemo, useRef } from "react";
import css from "./index.module.less";
import * as echarts from "echarts";
import useRefSize from "../../hooks/dom/useRefSize";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import { ComponentType } from "../../types/biz/compont";
import useTitleDragEvent from "./hooks/useTitleDragEvent";
import { ValueOf } from "type-fest";
import { Series, Title, XAxis, YAxis } from "../../types/biz/option_form";

const onEvent = (type: ComponentType, cb: ((e: echarts.ECElementEvent) => void)) =>
	(e: echarts.ECElementEvent, ) => {
		if (e.componentType === type) {
			cb(e);
		}
	};

const addCommonOption = (options: (Title | Series | XAxis | YAxis)[]) => {
	return options.map(o => ({
		...o,
		triggerEvent: true,
	}));
};

const ChartPreview = () => {
	const { title, series, xAxis, yAxis } = useSelector((state: RootState) => state.options);
	const dispatch = useDispatch<Dispatch>();
	const echartObjRef = useRef<echarts.ECharts>();
	const [containerRef, size] = useRefSize();
	const [
		output, { onMousedown, onMousemove, onMouseup }
	] = useTitleDragEvent(size, title);

	useEffect(() => {
		if (output) {
			const [left, top, index] = output;
			dispatch.options.modifyByIndex({
				index,
				name: "title",
				data: {
					left,
					top
				}
			});
		}
	}, [dispatch.options, output]);

	useEffect(() => {
		if (size && echartObjRef.current) {
			echartObjRef.current.resize();
		}
	}, [echartObjRef, size]);

	const echartsOption = useMemo(() => {
		return {
			title: addCommonOption(title),
			xAxis: addCommonOption(xAxis),
			yAxis: addCommonOption(yAxis),
			series: series.map(o => ({
				type: o.type
			})),
			tooltip: {},
			dataset: {
				source: [
					["product", "2012", "2013", "2014", "2015"],
					["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
					["Milk Tea", 86.5, 92.1, 85.7, 83.1],
					["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4]
				]
			},
			animation: false
		} as echarts.EChartsOption;
	}, [series, title, xAxis, yAxis]);

	useEffect(() => {
		if (!echartObjRef.current) return;
		echartObjRef.current.setOption(echartsOption, true);
	}, [echartsOption]);

	return (
		<div className={css.container} ref={containerRef}>
			<div
				ref={(dom) => {
					if (dom && !echartObjRef.current) {
						echartObjRef.current = echarts.init(dom, {
							renderer: "canvas",
							useDirtyRect: true,
						});
						echartObjRef.current.setOption(echartsOption);
						echartObjRef.current.on("mousedown", (e) => {
							const name = e.componentType as keyof RootState["optionView"];
							dispatch.optionView.select({ name, index: e.componentIndex });
							onEvent(ComponentType.Title, onMousedown)(e);
						});
						echartObjRef.current.getZr().on("mousemove", onMousemove);
						echartObjRef.current.getZr().on("mouseup", onMouseup);
					}
				}}
				style={{
					width: size?.width,
					height: size?.height
				}}
			/>
			{/* <ReactEChartsCore
				ref={(e) => {
					if (e) {
						console.log("new ");
						// echartObjRef.current?.dispose();
						echartObjRef.current = e.getEchartsInstance();
					}
				}}
				echarts={echarts}
				option={echartsOption}
				notMerge
				style={{
					width: size?.width,
					height: size?.height
				}}
				onEvents={onEvents}
				opts={{
					renderer: "canvas",
					useDirtyRect: true,
				}}
			/> */}
		</div>
	);
};

export default ChartPreview;

