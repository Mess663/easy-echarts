// const initECharts = (dom: HTMLElement) => {
// 	const instance = echarts.init(dom, {
// 		renderer: "canvas",
// 		useDirtyRect: true,
// 	});
// 	instance.setOption(echartsOption);
// 	instance.on("mousedown", (e) => {
// 		dispatch.optionForm.selectTitle(e.componentIndex);
// 		onEvent(ComponentType.Title, onMousedown)(e);
// 	});
// 	instance.getZr().on("mousemove", onMousemove);
// 	instance.getZr().on("mouseup", onMouseup);
// };