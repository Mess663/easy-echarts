import css from "./index.module.less";
import { createEditor, Editor, Text, Transforms } from "slate";
import { Slate, Editable, withReact, RenderLeafProps, RenderElementProps } from "slate-react";
import { useMemo } from "react";
import { CustomElement } from "./type";
import ToolBar from "./components/ToolBar";
import { withHistory } from "slate-history";
import { transformToRich, transformToSchema } from "./tools/transform";
import { pluginList } from "./plugin";
import { omit } from "lodash";
import ControlBar from "./components/ControlBar";

const Element = (props: RenderElementProps) => {
	const { children, attributes, element } = props;
	return (
		<p {...attributes} style={omit(element, ["children", "type"])}>{children}</p>
	);
};

const Leaf = (props: RenderLeafProps) => {
	return (
		<span
			{...props.attributes}
			style={props.leaf}
		>
			{props.children}
		</span>
	);
};

interface Props {
	initialValue?: CustomElement[];
	onChange: (value: CustomElement[]) => void;
}

const RichTextEditor = ({ onChange, initialValue }: Props) => {
	const editor = useMemo(() => withReact(withHistory(createEditor())), []);
	const marks = Editor.marks(editor);

	return (
		<div className={css.container}>
			<Slate
				editor={editor}
				value={initialValue ?? []}
				onChange={(e) => {
					onChange(e.map((o) => {
						if (Text.isText(o)) {
							return {
								type: "paragraph",
								children: [o],
							};
						}
						return o;
					}));
				}}
			>
				<div className={css.toolWrap}>
					<ToolBar
						editor={editor}
						marks={marks}
						plugins={pluginList}
					/>
					<ControlBar
						editor={editor}
					/>
				</div>
				<Editable
					className={css.editor}
					renderLeaf={Leaf}
					renderElement={Element}
				/>
			</Slate>
		</div>
	);
};

RichTextEditor.transformToSchema = transformToSchema;
RichTextEditor.transformToRich = transformToRich;

export default RichTextEditor;
