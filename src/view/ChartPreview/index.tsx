import { useCallback, useEffect, useMemo, useRef } from "react";
import css from "./index.module.less";
import * as echarts from "echarts";
import useRefSize from "../../hooks/dom/useRefSize";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import { ComponentType } from "../../types/biz/compont";
import useTitleDragEvent from "./hooks/useTitleDragEvent";
import { isArray, isFunction, isString, isUndefined } from "lodash";
import { isOptionViewKey } from "../../models/option_view";
import { findGrid, initGraphicOption } from "./tools/grid";
import useGridDragEvent from "./hooks/useGridDragEvent";
import useGrapicDragEvent from "./hooks/useGrapicDragEvent";
import { eachInvoke, onEvent } from "./tools/event";
import { ComponentOption } from "../../types/biz/option";

const addCommonOption = <T extends ComponentOption[keyof ComponentOption]>(options: T, forCallback?: (o: T[number], i: number) => Partial<T[number]> ) => {
	return options.map((o, i) => ({
		...o,
		triggerEvent: true,
		...(isFunction(forCallback) ? forCallback(o, i) : {}),
	}));
};

const ChartPreview = () => {
	const options = useSelector((state: RootState) => state.options);
	const { grid: gridView } = useSelector((state: RootState) => state.optionView);
	const { graphic } = useSelector((state: RootState) => state.ui);
	const dispatch = useDispatch<Dispatch>();
	const echartObjRef = useRef<echarts.ECharts>();
	const [containerRef, size] = useRefSize();

	const initGraphic = useCallback((echart: echarts.ECharts | undefined, gridId: string) => {
		if (echart) {
			const graphicOption = initGraphicOption(
				echart,
				String(gridId),
			);

			if (isArray(graphicOption)) dispatch.ui.setGraphic(graphicOption);
		}
	}, [dispatch.ui]);

	const titleDragSubs = useTitleDragEvent(
		size,
		options.title,
		(output)=> {
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
	);
	const graphicDragSubs = useGrapicDragEvent(graphic, (output) => {
		const newGraphic = [...graphic];
		newGraphic[output.index] = {
			...newGraphic[output.index],
			x: output.x,
			y: output.y
		};
		dispatch.ui.setGraphic(newGraphic);
		if (size && gridView.selectedId) {
			const { width = 0, height = 0 } = size;
			dispatch.options.modifyGridRect({
				id: gridView.selectedId,
				gridId: gridView.selectedId,
				right: width - output.x,
				bottom: height - output.y,
			});
		}
	});
	const gridDragSubs = useGridDragEvent(size, (output) => {
		dispatch.options.modifyGridRect({
			id: output.gridId, ...output
		});
		
		initGraphic(echartObjRef.current, output.gridId);
	});

	useEffect(() => {
		if (size && echartObjRef.current) {
			echartObjRef.current.resize();
		}
	}, [echartObjRef, size]);

	const echartsOption = useMemo(() => {
		const { title, series, xAxis, yAxis, grid, ...common } = options;
		
		if (isUndefined(common.color)) delete common.color;

		console.log(options);
		return {
			...common,
			title: addCommonOption(title),
			xAxis: addCommonOption(xAxis).map(o => ({
				...o,
			})),
			yAxis: addCommonOption(yAxis),
			grid: addCommonOption(grid),
			series: addCommonOption(series).map(o => ({
				...o,
			})),
			animation: false,
		} as echarts.EChartsOption;
	}, [options]);

	useEffect(() => {
		if (!echartObjRef.current) return;
		echartObjRef.current.setOption({
			graphic: {
				elements: graphic
			},
			...echartsOption,
		}, true);
	}, [echartsOption, graphic]);

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
							onEvent(ComponentType.Title, titleDragSubs.onMousedown)(e);
							onEvent(ComponentType.Graphic, graphicDragSubs.onMousedown)(e);
						});
						echart.getZr().on(
							"mousemove",
							eachInvoke(titleDragSubs.onMousemove, gridDragSubs.onMousemove, graphicDragSubs.onMousemove)
						);
						echart.getZr().on(
							"mouseup",
							eachInvoke(titleDragSubs.onMouseup, gridDragSubs.onMouseup, graphicDragSubs.onMouseup)
						);
						echart.getZr().on("mousedown", (e) => {
							const { offsetX, offsetY } = e;
							const grid = findGrid(echart, offsetX, offsetY);
							if (grid && isString(grid.id)) {
								dispatch.optionView.selectGrid(grid.id);

								if (e.target) return; // 点击空白处才进行操作
								gridDragSubs.onMousedown({
									...e,
									grid
								});

								initGraphic(echart, grid.id);
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

