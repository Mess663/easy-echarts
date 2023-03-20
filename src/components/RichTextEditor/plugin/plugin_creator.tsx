import { CSSProperties } from "react";
import ToggleBtn from "../components/ToggleBtn";
import { PluginProps } from "./type";

/**
 * 快速创建样式控件
 */
export const createTogglePlugin = <T extends keyof CSSProperties>(creatorProps: {
    styleKey: T,
	value: CSSProperties[T],
	icon: string,
}) => {
	const Plugin =  (pluginProps: PluginProps) => <ToggleBtn {...creatorProps} {...pluginProps} />;
	return Plugin;
};