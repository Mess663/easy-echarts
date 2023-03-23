import Drawer from "../../base/Drawer";
import css from "./index.module.less";
import { Dispatch, RootState } from "../../models";
import { useSelector, useDispatch } from "react-redux";
import { HTMLAttributes } from "react";
import TitleForm from "../../option_forms/Title";
import AxisForm from "../../option_forms/Axis";
import { getInitOption } from "../../config/init_option";
import SeriesForm from "../../option_forms/Series";

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
type commonViewState = { selectedKey: string }

const useOptionState = <N extends keyof OptionForm>(name: N) => {
	type Data = OptionForm[N][number]
	const list: Array<Data > = useSelector((state: RootState) => state.options[name]);
	const selectedKey = useSelector((state: RootState) => (state.optionView[name] as commonViewState).selectedKey);
	const selected = list.find((o) => o._key === selectedKey);
	const dispatch = useDispatch<Dispatch>();
	return [{
		data: selected || list[0],
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
			index: list.indexOf(selected || list[0]) + 1 ,
			length: list.length,
		}
	}, list] as const;
};

/**
 * 配置项管理表单
 */
function OptionsForm() {
	const [titleProps, titleList] = useOptionState("title");
	const [seriesProps] = useOptionState("series");
	const [xAxisProps] = useOptionState("xAxis");
	const [yAxisProps] = useOptionState("yAxis");
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
		</div>
	);
}

export default OptionsForm;
