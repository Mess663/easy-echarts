import React, { useState } from "react";
import css from "./index.module.less";
import classnames from "classnames";
import useRefSize from "../../hooks/useRefSize";
import { Disclosure, Transition } from "@headlessui/react";

interface Props {
  title: string | React.ReactNode
  children: React.ReactNode | React.ReactNode
  defaultExpand?: boolean // 默认展开
}

const Drawer = ({title, children, defaultExpand = false}: Props) => {
	const [expand, setExpand] = useState(defaultExpand);
	const [contentRef, size] =  useRefSize();

	return (
		<Disclosure defaultOpen={defaultExpand}>
			<Disclosure.Button className={css.trigger}>
				{title}
			</Disclosure.Button>
			<Disclosure.Panel className={css.content}>
				{children}
			</Disclosure.Panel>
		</Disclosure>
	);

	return (
		<div className={css.container}>
			<div className={css.trigger} onClick={() => setExpand(o => !o)}>
				{title}
			</div>

			<div 
				className={css.content} 
				style={{
					height: expand ? size?.height : 0
				}}
			>
				<div className={css.inner} ref={contentRef}>
					{children}
					<div style={{height: 200}}></div>
				</div>
			</div>
		</div>
	);
};

export default Drawer;