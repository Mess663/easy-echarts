// type Arr1 = ToArr<3>; // [number, number, number]
type ToArr<N, Arr extends number[] = []>
    = Arr["length"] extends N // 判断数组长度是否达到
				? Arr // 长度够则直接返回
				: ToArr<N, [...Arr, number]>; // 长度不够则递归

// 加法
type Add<A extends number, B extends number> = [...ToArr<A>, ...ToArr<B>]["length"];
type AddOne<T extends number> = Add<T, 1> extends number ? Add<T, 1> : never;

/**
 * 将一个对象的所有属性路径转换为字符串数组
 * 为了防止嵌套过深，写死只支持最多两层嵌套
 *
 * @example { a: { b: { c: number } } } => ['a', 'a.b', 'a.b.c']
 */
export type KeyPaths<Obj, PresetDeps = 2, Deps extends number = 0> = Deps extends PresetDeps ? never : Obj extends object
	? keyof Obj extends infer Key
		? Key extends string
			? `${Key}` | `${Key}.${KeyPaths<Obj[Extract<Key, keyof Obj>], PresetDeps, AddOne<Deps>>}` : never : never : never;

/**
 * 去掉对象值中的数组
 *
 * @example { a: number[] } => { a: number }
 */
export type ObjectValueNotArray<T> = {
  [K in keyof T]: T[K] extends Array<infer U> ? U : T[K]
};