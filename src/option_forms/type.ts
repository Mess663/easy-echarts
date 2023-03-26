export interface OptionFormProps<T> {
	edit: (d: T) => void
	remove: (id: string) => void
	data: T // 组件配置
}