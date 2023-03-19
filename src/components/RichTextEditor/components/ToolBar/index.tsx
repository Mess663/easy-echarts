import css from "./index.module.less";
import FontWeight from "../../plugin/FontWeight";
import FontSize from "../../plugin/FontSize";
import { createElement } from "react";
import { PluginProps } from "../../plugin/type";
import FontColor from "../../plugin/FontColor";

const Tools = [
	FontWeight,
	FontSize,
	FontColor,
];

const ToolBar = (props: PluginProps) => {
	return (
		<div className={css.container}>
			{
				Tools.map((Comp, index) => createElement(Comp, { key: index, ...props }))
			}
		</div>
	);
};

export default ToolBar;