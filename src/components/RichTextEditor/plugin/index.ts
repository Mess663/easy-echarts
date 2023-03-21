import FontColor from "./FontColor";
import FontSize from "./FontSize";
import LineHeight from "./LineHeight";
import { createTogglePlugin } from "./plugin_creator";
import TextAlign from "./TextAlign";
import TextShadow from "./TextShadow";

const FontWeight = createTogglePlugin({
	styleKey: "fontWeight",
	value: "bold",
	icon: "icon-bold",
	title: "加粗"
});

const FontItalic = createTogglePlugin({
	styleKey: "fontStyle",
	value: "italic",
	icon: "icon-italic",
	title: "斜体"
});

export const pluginList  = [
	FontWeight,
	FontItalic,
	FontSize,
	FontColor,
	TextShadow,
	LineHeight,
	TextAlign,
];

 