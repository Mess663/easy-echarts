import React, { useEffect, useMemo, useRef } from "react";
import css from "./index.module.less";
import * as echarts from "echarts";
import useRefSize from "../../hooks/dom/useRefSize";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import { ComponentType } from "../../types/biz/compont";
import useTitleDragEvent from "./hooks/useTitleDragEvent";
import { State } from "../../models/options";
import { isArray, isFunction, isNumber, omit } from "lodash";

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

const setGraphic = (myEchart: echarts.ECharts, gridIndex: number) => {
	const { grid } = myEchart.getOption() as echarts.EChartsOption;
	const g = isArray(grid) ? [...grid] : [grid];
	const curGrid = g[gridIndex];
	if (!curGrid) return;
	const { left = 0, top = 0, right = 0, bottom = 0 } = curGrid;
	const width = myEchart.getWidth();
	const height = myEchart.getHeight();
	const r = isNumber(right) ? right : width * (parseFloat(right) / 100);
	const b = isNumber(bottom) ? bottom : height * (parseFloat(bottom) / 100);
	console.log(grid, gridIndex, [width - r, height - b]);
	myEchart.setOption({
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
					g[gridIndex] = {
						...g[gridIndex],
						right: width - e.target.x,
						bottom: height - e.target.y,
					};
					myEchart.setOption({
						grid: g
					});
				},
			}
		]
	} as echarts.EChartsOption);
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
			series: series.map((o) => ({
				type: o.type,
			})),
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
						const o = echartObjRef.current;
						o.setOption(echartsOption);
						o.on("mousedown", (e) => {
							const name = e.componentType as keyof RootState["optionView"];
							console.log(name, e.componentIndex);
							dispatch.optionView.select({ name, index: e.componentIndex });
							onEvent(ComponentType.Title, onMousedown)(e);
						});
						o.getZr().on("mousemove", onMousemove);
						o.getZr().on("mouseup", onMouseup);
						o.getZr().on("mousedown", (e) => {
							const { offsetX, offsetY } = e;
							const { grid } = o.getOption() as echarts.EChartsOption;
							const arrGrid = isArray(grid) ? grid : [grid];
							let i;
							arrGrid.forEach((_, gridIndex) => {
								if (o.containPixel({ gridIndex }, [offsetX, offsetY])) {
									i = gridIndex;
								}
							});
							if (isNumber(i)) {
								setGraphic(o, i);
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

