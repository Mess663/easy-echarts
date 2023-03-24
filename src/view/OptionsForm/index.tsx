import Drawer from "../../base/Drawer";
import css from "./index.module.less";
import { Dispatch, RootState } from "../../models";
import { useSelector, useDispatch } from "react-redux";
import { HTMLAttributes } from "react";
import TitleForm from "../../option_forms/Title";
import AxisForm from "../../option_forms/Axis";
import { getInitOption } from "../../config/init_option";
import SeriesForm from "../../option_forms/Series";
import GridForm from "../../option_forms/Grid";

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
	const options: Array<Data> = useSelector((state: RootState) => state.options[name]);
	const selectedKey = useSelector((state: RootState) => state.optionView[name].selectedKey);
	const selected = options.find((o) => o._key === selectedKey);
	const dispatch = useDispatch<Dispatch>();
	return [{
		data: selected || options[0],
		edit(newData: Data)  {
			dispatch.options.modify({
				name,
				data: newData
			});
		},
		remove(_key: string) {
			dispatch.options.remove({
				name: "title",
				_key
			});
		},
		indexObj: {
			index: options.indexOf(selected || options[0]) + 1 ,
			length: options.length,
		}
	}, options] as const;
};

/**
 * 配置项管理表单
 */
function OptionsForm() {
	const [titleProps, titleList] = useOption("title");
	const [seriesProps] = useOption("series");
	const [xAxisProps] = useOption("xAxis");
	const [yAxisProps] = useOption("yAxis");
	const [gridProps] = useOption("grid");
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
				<SeriesForm {...seriesProps} />
			</Drawer>
			<Drawer
				title="标题"
				extra={addTitleBtn}
			>
				{
					titleList.length ? (
						<TitleForm {...titleProps} />
					) : (
						addTitleBtn
					)
				}
			</Drawer>
			<Drawer
				title="X轴"
				extra={getAddBtn("xAxis")}
			>
				<AxisForm {...xAxisProps} />
			</Drawer>
			<Drawer
				title="Y轴"
				extra={getAddBtn("yAxis")}
			>
				<AxisForm {...yAxisProps} />
			</Drawer>
			<Drawer
				title="布局"
				extra={getAddBtn("grid")}
			>
				<GridForm  {...gridProps} />
			</Drawer>
		</div>
	);
}

export default OptionsForm;