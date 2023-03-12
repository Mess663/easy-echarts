import { useLatest } from "ahooks";
import { identity } from "lodash";
import { useObservableCallback, useObservableState } from "observable-hooks";
import { map, switchMap, takeUntil } from "rxjs";

interface Param<DownEvent, MoveEvent, DownReturn, MoveReturn> {
    downTransform: (e: DownEvent) => DownReturn,
    moveTransform: (e: MoveEvent, targetOffset: DownReturn) => MoveReturn,
    // initState?: MoveReturn,
}

// type MouseEvent<M, D> = {
// 	onMousedown: (e: D) => void;
// 	onMousemove: (e: M) => void;
// 	onMouseup: (e: M) => void;
// }

/**
 * 拖拽事件
 * @param param.downTransform
 * @param param.moveTransform
 * @param param.initState
 * @returns [outputState, {onMousedown, onMousemove, onMouseup}]
 */
function useDragEvent<DownEvent, MoveEvent, DownReturn, MoveReturn>(
	param: Param<DownEvent, MoveEvent, DownReturn, MoveReturn>
) {
	const paramRef = useLatest(param);
	const [onMousemove, mousemove$] = useObservableCallback<MoveEvent>(identity);
	const [onMouseup, mouseup$] = useObservableCallback<MoveEvent>(identity);
	const [output, onMousedown] = useObservableState<MoveReturn, DownEvent>(
		(mousedown$) => mousedown$.pipe(
			map(downEvent => paramRef.current.downTransform(downEvent)),
			switchMap((downTargetOffset) => mousemove$.pipe(
				map((moveEvent) => paramRef.current.moveTransform(moveEvent, downTargetOffset)),
				takeUntil(mouseup$)
			)),
		)
	);

	return [output , {
		onMousedown,
		onMousemove,
		onMouseup,
	}] as const;
}

export default useDragEvent;