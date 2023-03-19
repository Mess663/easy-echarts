import React from "react";
import css from "./index.module.less";
import classNames from "classnames";

interface Props {
  isActive?: boolean
  onClick?: () => void
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

const ToolBtn = ({ isActive = true, onClick, children, className }: Props) => {
	return (
		<div
			className={classNames(css.btn, className, {
				[css.active]: isActive
			})}
			onClick={onClick}
		>
			{ children }
		</div>
	);
};

export default ToolBtn;