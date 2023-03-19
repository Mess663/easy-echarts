import React, { useMemo, useState } from "react";
import css from "./index.module.less";
import { Editor } from "slate";
import { PluginProps } from "../type";
import ToolBtn from "../../components/ToolBtn";
import { Listbox } from "@headlessui/react";
import normalTextSvg from "../../icon/text.svg";
import h1Svg from "../../icon/heading-h1.svg";
import h2Svg from "../../icon/heading-h2.svg";
import h4Svg from "../../icon/heading-h4.svg";

const configs = [
	{
		name: "H1",
		value: 32,
		icon: h1Svg
	},
	{
		name: "H2",
		value: 24,
		icon: h2Svg
	},
	{
		name: "H4",
		value: 16,
		icon: h4Svg
	},
	{
		name: "Normal",
		value: 0,
		icon: normalTextSvg
	}
] as const;

const FontSize = ({ marks, editor }: PluginProps) => {
	console.log(marks?.fontSize);
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
							<ToolBtn icon={fontConfig.icon}/>
						) : (
							<ToolBtn className={css.diyFontSizeIcon}>
								<img src={normalTextSvg} />
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
								<ToolBtn icon={config.icon} />
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