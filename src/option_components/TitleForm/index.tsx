import FormItem from "../../components/FormItem";
import css from "./index.module.less";
import { RichStyle, Title } from "../../types/biz/option_form";
import RichTextEditor from "../../components/RichTextEditor";
import { transformRichToSchema, transformSchemaToRich } from "../../logic/style_tranform";
import { useMemo } from "react";
import { Dictionary } from "lodash";


interface Props {
	edit: (d: Title) => void
	remove: (_key: string) => void
	data: Title
}

const initConfig: {wrapText: (t: string) => string, rich: RichStyle} = {
	wrapText: (t: string) => `{default|${t}}`,
	rich: {
		default: {
			color: "#333",
			fontWeight: "bolder",
			fontSize: 18,
		}
	}
};

const TitleForm = ({ data, remove, edit }: Props) => {
	const initialValue = useMemo(() => {
		if (data.textStyle?.rich) {
			return transformRichToSchema(data.text ?? "标题", data.textStyle.rich);
		}
		return transformRichToSchema(initConfig.wrapText(data.text ?? "标题"), initConfig.rich);
	}, [data.text, data.textStyle?.rich]);

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
						console.log(op);
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