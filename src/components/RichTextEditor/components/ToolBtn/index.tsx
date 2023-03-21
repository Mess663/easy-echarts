import React, { HTMLAttributes } from "react";
import css from "./index.module.less";
import classNames from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  disabled?: boolean
  hoverTitle?: string
}

const ToolBtn = ({
	isActive = true, onMouseDown, children, className, disabled, ...props
}: Props) => {
	if (disabled) return (
		<div className={classNames(css.btn, css.disabled, className)}>
			{children}
		</div>
	);
	return (
		<div
			className={classNames(css.btn, className, {
				[css.active]: isActive
			})}
			onMouseDown={(e) => {
				// 防止点击按钮时，编辑器失去焦点，导致选中项目被取消
				e.preventDefault();
				if (onMouseDown) onMouseDown(e);
			}}
			{...props}
		>
			{ children }
		</div>
	);
};

export default ToolBtn;