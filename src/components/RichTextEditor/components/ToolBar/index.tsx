import { useSlate } from "slate-react";
import { Editor } from "slate";
import css from "./index.module.less";
import FontWeight from "../../plugin/FontWeight";
import FontSize from "../../plugin/FontSize";
import { createElement } from "react";

const Tools = [
	FontWeight,
	FontSize,
];

const ToolBar = () => {
	const editor = useSlate();
	const marks = Editor.marks(editor);
	return (
		<div className={css.container}>
			{
				Tools.map((Comp, index) => createElement(Comp, { key: index, editor, marks }))
			}
		</div>
	);
};

export default ToolBar;