import css from "./index.module.less";
import { createElement } from "react";
import { PluginProps } from "../../plugin/type";
import { pluginList } from "../../plugin";

interface Props extends PluginProps {
	plugins: typeof pluginList
}

const ToolBar = ({ plugins, ...props }: Props) => {
	return (
		<div className={css.container}>
			{
				plugins.map((Comp, index) => createElement(Comp, { key: index, ...props }))
			}
		</div>
	);
};

export default ToolBar;