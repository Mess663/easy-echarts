import React from "react";
import FormItem from "../../components/FormItem";
import Input from "../../components/Input";
import css from "./index.module.less";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";

const TitleForm = () => {
	const dispatch = useDispatch<Dispatch>();
	const titleState = useSelector((state: RootState) => state.optionForm.title);

	if (!titleState.length) return (
		<button 
			onClick={() => {
				dispatch.optionForm.updateTitle([{
					text: "标题",
				}]);
			}}
		>添加标题</button>
	);

	const title = titleState[0];
	return (
		<div className={css.container}>
			<FormItem title="图表标题">
				<Input 
					placeholder="输入标题"
					value={title.text}
					onChange={(e) => {
						dispatch.optionForm.updateTitle([{
							text: e.target.value
						}]);
					}}
				/>
			</FormItem>	
		</div>
	);
};

export default TitleForm;