import React from "react";
import { Editor } from "slate";
import { HistoryEditor } from "slate-history";
import IconSvg from "../../../../base/IconSvg";
import ToolBtn from "../ToolBtn";
import css from "./index.module.less";

const HistoryController = ({ editor }: {editor: Editor}) => {
	return (
		<div className={css.container}>
			<ToolBtn
				disabled={!editor.history.undos.length}
				onClick={() => HistoryEditor.undo(editor)}
			>
				<IconSvg name="icon-undo" />
			</ToolBtn>
			<ToolBtn
				disabled={!editor.history.redos.length}
				onClick={() => HistoryEditor.redo(editor)}
			>
				<IconSvg name="icon-redo" />
			</ToolBtn>
		</div>
	);
};

export default HistoryController;