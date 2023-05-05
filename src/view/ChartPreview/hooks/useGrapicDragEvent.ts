
import { get } from "lodash";
import useDragEvent from "../../../hooks/dom/useDragEvent";
import { Size } from "../../../types/common";

type DownTransformResult = {
	downX: number,
	downY: number,
	index: number, // 组件索引
	grapicX: number, // 按下按钮时组件x坐标
	grapicY: number, // 按下按钮时组件y坐标
}

const useGrapicDragEvent = (
	grapic: echarts.GraphicComponentOption[],
	callback: (p: { x: number, y: number, index: number}) => void
) => {
	const onEvent = useDragEvent({
		downTransform(e: echarts.ECElementEvent): DownTransformResult {
			const { offsetX = 0, offsetY = 0 } = e.event ?? {};
			return {
				downX: offsetX,
				downY: offsetY,
				index: e.componentIndex,
				grapicX: get(grapic, [e.componentIndex, "x"], 0),
				grapicY: get(grapic, [e.componentIndex, "y"], 0),
			};
		},
		moveTransform(e: echarts.ElementEvent, offset: DownTransformResult) {
			const { downX: x, downY: y, index, grapicX, grapicY } = offset;
			const { offsetX = 0, offsetY = 0 } = e;
			return {
				x: grapicX + offsetX - x,
				y: grapicY + offsetY - y,
				index,
			};
		},
	}, callback);

	return onEvent;
};

export default useGrapicDragEvent;