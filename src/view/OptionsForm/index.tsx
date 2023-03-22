import Drawer from "../../base/Drawer";
import ChartSelector from "../../components/ChartSelector";
import css from "./index.module.less";
import { Dispatch, RootState } from "../../models";
import { useSelector, useDispatch } from "react-redux";
import { HTMLAttributes } from "react";
import TitleForm from "../../option_forms/Title";
import XAxisForm from "../../option_forms/XAxis";

const AddBtn = ({ onClick, ...props }: HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={css.addTitle}
			onClick={(e) => {
				e.stopPropagation();
				if (onClick) onClick(e);
			}}
			{...props}
		>添加</button>
	);
};

/**
 * 配置项管理表单
 */
function OptionsForm() {
	const series = useSelector((state: RootState) => state.optionForm.series);
	const title = useSelector((state: RootState) => state.optionForm.title);
	const xAxis = useSelector((state: RootState) => state.optionForm.xAxis);
	const selectedTitle = useSelector(
		(state: RootState) =>
			state.optionForm.title.find((o) => o._key === state.ui.titleSelectedKey
			));
	const dispatch = useDispatch<Dispatch>();

	const addTitleBtn = (
		<AddBtn
			onClick={() => {
				dispatch.optionForm.add({
					name: "title",
					data: {
						text: "标题",
					}
				});
			}}
		/>
	);

	return (
		<div className={css.container}>
			<Drawer
				title="图表"
				defaultOpen
			>
				<ChartSelector
					data={series}
					onChange={c => dispatch.optionForm.updateCharts(c)}
				/>
			</Drawer>
			<Drawer
				title="标题"
				extra={addTitleBtn}
			>
				{
					title.length ? (
						<TitleForm
							data={selectedTitle || title[0]}
							edit={(newData) => {
								dispatch.optionForm.modify({
									name: "title",
									data: newData
								});
							}}
							remove={(_key) => {
								dispatch.optionForm.remove({
									name: "title",
									_key
								});
							}}
							indexObj={{
								index: title.indexOf(selectedTitle || title[0]) + 1 ,
								length: title.length,
							}}
						/>
					) : (
						addTitleBtn
					)
				}
			</Drawer>
			<Drawer title="X轴"
				defaultOpen
				extra={addTitleBtn}
			>
				<XAxisForm
					edit={(newData) => { dispatch.optionForm.modify({ name: "xAxis", data: newData });  }}
					data={xAxis[0]}
					remove={(_key) => { dispatch.optionForm.remove({ name: "xAxis", _key }); }}
					indexObj={{
						index: 1,
						length: xAxis.length
					}}
				/>
			</Drawer>
		</div>
	);
}

export default OptionsForm;
