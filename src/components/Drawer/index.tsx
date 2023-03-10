import React from "react";
import css from "./index.module.less";
import { Disclosure } from "@headlessui/react";
import { useWhyDidYouUpdate } from "ahooks";

interface Props {
	title: string | React.ReactNode
	children: React.ReactNode | React.ReactNode
	defaultOpen?: boolean // 默认展开
	extra?: React.ReactNode // 与标题同行的额外的组件
}

const Drawer = ({ title, children, defaultOpen: defaultExpand = false, extra }: Props) => {
	// const [expand, setExpand] = useState(defaultExpand);
	// const [contentRef, size] =  useRefSize();

	return (
		<Disclosure defaultOpen={defaultExpand}>
			<Disclosure.Button className={css.trigger}>
				{title}
				{extra}
			</Disclosure.Button>
			<Disclosure.Panel className={css.content}>
				{children}
			</Disclosure.Panel>
		</Disclosure>
	);

	// return (
	// 	<div className={css.container}>
	// 		<div className={css.trigger} onClick={() => setExpand(o => !o)}>
	// 			{title}
	// 		</div>

	// 		<div
	// 			className={css.content}
	// 			style={{
	// 				height: expand ? size?.height : 0
	// 			}}
	// 		>
	// 			<div className={css.inner} ref={contentRef}>
	// 				{children}
	// 				<div style={{ height: 200 }}></div>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};

export default React.memo(Drawer);