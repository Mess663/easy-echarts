import FontColor from "./FontColor";
import FontSize from "./FontSize";
import { createTogglePlugin } from "./plugin_creator";

const FontWeight = createTogglePlugin({
	styleKey: "fontWeight",
	value: "bold",
	icon: "icon-bold"
});

const FontItalic = createTogglePlugin({
	styleKey: "fontStyle",
	value: "italic",
	icon: "icon-italic"
});

export const pluginList  = [
	FontWeight,
	FontSize,
	FontColor,
	FontItalic,
];

 