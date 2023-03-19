import React from "react";
import css from "./index.module.less";
import classNames from "classnames";

interface Props {
  icon?: string
  isActive?: boolean
  onClick?: () => void
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

const ToolBtn = ({ icon, isActive = true, onClick, children, className }: Props) => {
	return (
		<div
			className={classNames(css.btn, className, {
				[css.active]: isActive
			})}
			onClick={onClick}
		>
			{
				children ? children : (
					<img
						src={icon}
					/>
				)
			}
		</div>
	);
};

export default ToolBtn;