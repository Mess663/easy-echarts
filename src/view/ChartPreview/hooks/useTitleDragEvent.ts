import useDragEvent from "../../../hooks/dom/useDragEvent";
import { getBoundaryValidNum } from "../../../tools/number";
import { Title } from "../../../types/biz/option";

/**
 * 拖拽事件
 * @param param.downTransform
 * @param param.moveTransform
 * @param param.initState
 * @returns [outputState, {onMousedown, onMousemove, onMouseup}]
 */
function useTitleDragEvent(
	size: { width: number, height: number } | undefined,
	title: Title[],
	callback: (p: readonly [number, number, number]) => void
) {
	const onEvent = useDragEvent({
		downTransform(e: echarts.ECElementEvent):[number, number, number] {
			const currentTitle = title[e.componentIndex];
			const x = Number(currentTitle?.left ?? 0);
			const y = Number(currentTitle?.top ?? 0);
			const { offsetX = 0, offsetY = 0 } = e.event ?? {};
			return [offsetX - x, offsetY - y, e.componentIndex];
		},
		moveTransform(e: echarts.ElementEvent, offset: [number, number, number]) {
			if (!size) return [0, 0, 0] as const;
			const { offsetX, offsetY } = e;
			const [ firstX, firstY, index] = offset;
			return [
				getBoundaryValidNum(offsetX - firstX, 0, size.width - firstX),
				getBoundaryValidNum(offsetY - firstY, 0, size.height - firstY),
				index
			] as const;
		},
	}, callback);

	return onEvent;
}

export default useTitleDragEvent;