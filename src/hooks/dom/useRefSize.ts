import { useSize } from "ahooks";
import { useRef } from "react";

const useRefSize = <T extends HTMLDivElement>(): readonly [React.RefObject<T>, ReturnType<typeof useSize>] => {
	const ref = useRef<T>(null);
	const size = useSize(ref);
	return [ref, size] as const;
};

export default useRefSize;
