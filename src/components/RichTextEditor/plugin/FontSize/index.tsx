import { useMemo } from "react";
import css from "./index.module.less";
import { Editor } from "slate";
import { PluginProps } from "../type";
import ToolBtn from "../../components/ToolBtn";
import { Listbox } from "@headlessui/react";
import IconSvg from "../../../../base/IconSvg";

const configs = [
	{
		name: "H1",
		value: 32,
		icon: <IconSvg name="#icon-heading-h4" />
	},
	{
		name: "H2",
		value: 24,
		icon: <IconSvg name="#icon-heading-h1" />
	},
	{
		name: "H4",
		value: 16,
		icon: <IconSvg name="icon-heading-h1" />
	},
	{
		name: "Normal",
		value: 0,
		icon: <IconSvg name="icon-heading-h1" />
	}
] as const;

const normalTextSvg = <IconSvg name="icon-text" />;

const FontSize = ({ marks, editor }: PluginProps) => {
	const fontConfig = useMemo(() => {
		if (marks?.fontSize) {
			return configs.find(o => o.value === marks.fontSize) || {
				value: marks.fontSize, icon: null
			};
		}
		return { value: 0, icon: normalTextSvg };
	}, [marks?.fontSize]);
	console.log(fontConfig.icon);
	return (
		<div className={css.listbox}>
			<Listbox
				onChange={(e: (typeof configs)[number]) => {
					if (e.name === "Normal") {
						Editor.removeMark(editor, "fontSize");
					}
					else {
						Editor.addMark(editor, "fontSize", e.value);
					}
				}}
			>
				<Listbox.Button className={css.btn}>
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
								<ToolBtn>{fontConfig.icon}</ToolBtn>
							</Listbox.Option>
						))
					}
					<Listbox.Option
						className={css.diyOption}
						key={-1}
						value={{ value: 0, icon: null }}
						disabled
					>
						自定义:
						<input
							value={fontConfig.value}
							placeholder={"自定义"}
							type="number"
							onClick={(e) => { e.stopPropagation(); }}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (isNaN(value)) {
									return;
								}
								Editor.addMark(editor, "fontSize", value);
							}}
						/>
					</Listbox.Option>
				</Listbox.Options>
			</Listbox>
		</div>
	);
};

export default FontSize;