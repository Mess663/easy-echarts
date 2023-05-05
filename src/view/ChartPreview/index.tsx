import { useEffect, useMemo, useRef } from "react";
import css from "./index.module.less";
import * as echarts from "echarts";
import useRefSize from "../../hooks/dom/useRefSize";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import { ComponentType } from "../../types/biz/compont";
import useTitleDragEvent from "./hooks/useTitleDragEvent";
import { State } from "../../models/options";
import { flow, isArray, isFunction } from "lodash";
import { filter as fpFilter, maxBy } from "lodash/fp";
import { isOptionViewKey } from "../../models/option_view";
import { initGraphicOption } from "./tools/grid";
import useGridDragEvent from "./hooks/useGridDragEvent";
import useGrapicDragEvent from "./hooks/useGrapicDragEvent";

const eachInvoke = <T,>(...fns: ((p: T) => void)[]) => (p: T) => {
	fns.forEach(fn => fn(p));
};

const onEvent = <T extends echarts.ECElementEvent>(type: ComponentType, cb: ((e: T) => void)) =>
	(e: T) => {
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

const findGrid = (e: echarts.ECharts, x: number, y: number) => {
	const { grid } = e.getOption() as echarts.EChartsOption;
	const arrGrid = isArray(grid) ? grid : [grid];
	const findGrid: echarts.GridComponentOption | undefined = flow(
		fpFilter((g: echarts.GridComponentOption) => e.containPixel({ gridId: g?.id }, [x, y])),
		maxBy("z")
	)(arrGrid);
	return findGrid;
};

const ChartPreview = () => {
	const { title, series, xAxis, yAxis, grid } = useSelector((state: RootState) => state.options);
	const { grid: gridView } = useSelector((state: RootState) => state.optionView);
	const { graphic } = useSelector((state: RootState) => state.ui);
	const dispatch = useDispatch<Dispatch>();
	const echartObjRef = useRef<echarts.ECharts>();
	const [containerRef, size] = useRefSize();
	const titleDragSubs = useTitleDragEvent(
		size,
		title,
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
			dispatch.options.modify({
				name: "grid",
				data: {
					id: gridView.selectedId,
					gridId: gridView.selectedId,
					right: width - output.x,
					bottom: height - output.y,
				}
			});
		}
	});
	const gridDragSubs = useGridDragEvent(size, (output) => {
		dispatch.options.modify({
			name: "grid",
			data: { id: output.gridId, ...output }
		});
	});

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
		echartObjRef.current.setOption({
			graphic: {
				elements: graphic
			},
			...echartsOption
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
							if (grid) {
								dispatch.optionView.selectGrid(String(grid.id));
								gridDragSubs.onMousedown({
									...e,
									grid
								});

								// init graphic
								const graphicOption = initGraphicOption(
									echart,
									String(grid.id),
									(grid) => {
										const gridId = String(grid.id) ?? "";
										dispatch.options.modify({
											name: "grid",
											data: { ...grid, id: gridId, gridId }
										});
									});
								if (isArray(graphicOption)) dispatch.ui.setGraphic(graphicOption);
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

