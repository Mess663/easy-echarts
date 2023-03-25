export interface OptionFormProps<T> {
	edit: (d: T) => void
	remove: (_key: string) => void
	data: T // 组件配置
}