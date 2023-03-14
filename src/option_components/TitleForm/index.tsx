import FormItem from "../../components/FormItem";
import css from "./index.module.less";
import { Title } from "../../types/biz/option_form";
import { useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";


interface Props {
	edit: (d: Title) => void
	remove: (_key: string) => void
	data: Title
}

const TitleForm = ({ data, remove }: Props) => {
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

			<FormItem>
				<RichTextEditor />
			</FormItem>
		</div>
	);
};

export default TitleForm;