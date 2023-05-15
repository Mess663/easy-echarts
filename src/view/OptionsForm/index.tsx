import css from "./index.module.less";
import { Dispatch, RootState } from "../../models";
import { useSelector, useDispatch } from "react-redux";
import { HTMLAttributes, useCallback, useMemo } from "react";
import { getInitOption, mockRadarOption, mockSeries } from "../../logic/init_option";
import { Select, message } from "antd";
import { State } from "../../models/option_view";
import { CommonOption, ComponentOption } from "../../types/biz/option";
import { keys, pick } from "lodash";

import Drawer from "../../base/Drawer";
import TitleForm from "../../option_forms/Title";
import AxisForm from "../../option_forms/Axis";
import SeriesForm from "../../option_forms/Series";
import GridForm from "../../option_forms/Grid";
import OptionsBar from "../../components/OptionsBar";
import CommonOptionForm from "../../option_forms/CommonOption";
import { getCommonOption } from "../../models/options";
import { Chart, ChartEnumify } from "../../types/biz/chart";

console.log(mockRadarOption());

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
	if (length < 2) return <></>;
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
const useOption = <N extends keyof ComponentOption>(name: N) => {
	type Data = ComponentOption[N][number]
	const gridId = useSelector((state: RootState) => state.optionView.grid.selectedId ?? state.options.grid[0].id);
	const allOptions: Data[] = useSelector((state: RootState) => state.options[name]);
	const curOption: Array<Data> = useMemo(() => name === "grid"
		? allOptions
		: allOptions.filter(o => {
			return o?.gridId === gridId;
		}),[gridId, name, allOptions]) ;
	const selectedId = useSelector((state: RootState) => state.optionView[name].selectedId);
	const selected = useMemo(() => curOption.find((o) => o.id === selectedId), [curOption, selectedId]);
	const dispatch = useDispatch<Dispatch>();

	return useMemo(() => [{
		data: selected || curOption[0],
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
		index: curOption.indexOf(selected || curOption[0]),
	}, curOption] as const, [dispatch.options, name, curOption, selected, selectedId]);
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
	const dataCount = useSelector((state: RootState) => state.ui.dataCount);
	const commonOption = useSelector<RootState, CommonOption>(((state) => pick(state.options, keys(getCommonOption())) as CommonOption));

	const getAddBtn = <T extends keyof Omit<ComponentOption, "grid">>(name: T) => {
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

	const onChangeSerieType = useCallback((type: Chart) => {
		const sizeOption = {
			...pick(gridProps.data, ["left", "top", "right", "bottom"])
		};
		seriesProps.edit({
			...seriesProps.data,
			...(ChartEnumify.$getEnumVal(type).isObjectData ? sizeOption : {}),
			data: mockSeries(dataCount, type),
			type,
		});

		const isShowAxis = ChartEnumify.$getEnumVal(type).showAxis;
		if (isShowAxis) {
			xAxisProps.edit({ ...xAxisProps.data, show: true });
		}
		else {
			xAxisProps.edit({ ...xAxisProps.data, show: false });
		}

		const usedToBeRadar = ChartEnumify.Radar.$eq(seriesProps.data.type);
		if (ChartEnumify.Radar.$eq(type)) {
			dispatch.options.update({
				radar: {
					indicator: mockRadarOption(dataCount)
				}
			});
		}
		else if (usedToBeRadar ) {
			dispatch.options.update({
				radar: undefined
			});
		}
	}, [dataCount, dispatch.options, gridProps.data, seriesProps, xAxisProps]);

	const addTitleBtn = getAddBtn("title");

	return (
		<div className={css.container}>
			<Drawer
				title="通用配置"
			>
				<CommonOptionForm
					data={commonOption}
					edit={(data) => {
						dispatch.options.update(data);
					}}
				/>
			</Drawer>
			<Drawer
				title="图形（系列设置）"
				defaultOpen
				extra={getAddBtn("series")}
			>
				<OptionBarWrap
					remove={seriesProps.remove}
					index={seriesProps.index}
					length={seriesArr.length}
					optionKey="series"
				/>
				<SeriesForm
					{...seriesProps}
					xAxis={xAxisArr}
					yAxis={yAxisArr}
					onChangeSerieType={onChangeSerieType}
				/>
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

