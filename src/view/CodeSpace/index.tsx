import React, { useRef } from "react";
import css from "./index.module.less";
import ReactJson from "react-json-view";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import { Button, Modal, Space, message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import JSONInput from "react-json-editor-ajrm";
// @ts-ignore
import locale from "react-json-editor-ajrm/locale/zh-cn";
import { useThrottle } from "ahooks";

const CodeEditor = ({ onChange }: {onChange: (e: string) => void}) => {
	return (
		<JSONInput
			locale = { locale }
			height = '550px'
			width = '100%'
			style={{
				body: {
					fontSize: 18,
				}
			}}
			onChange={(e: {error: boolean, json: string}) => {
				if (!e.error) {
					onChange(e.json);
				}
			}}
		/>
	);
};

const CodeSpace = () => {
	const options = useSelector((state: RootState) => state.options);
	const throttledOptions = useThrottle(options, { wait: 500 });
	const codeRef = useRef("");
	const dispatch = useDispatch<Dispatch>();

	const onOk = () => {
		try {
			const json = JSON.parse(codeRef.current);
			if (json) {
				dispatch.options.update(json);
				message.success("导入成功");
			}
		}
		catch (e) {
			message.error("导入失败，请重新编辑");
		}
	};

	const onImportClick = () => {
		Modal.info({
			title: "导入配置",
			icon: null,
			className: css.modal,
			okText: "确定",
			content: (
				<CodeEditor
					onChange={(s) => {
						codeRef.current = s;
					}}
				/>
			),
			onOk
		});
	};

	return (
		<div className={css.container}>
			<div className={css.bar}>
				<Space>
					<CopyToClipboard
						text={JSON.stringify(options)}
						onCopy={() => {
							message.success("复制成功");
						}}
					>
						<Button type="primary">复制</Button>
					</CopyToClipboard>
					<Button onClick={onImportClick}>导入配置</Button>
				</Space>
			</div>
			<div className={css.code}>
				<ReactJson
					style={{
						height: "100%",
						fontSize: 18,
					}}
					theme="monokai"
					src={throttledOptions}
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