import Drawer from "../../base/Drawer";
import ChartSelector from "../../components/ChartSelector";
import css from "./index.module.less";
import TitleForm from "../../components/TitleForm";
import { Dispatch, RootState } from "../../models";
import { useSelector, useDispatch } from "react-redux";

/**
 * 配置项管理表单
 */
function OptionsForm() {
	const series = useSelector((state: RootState) => state.optionForm.series);
	const titleOptions = useSelector((state: RootState) => state.optionForm.title);
	const selectedTitle = useSelector(
		(state: RootState) =>
			state.optionForm.title.find((o) => o._key === state.optionForm.titleSelectedKey
			));
	const dispatch = useDispatch<Dispatch>();

	const addTitleBtn = (
		<span
			onClick={(e) => {
				e.stopPropagation();
				dispatch.optionForm.addTitle({
					text: "标题",
				});
			}}
			className={css.addTitle}
		>添加</span>
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
			<Drawer title="标题"
				defaultOpen
				extra={addTitleBtn}
			>
				{
					titleOptions.length ? (
						<TitleForm
							data={selectedTitle || titleOptions[0]}
							edit={(d) => {
								dispatch.optionForm.modifyTitle(d);
							}}
							remove={(_key) => {
								dispatch.optionForm.removeTitle(_key);
							}}
						/>
					) : (
						addTitleBtn
					)
				}
			</Drawer>
		</div>
	);
}

export default OptionsForm;
