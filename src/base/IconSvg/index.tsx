import classNames from "classnames";
import React, { CSSProperties } from "react";
import css from "./index.module.less";

interface Props extends CSSProperties {
	name: string // from www.iconfont.cn
	className?: string
}

const IconSvg = ({ name: icon, className, ...style }: Props) => {
	return (
		<svg className={classNames(css.icon, className)} style={style}>
			<use xlinkHref={"#" + icon} />
		</svg>
	);
};

export default IconSvg;