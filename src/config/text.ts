// 换行符
export const LineBreaker = "\n";

// 用来特殊标记某些字符串片段
export const LeftValueSign = "$-";
export const RightValueSign = "-$";
/**
 * 包裹特殊字符串片段
 */
export const unifyString = (s: string) => LeftValueSign + s + RightValueSign;