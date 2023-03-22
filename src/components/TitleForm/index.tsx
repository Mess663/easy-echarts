import css from "./index.module.less";
import { EchartsRich, Title } from "../../types/biz/option_form";
import RichTextEditor from "../RichTextEditor";
import { useMemo } from "react";
import FormItem from "../../base/FormItem";
import IconSvg from "../../base/IconSvg";
import TitleLink from "./components/TitleLink";
import { Switch } from "antd";
import Input from "../../base/Input";
import ColorPicker from "../../base/ColorPicker";
import { isColorString } from "../../tools/color";


interface Props {
	edit: (d: Title) => void
	remove: (_key: string) => void
	data: Title
	titleIndexStr: string
}

const mainTitleConfig: {wrapText: (t: string) => string, rich: EchartsRich} = {
	wrapText: (t: string) => `{default|${t}}`,
	rich: {
		default: {
			color: "#333",
			fontWeight: "bold",
			fontSize: 18,
		}
	}
};

const subTitleConfig: {wrapText: (t: string) => string, rich: EchartsRich} = {
	wrapText: (t: string) => `{default|${t}}`,
	rich: {
		default: {
			color: "#aaa",
			fontSize: 12,
			fontFamily: "sans-serif"
		}
	}
};

const TitleForm = ({ data, remove, edit, titleIndexStr }: Props) => {
	const mainTitle = useMemo(() => {
		if (data.textStyle?.rich) {
			return RichTextEditor.transformToSchema(data.text ?? "标题", data.textStyle.rich);
		}
		return RichTextEditor.transformToSchema(mainTitleConfig.wrapText(data.text ?? "标题"), mainTitleConfig.rich);
	}, [data.text, data.textStyle?.rich]);
	const subTitle = useMemo(() => {
		if (data.subtextStyle?.rich) {
			return RichTextEditor.transformToSchema(data.subtext ?? "", data.subtextStyle.rich);
		}
		return RichTextEditor.transformToSchema(subTitleConfig.wrapText(data.subtext ?? "副标题"), subTitleConfig.rich);
	}, [data.subtext, data.subtextStyle?.rich]);

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

			<FormItem align title={"组件id"} hash="title.id">
				<Input
					value={data.id ?? ""}
					placeholder="选填，用于option或API中引用组件"
					style={{ width: 260 }}
					onInput={(e) => {
						onChange({ id: e.currentTarget.value });
					}}
				/>
			</FormItem>

			<FormItem>
				<RichTextEditor
					initialValue={mainTitle}
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

			<FormItem align title={"背景色"} hash="title.backgroundColor">
				<ColorPicker
					color={(() => {
						const { backgroundColor } = data;
						return isColorString(backgroundColor) ? backgroundColor : undefined;
					})()}
					onChange={(e) => {
						onChange({ backgroundColor: e.hex });
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

			<FormItem align title={"zlevel（Canvas分层）"} hash="title.zlevel">
				<Input
					value={data.zlevel ?? ""}
					type='number'
					placeholder="输入数字"
					style={{ width: 170 }}
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ zlevel: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>

			<FormItem align title={"z（图形层级）"} hash="title.z">
				<Input
					value={data.z ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ z: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>
			
			<FormItem title="副标题" hash="title.subtext">
				<RichTextEditor
					initialValue={subTitle}
					key={data._key}
					placeholder="请输入副标题"
					onChange={(e) => {
						const op = RichTextEditor.transformToRich(e);
						onChange ({
							subtext: op.text,
							subtextStyle: {
								rich: op.style,
							}
						});
					}}
				/>
			</FormItem>

			<FormItem title={"副标题链接"} hash="title.sublink">
				<TitleLink link={data.sublink}
					target={data.subtarget}
					onChange={(e) => onChange({
						sublink: e.link,
						subtarget: e.target,
					})}
				/>
			</FormItem>

			<FormItem align title={"主副标题间距"} hash="title.itemGap">
				<Input
					value={data.itemGap ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ itemGap: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>
		</div>
	);
};

export default TitleForm;