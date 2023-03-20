import React, { HTMLAttributes } from "react";
import css from "./index.module.less";
import classNames from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  onClick?: () => void
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  disabled?: boolean
}

const ToolBtn = ({ isActive = true, onClick, children, className, disabled, ...props }: Props) => {
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
			onClick={onClick}
			{...props}
		>
			{ children }
		</div>
	);
};

export default ToolBtn;