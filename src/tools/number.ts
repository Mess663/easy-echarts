/**
 * 解决边界计算
 * @param num 目标值
 * @param min 最小值
 * @param max 最大值
 * @returns
 */
export const getBoundaryValidNum = (num: number, min = 0, max = Infinity) => {
	return Math.max(min, Math.min(num, max));
};

/**
 * 生成全局唯一数字
 */
export const getUniqueNum = (() => {
	let num = 0;
	return () => {
		num += 1;
		return num;
	};
})();