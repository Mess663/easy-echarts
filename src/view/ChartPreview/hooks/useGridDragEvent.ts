import useDragEvent from "../../../hooks/dom/useDragEvent";
import { Size } from "../../../types/common";
import { gridPercent2Num } from "../tools/grid";

type GridPadSize = ReturnType<typeof gridPercent2Num>
type DownTransformResult = {
	downX: number,
	downY: number,
	gridPadSize: GridPadSize,
	gridId: string
}

interface DiyDownEvent extends echarts.ElementEvent {
	grid: echarts.GridComponentOption
}

const useGridDragEvent = (
	size: Size | undefined,
	callback: (p: GridPadSize & {gridId: string}) => void
) => {
	const onEvent = useDragEvent({
		downTransform(e: DiyDownEvent): DownTransformResult {
			const { offsetX = 0, offsetY = 0, grid } = e;
			return {
				downX: offsetX,
				downY: offsetY,
				gridPadSize: gridPercent2Num(grid, size),
				gridId: String(grid.id)
			};
		},
		moveTransform(e: echarts.ElementEvent, offset: DownTransformResult) {
			const { downX, downY, gridPadSize, gridId } = offset;
			const { top, left, bottom, right } = gridPadSize;
			const { offsetX = 0, offsetY = 0 } = e;
			const x = offsetX - downX;
			const y = offsetY - downY;
			return {
				top: top + y,
				bottom: bottom - y,
				left: left + x,
				right: right - x,
				gridId
			};
		},
	}, callback);

	return onEvent;
};

export default useGridDragEvent;