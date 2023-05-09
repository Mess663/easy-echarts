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
import { Select, message } from "antd";
import { State } from "../../models/option_view";

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
type IndexSelectorProps = {index: number, length: number, onSelect: (i: number) => void}

const IndexSelector = ({ index, length, onSelect }: IndexSelectorProps) => {
	return (
		<span className={css.indexSelector}>
			<Select
				defaultValue={0}
				value={index}
				onChange={(i) => {
					onSelect(i);
				}}
				options={new Array(length).fill(0).map((_, i) => {
					return ({ label: i + 1, value: i });
				})}
			/>
			{" "}/{" "}{length}
		</span>
	);
};

const OptionBarWrap = (
	{
		index, length, remove, optionKey
	}: { remove: () => void, optionKey: keyof State } & Omit<IndexSelectorProps, "onSelect">
) => {
	const dispatch = useDispatch<Dispatch>();
	return (
		<OptionsBar
			remove={length > 1 ? remove : undefined}
			tips={(
				<IndexSelector
					index={index}
					length={length}
					onSelect={(index) => {
						dispatch.optionView.select({
							name: optionKey,
							index
						});
					}}
				/>
			)}
		/>
	);
};

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
		index: optionArr.indexOf(selected || optionArr[0]),
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
				<OptionBarWrap
					remove={seriesProps.remove}
					index={seriesProps.index}
					length={seriesArr.length}
					optionKey="series"
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
							<OptionBarWrap
								remove={titleProps.remove}
								index={titleProps.index}
								length={titleArr.length}
								optionKey="title"
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
				<OptionBarWrap
					remove={xAxisProps.remove}
					index={xAxisProps.index}
					length={xAxisArr.length}
					optionKey="xAxis"
				/>
				<AxisForm isX {...xAxisProps} />
			</Drawer>
			<Drawer
				title="Y轴"
				extra={getAddBtn("yAxis")}
			>
				<OptionBarWrap
					remove={yAxisProps.remove}
					index={yAxisProps.index}
					length={yAxisArr.length}
					optionKey="yAxis"
				/>
				<AxisForm {...yAxisProps} />
			</Drawer>
		</div>
	);
}

export default OptionsForm;