import css from "./index.module.less";
// Import the Slate editor factory.
import { createEditor, Descendant, Editor, Transforms, Text } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { useMemo, useState } from "react";


const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "A line of text in a paragraph." }],
	},
	{
		type: "shot",
		children: [{ text: "这是一个code" }],
	},
];

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

const RichTextEditor = () => {
	const editor = useMemo(() => withReact(createEditor()), []);
	return (
		<div className={css.container}>
			<button
				onClick={() => {
					Transforms.setNodes(
						editor,
						{ style: { color: "red" } },
						// Apply it to text nodes, and split the text node up if the
						// selection is overlapping only part of it.
						{ match: n => Text.isText(n), split: true }
					);
				}}
			>code</button>
			<Slate
				editor={editor}
				value={initialValue}
				onChange={(e) => {
					console.log(e);
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