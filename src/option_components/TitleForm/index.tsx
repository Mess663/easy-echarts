import FormItem from "../../components/FormItem";
import Input from "../../components/Input";
import css from "./index.module.less";
import { Title } from "../../types/biz/option_form";

interface Props {
	add: (d: Omit<Title, "_key">) => void
	edit: (d: Title) => void
	remove: (_key: string) => void
	data: Title[]
}

const TitleForm = ({ add, edit, data, remove }: Props) => {
	if (!data.length) return (
		<button
			onClick={() => {
				add({
					text: "标题",
				});
			}}
		>添加标题</button>
	);

	const title = data[0];
	return (
		<div className={css.container}>
			<button
				className={css.removeBtn}
				onClick={() => {
					remove(title._key);
				}}
			>删除当前标题</button>
			<FormItem title="图表标题">
				<Input
					placeholder="输入标题"
					value={title.text}
					onChange={(e) => {
						edit({
							_key: title._key,
							text: e.target.value
						});
					}}
				/>
			</FormItem>
		</div>
	);
};

export default TitleForm;