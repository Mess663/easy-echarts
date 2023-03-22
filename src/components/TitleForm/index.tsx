import css from "./index.module.less";
import { EchartsRich, Title } from "../../types/biz/option_form";
import RichTextEditor from "../RichTextEditor";
import { useMemo } from "react";
import FormItem from "../../base/FormItem";
import IconSvg from "../../base/IconSvg";
import TitleLink from "./components/TitleLink";
import { Switch } from "antd";


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

	const onChange = (newData: Partial<Title>) => {
		edit({ ...data, ...newData });
	};

	return (
		<div className={css.container}>
			<div className={css.top}>
				<button
					className={css.removeBtn}
					onClick={() => remove(data._key)}
				>
					<IconSvg className={css.icon} name="icon-shanchu" />
					删除当前标题</button>
				<div className={css.titleIndex}>
					预览区点击标题可编辑：
					{titleIndexStr}
				</div>
			</div>

			<FormItem>
				<RichTextEditor
					initialValue={initialValue}
					key={data._key}
					onChange={(e) => {
						const op = RichTextEditor.transformToRich(e);
						onChange ({
							text: op.text,
							textStyle: {
								rich: op.style,
							}
						});
					}}
				/>
			</FormItem>

			<FormItem title={"标题链接"} hash="title.link">
				<TitleLink link={data.link} target={data.target} onChange={onChange}/>
			</FormItem>

			<FormItem align title={"可触发事件"} hash="title.triggerEvent">
				<Switch
					checked={data.triggerEvent ?? false}
					onChange={(flag) => {
						onChange({ triggerEvent: flag });
					}}
				/>
			</FormItem>
		</div>
	);
};

export default TitleForm;