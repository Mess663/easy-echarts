import FormItem from "../../components/FormItem";
import css from "./index.module.less";
import { Title } from "../../types/biz/option_form";
import { useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import { transformRichToSchema, transformSchemaToRich } from "../../tools/rich_transform";


interface Props {
	edit: (d: Title) => void
	remove: (_key: string) => void
	data: Title
}

const initialValue =  transformRichToSchema("{a|这段文本采用样式a}\n{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}",{
	a: {
		color: "red",
		lineHeight: 10
	},
	b: {
		backgroundColor: {
			image: "xxx/xxx.jpg"
		},
		height: 40
	},
	x: {
		fontSize: 18,
		fontFamily: "Microsoft YaHei",
		borderColor: "#449933",
		borderRadius: 4
	} });

const TitleForm = ({ data, remove, edit }: Props) => {
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
				<RichTextEditor
					initialValue={initialValue}
					onChange={(e) => {
						const op = transformSchemaToRich(e);
						edit({
							...data,
							text: op.text,
							textStyle: {
								rich: op.style,
							}
						});
					}}
				/>
			</FormItem>
		</div>
	);
};

export default TitleForm;