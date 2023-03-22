export interface OptionFormProps<T> {
	edit: (d: T) => void
	remove: (_key: string) => void
	data: T // 组件配置
	indexObj: {
        index: number // 组件索引
        length: number // 组件配置数组长度
    }
}