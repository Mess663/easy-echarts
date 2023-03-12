import React, { useEffect, useMemo, useRef } from "react";
import css from "./index.module.less";
import * as echarts from "echarts";
import useRefSize from "../../hooks/dom/useRefSize";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import { ComponentType } from "../../types/biz/compont";
import useDragEvent from "./hook/useDragEvent";
import { getBoundaryValidNum } from "../../tools/number";
import { invoke, method } from "lodash";

const onEvent = (type: ComponentType, cb: ((e: echarts.ECElementEvent) => void)) =>
	(e: echarts.ECElementEvent, ) => {
		if (e.componentType === type) {
			cb(e);
		}
	};


const ChartPreview = () => {
	const series = useSelector((state: RootState) => state.optionForm.series);
	const title = useSelector((state: RootState) => state.optionForm.title);
	const dispatch = useDispatch<Dispatch>();
	const echartObjRef = useRef<echarts.ECharts>();
	const [containerRef, size] = useRefSize();
	const [
		, { onMousedown, onMousemove, onMouseup }
	] = useDragEvent({
		moveTransform(e: echarts.ElementEvent, offset: [number, number, number]) {
			const { offsetX, offsetY } = e;
			const [ firstX, firstY, index] = offset;
			const currentTitle = title[index];
			if (currentTitle && size) {
				dispatch.optionForm.modifyTitle({
					...currentTitle,
					left: getBoundaryValidNum(offsetX - firstX, 0, size.width - firstX),
					top: getBoundaryValidNum(offsetY - firstY, 0, size.height - firstY)
				});
			}
		},
		downTransform(e: echarts.ECElementEvent):[number, number, number] {
			const currentTitle = title[e.componentIndex];
			const x = Number(currentTitle?.left ?? 0);
			const y = Number(currentTitle?.top ?? 0);
			const { offsetX = 0, offsetY = 0 } = e.event ?? {};
			return [offsetX - x, offsetY - y, e.componentIndex];
		},
	});

	useEffect(() => {
		if (size && echartObjRef.current) {
			echartObjRef.current.resize();
		}
	}, [echartObjRef, size]);

	const echartsOption = useMemo(() => {
		return {
			title: title.map(o => ({
				...o,
				id: o._key,
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
		} as echarts.EChartsOption;
	}, [series, title]);


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
							dispatch.optionForm.selectTitle(e.componentIndex);
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

