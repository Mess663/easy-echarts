import Drawer from "../../base/Drawer";
import css from "./index.module.less";
import { Dispatch, RootState } from "../../models";
import { useSelector, useDispatch } from "react-redux";
import { HTMLAttributes } from "react";
import TitleForm from "../../option_forms/Title";
import AxisForm from "../../option_forms/Axis";
import { getInitOption } from "../../logic/init_option";
import SeriesForm from "../../option_forms/Series";
import GridForm from "../../option_forms/Grid";
import OptionsBar from "../../components/OptionsBar";
import { message } from "antd";

const AddBtn = ({ onClick, children = "添加", ...props }: HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={css.addTitle}
			onClick={(e) => {
				e.stopPropagation();
				if (onClick) onClick(e);
			}}
			{...props}
		>{children}</button>
	);
};

type OptionForm = RootState["options"]

/**
 * 统一管理配置项，将所有下属组件需要props统一封装
 * @param name 配置项名称
 * @returns [当前配置项的选中数据及其增删改查操作，该配置项所有数据]
 */
const useOption = <N extends keyof OptionForm>(name: N) => {
	type Data = OptionForm[N][number]
	const gridId = useSelector((state: RootState) => state.optionView.grid.selectedId ?? state.options.grid[0].id);
	const optionArr: Array<Data> = useSelector(
		(state: RootState) => {
			return name === "grid"
				? state.options[name]
				: (state.options[name] as Data[]).filter(o => {
					return o?.gridId === gridId;
				});
		}
	);
	const selectedId = useSelector((state: RootState) => state.optionView[name].selectedId);
	const selected = optionArr.find((o) => o.id === selectedId);
	const dispatch = useDispatch<Dispatch>();
	return [{
		data: selected || optionArr[0],
		edit(newData: Data)  {
			dispatch.options.modify({
				name,
				data: newData
			});
		},
		remove() {
			if (selectedId) {
				dispatch.options.remove({
					name,
					id: selectedId
				});
			}
			else {
				message.error("配置项删除失败，请重新选择");
			}
		},
		index: optionArr.indexOf(selected || optionArr[0]) + 1 ,
	}, optionArr] as const;
};

/**
 * 配置项管理表单
 */
function OptionsForm() {
	const [titleProps, titleArr] = useOption("title");
	const [seriesProps, seriesArr] = useOption("series");
	const [xAxisProps, xAxisArr] = useOption("xAxis");
	const [yAxisProps, yAxisArr] = useOption("yAxis");
	const [gridProps] = useOption("grid");
	const dispatch = useDispatch<Dispatch>();

	const getAddBtn = <T extends keyof Omit<OptionForm, "grid">>(name: T) => {
		const data = (() => {
			if (name === "series") return getInitOption(name, {
				gridId: gridProps.data.id,
				xAxisId: xAxisProps.data.id,
				yAxisId: yAxisProps.data.id
			});
			return getInitOption(name, {
				gridId: gridProps.data.id
			});
		})();
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
				extra={getAddBtn("series")}
			>
				<OptionsBar
					remove={seriesArr.length > 1 ? seriesProps.remove : undefined}
					tips={`预览区点击图形可编辑：${seriesProps.index}/${seriesArr.length}`}
				/>
				<SeriesForm {...seriesProps} />
			</Drawer>
			<Drawer
				title="布局"
			>
				<GridForm  {...gridProps} />
			</Drawer>
			<Drawer
				title="标题"
				extra={addTitleBtn}
			>
				{
					titleArr.length ? (
						<>
							<OptionsBar
								remove={titleProps.remove}
								tips={`预览区点击标题可编辑：${titleProps.index}/${titleArr.length}`}
							/>
							<TitleForm {...titleProps} />
						</>
					) : (
						addTitleBtn
					)
				}
			</Drawer>
			<Drawer
				title="X轴"
				extra={getAddBtn("xAxis")}
			>
				<OptionsBar
					remove={xAxisArr.length > 1 ? xAxisProps.remove : undefined}
					tips={`预览区点击维度标签可编辑：${xAxisProps.index}/${xAxisArr.length}`}
				/>
				<AxisForm {...xAxisProps} />
			</Drawer>
			<Drawer
				title="Y轴"
				extra={getAddBtn("yAxis")}
			>
				<OptionsBar
					remove={yAxisArr.length > 1 ? yAxisProps.remove : undefined}
					tips={`预览区点击维度标签可编辑：${yAxisProps.index}/${yAxisArr.length}`}
				/>
				<AxisForm {...yAxisProps} />
			</Drawer>
		</div>
	);
}

export default OptionsForm;