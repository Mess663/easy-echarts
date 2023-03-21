import { useMemo } from "react";
import css from "./index.module.less";
import { Transforms } from "slate";
import { PluginProps } from "../type";
import ToolBtn from "../../components/ToolBtn";
import { Listbox } from "@headlessui/react";
import IconSvg from "../../../../base/IconSvg";

const autoAlignSvg = <IconSvg name="icon-text-align-justify" />;

const configs = [
	{
		name: "left",
		icon: <IconSvg name="icon-text-align-left" />
	},
	{
		name: "center",
		icon: <IconSvg name="icon-text-align-center" />
	},
	{
		name: "right",
		icon: <IconSvg name="icon-text-align-right" />
	},
	{
		name: "auto",
		icon: autoAlignSvg
	}
] as const;

const TextAlign = ({ marks, editor }: PluginProps) => {
	const textConfig = useMemo(() => {
		if (marks?.textAlign) {
			return configs.find(o => o.name === marks.textAlign) || {
				name: "auto", icon: autoAlignSvg
			};
		}
		return { value: 0, icon: autoAlignSvg };
	}, [marks?.textAlign]);
	return (
		<div className={css.listbox}>
			<Listbox
				onChange={(e: (typeof configs)[number]) => {
					if (e.name === "auto") {
						Transforms.setNodes(editor, {
							textAlign: undefined
						});
					}
					else {
						Transforms.setNodes(editor, {
							textAlign: e.name
						});
					}
				}}
			>
				<Listbox.Button title="文本对齐" className={css.btn}>
					{
						textConfig.icon ? (
							<ToolBtn>{textConfig.icon}</ToolBtn>
						) : (
							<ToolBtn className={css.diyFontSizeIcon}>
								{autoAlignSvg}
							</ToolBtn>
						)
					}
				</Listbox.Button>
				<Listbox.Options className={css.options}>
					{
						configs.filter(o => o.name !== textConfig.name).map((config) => (
							<Listbox.Option
								className={css.option}
								key={config.name}
								value={config}
							>
								<ToolBtn>{config.icon}</ToolBtn>
							</Listbox.Option>
						))
					}
				</Listbox.Options>
			</Listbox>
		</div>
	);
};

export default TextAlign;