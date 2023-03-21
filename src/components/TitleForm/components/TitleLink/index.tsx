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

const TitleLink = ({ data, onChange }: {data: Data, onChange: (d: Data) => void}) => {
	const name = options.find(o => o.value === data.target)?.name || options[0].name;
	return (
		<div className={css.container}>
			<Input
				className={css.input}
				placeholder="请输入"
				value={data.link || ""}
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
					onChange({
						...data,
						link: e.target.value
					});
				}}
			/>
			<button
				className={css.btn}
				title="点击切换"
				onClick={() => {
					onChange({
						...data,
						target: data.target === "blank" ? "self" : "blank"
					});
				}}
			>
				{name}<IconSvg className={css.icon} name="icon-jiantou_zuoyouqiehuan" />
			</button>
		</div>
	);
};

export default TitleLink;