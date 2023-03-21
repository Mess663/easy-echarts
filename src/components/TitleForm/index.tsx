import css from "./index.module.less";
import { EchartsRich, Title } from "../../types/biz/option_form";
import RichTextEditor from "../RichTextEditor";
import { useMemo } from "react";
import FormItem from "../../base/FormItem";


interface Props {
	edit: (d: Title) => void
	remove: (_key: string) => void
	data: Title
	titleIndexStr: string
}

const initConfig: {wrapText: (t: string) => string, rich: EchartsRich} = {
	wrapText: (t: string) => `{default|${t}}`,
	rich: {
		default: {
			color: "#333",
			fontWeight: "bold",
			fontSize: 18,
		}
	}
};

const TitleForm = ({ data, remove, edit, titleIndexStr }: Props) => {
	const initialValue = useMemo(() => {
		if (data.textStyle?.rich) {
			return RichTextEditor.transformToSchema(data.text ?? "标题", data.textStyle.rich);
		}
		return RichTextEditor.transformToSchema(initConfig.wrapText(data.text ?? "标题"), initConfig.rich);
	}, [data.text, data.textStyle?.rich]);

	return (
		<div className={css.container}>
			<div className={css.top}>
				<button
					className={css.removeBtn}
					onMouseDown={() => {
						remove(data._key);
					}}
				>删除当前标题</button>
				<div className={css.titleIndex}>
					预览区点击标题可编辑：
					{titleIndexStr}
				</div>
			</div>

			<FormItem>
				<RichTextEditor
					initialValue={initialValue}
					key={titleIndexStr}
					onChange={(e) => {
						const op = RichTextEditor.transformToRich(e);
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