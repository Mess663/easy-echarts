import React from "react";
import { useRecoilState } from "recoil";
import FormItem from "../../components/FormItem";
import Input from "../../components/Input";
import optionForm from "../../recoil/option_form";
import css from "./index.module.less";

const TitleForm = () => {
	const [titleState, setTitleState] = useRecoilState(optionForm.title);

	if (!titleState.length) return (
		<button onClick={() => {
			setTitleState([{
				text: "标题",
				triggerEvent: true
			}]);
		}}
		>添加标题</button>
	);

	const title = titleState[0];
	return (
		<div className={css.container}>
			<FormItem title="图表标题" hash="title.text" >
				<Input 
					placeholder="输入标题"
					value={title.text}
					onChange={(e) => {
						setTitleState([{
							text: e.target.value
						}]);
					}}
				/>
			</FormItem>	
		</div>
	);
};

export default TitleForm;