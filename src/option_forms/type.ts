import FormItem from "../base/FormItem";

export interface OptionFormProps<T> {
	edit: (d: T) => void
	remove: (id: string) => void
	data: T // 组件配置
}

/**
 * 配置属性调用链路字符串
 */
export type FormItemHash = React.ComponentProps<typeof FormItem>["hash"]