import React from "react";
import css from "./index.module.less";
import { Popover } from "antd";
import Input from "../Input";
import { Shadow } from "../../types/biz/style";
import ColorPicker from "../ColorPicker";

interface Props {
	children: React.ReactElement;
	shadow: Shadow;
	onChange: (shadow?: Shadow | undefined) => void;
}

const PxElement = () => <span className={css.px}>px</span>;
const ShadowPicker = ({ children, shadow, onChange }: Props) => {
	const onInput = (key: keyof Shadow) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.currentTarget.value);
		onChange({ ...shadow, [key]: value });
	};
	return (
		<Popover
			placement="top"
			trigger={"click"}
			content={(
				<div className={css.panel}>
					<div className={css.item} >
					X：
						<Input
							value={shadow.shadowOffsetX}
							onInput={onInput("shadowOffsetX")}
						/>
						<PxElement />
					</div>
					<div className={css.item}>
					Y：
						<Input
							value={shadow.shadowOffsetY}
							onInput={onInput("shadowOffsetY")}
						/>
						<PxElement />
					</div>
					<div className={css.item}>
					模糊度：
						<Input
							value={shadow.shadowBlur}
							onInput={onInput("shadowBlur")}
						/>
						<PxElement />
					</div>
					<div className={css.item}>
					颜色：
						<ColorPicker
							color={shadow.shadowColor}
							onChange={(e) => {
								onChange({ ...shadow, shadowColor: e.hex });
							}}
						/>
					</div>
					<div className={css.item}
						onMouseDown={() => {
							onChange(undefined);
						}}
					>
						<button className={css.clear}>清除</button>
					</div>
				</div>
			)}
		>
			{children}
		</Popover>
	);
};

export default ShadowPicker;