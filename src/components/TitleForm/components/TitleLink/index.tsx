import { Listbox } from "@headlessui/react";
import React from "react";
import IconSvg from "../../../../base/IconSvg";
import Input from "../../../../base/Input";
import { Title } from "../../../../types/biz/option_form";
import css from "./index.module.less";

const options = [
	{ name: "新窗口打开", value: "blank" },
	{ name: "当前窗口打开", value: "self" },
];

type Data = Pick<Title, "link" | "target">

interface Props {
	link?: string,
	target?: Title["target"],
	onChange: (d: Data) => void
}

const TitleLink = ({ link, target, onChange }: Props) => {
	const name = options.find(o => o.value === target)?.name || options[0].name;
	return (
		<div className={css.container}>
			<Input
				className={css.input}
				placeholder="请带上http://或https://"
				value={link || ""}
				onInput={(e) => {
					onChange({
						target,
						link: e.currentTarget.value
					});
				}}
			/>
			<button
				className={css.btn}
				title="点击切换"
				onClick={() => {
					onChange({
						link,
						target: target === "blank" ? "self" : "blank"
					});
				}}
			>
				{name}<IconSvg className={css.icon} name="icon-jiantou_zuoyouqiehuan" />
			</button>
		</div>
	);
};

export default TitleLink;