import React, { useEffect, useMemo, useRef } from "react";
import css from "./index.module.less";
import * as echarts from "echarts";
import useRefSize from "../../hooks/dom/useRefSize";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import { ComponentType } from "../../types/biz/compont";
import useTitleDragEvent from "./hooks/useTitleDragEvent";
import { State } from "../../models/options";
import { compact, filter, flow, isArray, isFunction, isNumber } from "lodash";
import { filter as fpFilter, maxBy } from "lodash/fp";
import { isOptionViewKey } from "../../models/option_view";

const onEvent = (type: ComponentType, cb: ((e: echarts.ECElementEvent) => void)) =>
	(e: echarts.ECElementEvent, ) => {
		if (e.componentType === type) {
			cb(e);
		}
	};

const addCommonOption = <T extends State[keyof State]>(options: T, forCallback?: (o: T[number], i: number) => Partial<T[number]> ) => {
	return options.map((o, i) => ({
		...o,
		triggerEvent: true,
		...(isFunction(forCallback) ? forCallback(o, i) : {}),
	}));
};

const resizeGrid = (echartInstance: echarts.ECharts, gridId: string, onChange: (grid: echarts.GridComponentOption)=>void) => {
	const { grid } = echartInstance.getOption() as echarts.EChartsOption;
	const g = compact(isArray(grid) ? [...grid] : [grid]);
	const curGrid = g.find(o => o?.id === gridId);
	if (!curGrid) return;
	const { left = 0, top = 0, right = 0, bottom = 0 } = curGrid;
	const width = echartInstance.getWidth();
	const height = echartInstance.getHeight();
	const r = isNumber(right) ? right : width * (parseFloat(right) / 100);
	const b = isNumber(bottom) ? bottom : height * (parseFloat(bottom) / 100);
	// console.log(grid, gridId, [width - r, height - b]);
	echartInstance.setOption({
		graphic: [
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
		]
	} as echarts.EChartsOption);
};

const findGridId = (e: echarts.ECharts, x: number, y: number) => {
	const { grid } = e.getOption() as echarts.EChartsOption;
	const arrGrid = isArray(grid) ? grid : [grid];
	const findGrid = flow(
		fpFilter((g: echarts.GridComponentOption) => e.containPixel({ gridId: g?.id }, [x, y])),
		maxBy("z")
	)(arrGrid);
	return findGrid?.id ? String(findGrid?.id) : undefined;
};

const ChartPreview = () => {
	const { title, series, xAxis, yAxis, grid } = useSelector((state: RootState) => state.options);
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
			grid: addCommonOption(grid),
			series: addCommonOption(series),
			// grid: [{
			// 	id: "1"
			// }],
			// xAxis: [{
			// 	type: "category",
			// 	gridId: "1"
			// }],
			// yAxis: [{
			// 	gridId: "1"
			// }],
			// series: [{
			// 	type: "bar",
			// }],
			tooltip: {},
			dataset: [
				{
					source: [
						["product", "2012", "2013", "2014", "2015"],
						["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
						["Milk Tea", 86.5, 92.1, 85.7, 83.1],
						["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4]
					]
				},
				{
					source: [
						["product", "dog", "cat", "mouse"],
						["Matcha Latte", 241, 30, 65.1],
						["Milk Tea", 286, 92, 85.7],
						["Cheese Cocoa", 324, 67, 79.5]
					]
				}
			],
			animation: false,
		} as echarts.EChartsOption;
	}, [grid, series, title, xAxis, yAxis]);

	useEffect(() => {
		if (!echartObjRef.current) return;
		console.log("option", echartsOption);
		echartObjRef.current.setOption(echartsOption);
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
						const echart = echartObjRef.current;
						echart.setOption(echartsOption);
						echart.on("mousedown", (e) => {
							const name = e.componentType;
							if (isOptionViewKey(name)) {
								dispatch.optionView.select({ name, index: e.componentIndex });
							}
							onEvent(ComponentType.Title, onMousedown)(e);
						});
						echart.getZr().on("mousemove", onMousemove);
						echart.getZr().on("mouseup", onMouseup);
						echart.getZr().on("mousedown", (e) => {
							const { offsetX, offsetY } = e;
							const gridId = findGridId(echart, offsetX, offsetY);
							if (gridId) {
								if (!e.target) {
									dispatch.optionView.selectGrid(gridId);
								}
								resizeGrid(echart, gridId, (grid) => {
									const gridId = String(grid.id) ?? "";
									dispatch.options.modify({
										name: "grid",
										data: { ...grid, id: gridId, gridId }
									});
								});
							}
						});
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

