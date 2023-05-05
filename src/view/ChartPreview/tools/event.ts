import { ComponentType } from "../../../types/biz/compont";

/**
 * 用一个阀门状态使得echarts事件和zrender事件只执行其中一个
 * @returns 一个阀门函数，每次调用都会返回上一次的状态
 */
const valveGenerator = () => {
	let valveClose = true;
	return () => {
		const oldFlag = valveClose;
		valveClose = !valveClose;
		return oldFlag;
	};
};

export const isMousedownValveClose = valveGenerator();

/**
 * 依次执行一系列函数
 * @param fns
 * @returns
 */
export const eachInvoke = <T,>(...fns: ((p: T) => void)[]) => (p: T) => {
	fns.forEach(fn => fn(p));
};

/**
 * 事件过滤器
 * @param type
 * @param cb
 */
export const onEvent = <T extends echarts.ECElementEvent>(type: ComponentType, cb: ((e: T) => void)) =>
	(e: T) => {
		if (e.componentType === type) {
			cb(e);
		}
	};