import React from "react";
import css from "./index.module.less";
import { Popover as HeadlessPopover, PopoverButtonProps, PopoverProps } from "@headlessui/react";

const elemtTag = "div";
type ElemtTag = typeof elemtTag;

interface Props {
	children: React.ReactNode;
	panel: React.ReactNode;
	popoverProps?: PopoverProps<ElemtTag>;
	buttonProps?: PopoverButtonProps<ElemtTag>;
	panelProps?: PopoverButtonProps<ElemtTag>;
}

/**
 * 对 headless Popover 的封装，透传所有 props
 */
const Popover = ({ children, panel, popoverProps, buttonProps, panelProps }: Props) => {
	return (
		<HeadlessPopover className={css.container} {...popoverProps}>
			<HeadlessPopover.Button as={elemtTag} {...buttonProps}>
				{children}
			</HeadlessPopover.Button>

			<HeadlessPopover.Panel className={css.panel} {...panelProps}>
				{panel}
			</HeadlessPopover.Panel>
		</HeadlessPopover>
	);
};

export default Popover;