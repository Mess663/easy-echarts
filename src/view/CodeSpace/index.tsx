import React from "react";
import css from "./index.module.less";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";
import { RootState } from "../../models";
import { Button, message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CodeSpace = () => {
	const options = useSelector((state: RootState) => state.options);
	return (
		<div className={css.container}>
			<div className={css.bar}>
				<CopyToClipboard
					text={JSON.stringify(options)}
					onCopy={() => {
						message.success("复制成功");
					}}
				>
					<Button type="primary">复制</Button>
				</CopyToClipboard>
			</div>
			<div className={css.code}>
				<ReactJson
					style={{
						height: "100%",
						fontSize: 18,
					}}
					theme="monokai"
					src={options}
					collapsed={3}
					quotesOnKeys={false}
					displayDataTypes={false}
					displayObjectSize={false}
					name=""
				/>
			</div>
		</div>
	);
};

export default CodeSpace;