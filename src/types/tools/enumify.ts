import { mapValues, omit } from "lodash";
import { isDev } from "../../tools/native";

type EnumCommonPattern<T> = Record<string | number, {code: number | string, val: T, default?: true}>;

type RemoveGetEnumVal<T> = {
    [K in keyof T]: K extends "$getEnumVal" | "$getEnumList" | "$map" | "$default" ? never : T[K]
};

/** 因为自制的枚举对象不能作为type，所以将其转成联合类型 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EnumifyInfer<T extends Record<string|number, any>> = RemoveGetEnumVal<T>[keyof T]["code"];

/**
 * 让枚举能带上额外的值
 * @param data 传入的枚举声明 {@link EnumCommonPattern}，必须在声明后带上 as const ，这样才能推导出枚举值
 */
export const enumify = <V, T extends EnumCommonPattern<V>>(data: Readonly<T>) => ({
	...mapValues(data, (o) => ({
		...o,
		/**
         * 枚举code比较
         *  */
		$eq(code?: T[keyof T]["code"] extends number ? number : string) {
			return code === o.code;
		},
	})),

	/**
     * 获取对应code的值
     * @param code
     */
	$getEnumVal<U>(code: EnumifyInfer<T>): U {
		return Object.values(data).find((o) => o.code === code)?.val;
	},

	/**
     *  获取枚举的完整列表
     * */
	$getEnumList(): Omit<T[keyof T], "default">[] {
		return Object.values(omit(data, ["default"]));
	},

	/**
     * 对应原生map
     *  */
	$map<U>(callbackfn: (value: T[keyof T], index: number, array: T[keyof T][]) => U, thisArg?: unknown) {
		return (Object.values(data) as T[keyof T][]).map<U>(callbackfn, thisArg);
	},

	/**
     * 获取提前设置好的默认值
     * @returns {EnumCommonPattern} defaultItem {@link EnumCommonPattern}
     */
	$default(): T[keyof T] {
		const defaultItem = Object.values(data).find((o) => o.default);

		if (isDev() && !defaultItem) {
			throw Error("枚举没设置默认值");
		}

		return defaultItem;
	},
});