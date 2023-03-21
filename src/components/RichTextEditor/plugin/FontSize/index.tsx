import { useMemo } from "react";
import css from "./index.module.less";
import { Editor } from "slate";
import { PluginProps } from "../type";
import ToolBtn from "../../components/ToolBtn";
import { Listbox } from "@headlessui/react";
import IconSvg from "../../../../base/IconSvg";
import Input from "../../../../base/Input";

const normalTextSvg = <IconSvg name="icon-text" />;

const configs = [
	{
		name: "H1",
		value: 32,
		icon: <IconSvg name="icon-heading-h1" />
	},
	{
		name: "H2",
		value: 24,
		icon: <IconSvg name="icon-heading-h2" />
	},
	{
		name: "H4",
		value: 16,
		icon: <IconSvg name="icon-heading-h4" />
	},
	{
		name: "Normal",
		value: 0,
		icon: normalTextSvg
	}
] as const;

const FontSize = ({ marks, editor }: PluginProps) => {
	const fontConfig = useMemo(() => {
		if (marks?.fontSize) {
			return configs.find(o => o.value === marks.fontSize) || {
				value: marks.fontSize, icon: null
			};
		}
		return { value: 0, icon: normalTextSvg };
	}, [marks?.fontSize]);
	return (
		<div className={css.listbox}>
			<Listbox
				onChange={(e: (typeof configs)[number]) => {
					if (e.name === "Normal") {
						editor.removeMark("fontSize");
					}
					else {
						editor.addMark("fontSize", e.value);
					}
				}}
			>
				<Listbox.Button title={"字体大小"} className={css.btn}>
					{
						fontConfig.icon ? (
							<ToolBtn>{fontConfig.icon}</ToolBtn>
						) : (
							<ToolBtn className={css.diyFontSizeIcon}>
								{normalTextSvg}
								{fontConfig.value}
							</ToolBtn>
						)
					}
				</Listbox.Button>
				<Listbox.Options className={css.options}>
					{
						configs.filter(o => o.icon !== fontConfig.icon).map((config) => (
							<Listbox.Option
								className={css.option}
								key={config.name}
								value={config}
							>
								<ToolBtn>{config.icon}</ToolBtn>
							</Listbox.Option>
						))
					}
					<Listbox.Option
						className={css.diyOption}
						key={-1}
						value={{ value: 0, icon: null }}
						disabled
					>
						自定义：
						<Input
							value={fontConfig.value}
							placeholder={"自定义"}
							type="number"
							onMouseDown={(e) => { e.stopPropagation(); }}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (isNaN(value)) {
									return;
								}
								Editor.addMark(editor, "fontSize", value);
							}}
						/>
						<span className={css.px}>px</span>
					</Listbox.Option>
				</Listbox.Options>
			</Listbox>
		</div>
	);
};

export default FontSize;