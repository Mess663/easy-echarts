import css from "./index.module.less";
import FontWeight from "../../plugin/FontWeight";
import FontSize from "../../plugin/FontSize";
import { createElement } from "react";
import { PluginProps } from "../../plugin/type";

const Tools = [
	FontWeight,
	FontSize,
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