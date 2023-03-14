import css from "./index.module.less";
// Import the Slate editor factory.
import { createEditor, Descendant, Editor, Transforms, Text } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { useMemo, useState } from "react";
import { CustomElement } from "./type";

const Leaf = (props: RenderLeafProps) => {
	return (
		<span
			{...props.attributes}
			style={props.leaf.style}
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
	const editor = useMemo(() => withReact(createEditor()), []);
	return (
		<div className={css.container}>
			<button
				onClick={() => {
					Transforms.setNodes(
						editor,
						{ style: { color: "red" } },
						{ match: n => Text.isText(n), split: true }
					);
				}}
			>code</button>
			<button
				onClick={() => {
					Transforms.move(editor, {
						distance: 3,
						unit: "word",
						reverse: true,
					});
				}}
			>sele</button>
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
				<Editable
					className={css.editor}
					renderLeaf={props => <Leaf {...props} />}
				/>
			</Slate>
		</div>
	);
};

export default RichTextEditor;
