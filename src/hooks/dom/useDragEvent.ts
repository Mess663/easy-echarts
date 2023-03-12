import { identity } from "lodash";
import { useObservableCallback, useObservableState } from "observable-hooks";
import { map, switchMap, takeUntil } from "rxjs";

type MouseEvent<T, D> = {
	onMousedown: (e: D) => void;
	onMousemove: (e: T) => void;
	onMouseup: (e: T) => void;
}


/**
 * rxjs拖拽事件
 * @param transform 处理一下事件，比如获取鼠标位置
 * @param initValue 初始值
 * @returns [outputState, {onMousedown, onMousemove, onMouseup}]
 */
function useDragEvent<MoveEvent, DownEvent = MoveEvent, TState = MoveEvent>(transform: ((move: MoveEvent, down: DownEvent) => TState), initValue: TState): [TState, MouseEvent<MoveEvent, DownEvent>]
function useDragEvent<MoveEvent, DownEvent = MoveEvent, TState = MoveEvent>(transform: ((move: MoveEvent, down: DownEvent) => TState)): [TState | undefined, MouseEvent<MoveEvent, DownEvent>]
function useDragEvent<MoveEvent, DownEvent = MoveEvent, TState = MoveEvent>(transform: ((input: MoveEvent, down: DownEvent ) => TState) = identity, initValue?: TState) {
	const [onMousemove, mousemove$] = useObservableCallback<MoveEvent>(identity);
	const [onMouseup, mouseup$] = useObservableCallback<MoveEvent>(identity);
	const [output, onMousedown] = useObservableState<typeof initValue, DownEvent>(
		(mousedown$) => mousedown$.pipe(
			switchMap((downEvent) =>
				mousemove$.pipe(
					map((moveEvent) => [moveEvent, downEvent] as const),
					takeUntil(mouseup$)
				)),
			map((events) => transform(...events)),
		)
		, initValue
	);

	return [output , {
		onMousedown,
		onMousemove,
		onMouseup,
	}] as const;
}

export default useDragEvent;