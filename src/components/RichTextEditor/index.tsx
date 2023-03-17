import css from "./index.module.less";
import { createEditor, Text } from "slate";
import { Slate, Editable, withReact, RenderLeafProps, RenderElementProps } from "slate-react";
import { useMemo, useState } from "react";
import { CustomElement } from "./type";
import ToolBar from "./components/ToolBar";
import { withHistory } from "slate-history";
import { transformToRich, transformToSchema } from "./tools/transform";

const Element = ({ children, attributes }: RenderElementProps) => {
	return (
		<p {...attributes}>{children}</p>
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
				<ToolBar />
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
