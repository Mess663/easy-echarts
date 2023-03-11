import FormItem from "../../components/FormItem";
import Input from "../../components/Input";
import css from "./index.module.less";
import { Title } from "../../types/biz/option_form";

interface Props {
	edit: (d: Title) => void
	remove: (_key: string) => void
	data: Title
}

const TitleForm = ({ edit, data, remove }: Props) => {
	return (
		<div className={css.container}>
			<div className={css.top}>
				<button
					className={css.removeBtn}
					onClick={() => {
						remove(data._key);
					}}
				>删除当前标题</button>
			</div>

			<FormItem title="图表标题">
				<Input
					placeholder="输入标题"
					value={data.text}
					onChange={(e) => {
						edit({
							_key: data._key,
							text: e.target.value
						});
					}}
				/>
			</FormItem>
		</div>
	);
};

export default TitleForm;