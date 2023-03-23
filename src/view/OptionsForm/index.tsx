import Drawer from "../../base/Drawer";
import ChartSelector from "../../components/ChartSelector";
import css from "./index.module.less";
import { Dispatch, RootState } from "../../models";
import { useSelector, useDispatch } from "react-redux";
import { HTMLAttributes } from "react";
import TitleForm from "../../option_forms/Title";
import AxisForm from "../../option_forms/Axis";
import { getInitOption } from "../../config/init_option";

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

type OptionForm = RootState["options"]

/**
 * 配置项管理表单
 */
function OptionsForm() {
	const series = useSelector((state: RootState) => state.options.series);
	const title = useSelector((state: RootState) => state.options.title);
	const xAxis = useSelector((state: RootState) => state.options.xAxis);
	const yAxis = useSelector((state: RootState) => state.options.yAxis);
	const selectedTitle = useSelector(
		(state: RootState) =>
			state.options.title.find((o) => o._key === state.optionView.title.selectedKey
			));
	const selectedXAxis = useSelector(
		(state: RootState) =>
			state.options.xAxis.find((o) => o._key === state.optionView.xAxis.selectedKey
			));
	const selectedYAxis = useSelector(
		(state: RootState) =>
			state.options.yAxis.find((o) => o._key === state.optionView.yAxis.selectedKey
			));
	const dispatch = useDispatch<Dispatch>();

	const getAddBtn = <T extends keyof OptionForm>(name: T) => {
		const data = getInitOption(name);
		return (
			<AddBtn
				onClick={() => {
					dispatch.options.add({
						name,
						data
					});
				}}
			/>
		);
	};

	const addTitleBtn = getAddBtn("title");

	return (
		<div className={css.container}>
			<Drawer
				title="图形"
				defaultOpen
			>
				<ChartSelector
					data={series}
					onChange={data => dispatch.options.update({ name: "series", data })}
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
								dispatch.options.modify({
									name: "title",
									data: newData
								});
							}}
							remove={(_key) => {
								dispatch.options.remove({
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
			<Drawer
				title="X轴"
				extra={getAddBtn("xAxis")}
			>
				<AxisForm
					edit={(newData) => { dispatch.options.modify({ name: "xAxis", data: newData });  }}
					data={selectedXAxis || xAxis[0]}
					remove={(_key) => { dispatch.options.remove({ name: "xAxis", _key }); }}
					indexObj={{
						index: xAxis.indexOf(selectedXAxis || xAxis[0]) + 1,
						length: xAxis.length
					}}
				/>
			</Drawer>
			<Drawer
				title="Y轴"
				extra={getAddBtn("yAxis")}
			>
				<AxisForm
					edit={(newData) => { dispatch.options.modify({ name: "yAxis", data: newData });  }}
					data={selectedYAxis || yAxis[0]}
					remove={(_key) => { dispatch.options.remove({ name: "yAxis", _key }); }}
					indexObj={{
						index: yAxis.indexOf(selectedYAxis || yAxis[0]) + 1,
						length: yAxis.length
					}}
				/>
			</Drawer>
		</div>
	);
}

export default OptionsForm;
