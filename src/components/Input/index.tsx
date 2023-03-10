import React, { InputHTMLAttributes } from "react";
import css from "./index.module.less";
import classNames from "classnames";

const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
	return <input className={classNames(css.titleInput, className)} {...props} />;
};

export default Input;